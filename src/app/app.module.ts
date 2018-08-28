import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule} from '@angular/http';
import {AuthConfig, AuthHttp} from 'angular2-jwt';

import {AppComponent} from './app.component';
import {FullLayoutComponent} from './full-layout/full-layout.component';
import {LoginComponent} from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app.routing';
import {StorageService} from './shared/services/storage.service';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from "./shared/shared.module";
import {ExampleModule} from "./example/example.module";
import {AdminService} from "./shared/services/admin.service";
import {TOKEN_NAME} from "./shared/services/auth.constant";
import {UserService} from "./shared/services/user.service";
import {AuthGuard} from "./guards/auth-guard.service";
import { ProductsComponent } from './products/products.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { UsersComponent } from './users/users.component';
import { SingleUserComponent } from './users/single-user/single-user.component';
import { TransactionsComponent } from './transactions/transactions.component';

export function authHttpServiceFactory(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'Bearer',
    tokenName: TOKEN_NAME,
    globalHeaders: [{'Content-Type': 'application/json'}],
    noJwtError: false,
    noTokenScheme: true,
    tokenGetter: (() => localStorage.getItem(TOKEN_NAME))
  }), http);
}
@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    LoginComponent,
    ProductsComponent,
    SingleProductComponent,
    UsersComponent,
    SingleUserComponent,
    TransactionsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ExampleModule,
    HttpModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http]},
    StorageService,
    AdminService,
    AuthGuard,
    HttpModule,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
