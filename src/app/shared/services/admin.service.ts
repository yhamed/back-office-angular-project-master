import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {GenericService} from "./generic.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageService} from "./storage.service";
import {Config} from "../config";
import {Admin} from "../models/admin";
import {Credentials} from "../models/credential";
import {TOKEN_AUTH_PASSWORD, TOKEN_AUTH_USERNAME, TOKEN_NAME} from "./auth.constant";
import {JwtHelper} from "angular2-jwt";
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";


@Injectable()
export class AdminService extends GenericService {
  static AUTH_TOKEN = '/oauth/token';
  currentAdmin: Admin;
  adminToken: string;


  jwtHelper: JwtHelper = new JwtHelper();
  accessToken: string;
  isAdmin: boolean;

  constructor(private http: HttpClient,private httpOld: Http , private storageService: StorageService) {
    super();
    this.retrieveAdminFromCache();
    this.retrieveAdminTokenFromCache();
  }

  retrieveAdminFromCache() {
    this.currentAdmin = this.storageService.read(Config.tokenKey);
  }

  retrieveAdminTokenFromCache() {
    return this.adminToken = this.storageService.read(Config.tokenKey);
  }

  isAdminLoggedIn() {
    return this.retrieveAdminTokenFromCache() !== null;
  }

  me() {
    const headers = this.headers.set('Authorization', this.adminToken);
    return this.http.get(Config.adminUrl + "/me", {headers});
  }


  loginAdmin(credentials: Credentials) {
    return this.http.post(Config.adminUrl + "/login", credentials);
  }


  login(email: string, password: string) {
    const body = `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&grant_type=password`;

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD));

    return this.httpOld.post(AdminService.AUTH_TOKEN, body, {headers})
      .map(res => res.json())
      .map((res: any) => {
        if (res.access_token) {
          return res.access_token;
        }
        return null;
      });
  }

  Dologin(accessToken: string) {
    const decodedToken = this.jwtHelper.decodeToken(accessToken);

    this.isAdmin = decodedToken.authorities.some(el => el === 'ADMIN_USER');
    this.accessToken = accessToken;
    console.log('******************');
    console.log('bearer: ' +this.accessToken);
    console.log('******************');
    console.log('decoded token: ');
    console.log(decodedToken);
    console.log('******************');
    localStorage.setItem(TOKEN_NAME, accessToken);

  }


  saveAdmin(data: any) {
    this.adminToken = data.token;
    this.currentAdmin = data.admin;
    this.storageService.write(Config.tokenKey, 'Bearer ' + data.token);
    this.storageService.write(Config.adminKey, data.admin);
  }

  clearAdminFromCache() {
    this.storageService.remove(Config.tokenKey);
    this.storageService.remove(Config.adminKey);
  }

  /* Examples CRUD */

  /* GET dans la liste ou getObjectById */
  getExample(id: number) {
    const headers = this.headers.set('Authorization', this.adminToken);
    return this.http.get(Config.adminUrl + id + "/getExample", {headers});
  }

  /* POST Dans l'ajout d'un objet */
  postExample(id: number, objectBody: any) {
    const headers = this.headers.set('Authorization', this.adminToken);
    return this.http.post(Config.adminUrl + "/postExample", objectBody, {headers});
  }

  /* PUT Dans l'edit d'un objet */
  putExample(id: number, objectBody) {
    const headers = this.headers.set('Authorization', this.adminToken);
    return this.http.put(Config.adminUrl + id + "/putExample", objectBody, {headers});
  }

  /* Delete Dans la suppression d'un element */
  deleteExample(id: number) {
    const headers = this.headers.set('Authorization', this.adminToken);
    return this.http.delete(Config.adminUrl + id + "/deleteExample", {headers});
  }

}
