import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FullLayoutComponent} from './full-layout/full-layout.component';
import {LoginComponent} from './login/login.component';
import {ExampleModule} from "./example/example.module";
import {AuthGuard} from "./guards/auth-guard.service";
import {ProductsComponent} from "./products/products.component";
import {SingleProductComponent} from "./single-product/single-product.component";
import {UserService} from "./shared/services/user.service";
import {UsersComponent} from "./users/users.component";
import {TransactionsComponent} from "./transactions/transactions.component";


export function loadExampleModule() {
  return ExampleModule;
}

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'example',
        loadChildren: loadExampleModule,

      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'singleproduct',
        component: SingleProductComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: '',
        component: TransactionsComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
