import { Injectable } from '@angular/core';
import {AuthHttp} from "angular2-jwt";
import {Product} from "../models/product";
import {log} from "util";

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  constructor(private http: AuthHttp) { }

  addProduct(product: Product) {
  return  this.http.post('/springjwt/product', product).subscribe(e => console.log(e.json()));
  }
  updateProduct(product: Product) {
    return this.http.put('/springjwt/product', product).subscribe(e=> console.log(e.json()));
  }
  getProducts() {
    return this.http.get('/springjwt/product');
  }

  deleteProduct(product) {
    return this.http.delete('/springjwt/product/'+product.id+'/');
  }
  getUsers() {
    return this.http.get('/springjwt/users');
  }
  addUser(user) {
    return this.http.post('/springjwt/user/', JSON.stringify(user));
  }
  updateUser(user) {
    return this.http.put('/springjwt/user/', JSON.stringify(user));
  }
  checkUsername(username: string) {
    return this.http.get('/springjwt/user/username/' + username + '/');
  }
  deleteUser(user) {
    return this.http.delete('/springjwt/user/'+user.id+'/');
  }
  getTransactions() {
    return this.http.get('/springjwt/transaction');
  }
}
