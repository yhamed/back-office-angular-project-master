import {Injectable} from '@angular/core';
import {JwtHelper} from 'angular2-jwt';

import {TOKEN_NAME} from './auth.constant';

@Injectable()
export class UserService {
  jwtHelper: JwtHelper = new JwtHelper();
  accessToken: string;
  isAdmin: boolean;

  constructor() {
  }

  login(accessToken: string) {
    const decodedToken = this.jwtHelper.decodeToken(accessToken);

    this.isAdmin = decodedToken.authorities.some(el => el === 'Administrateur');
    this.accessToken = accessToken;
console.log('******************');
console.log('bearer: ' +this.accessToken);
    console.log('******************');
console.log('decoded token: ');
console.log(decodedToken);
    console.log('******************');
localStorage.setItem(TOKEN_NAME, accessToken);

  }
  logout() {
    this.accessToken = null;
    this.isAdmin = false;
    localStorage.removeItem(TOKEN_NAME);
  }

  isAdminUser(): boolean {
    return this.isAdmin;
  }

  isUser(): boolean {
    return this.accessToken && !this.isAdmin;
  }
}
