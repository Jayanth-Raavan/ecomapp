import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from './Gaurd/auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerProductListComponent } from './seller-product-list/seller-product-list.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
  {path:"",component: HomeComponent, canActivate:[AuthGuard]},
  {path:"seller-auth",component:SellerAuthComponent},
  {path:"seller-home",component:SellerHomeComponent, canActivate:[AuthGuard]},
  {path:"seller-add-product",component:SellerAddProductComponent, canActivate:[AuthGuard]},
  {path:"seller-update-product/:id", component: SellerUpdateProductComponent, canActivate:[AuthGuard]},
  {path:"seller-product-list",component:SellerProductListComponent, canActivate:[AuthGuard]},
  {path:"search/:query",component:SearchComponent, canActivate:[AuthGuard]},
  {path:"details/:productId",component:ProductDetailsComponent, canActivate:[AuthGuard]},
  {path:"user-auth",component:UserAuthComponent, canActivate:[AuthGuard]},
  {path:"cart-page", component: CartPageComponent, canActivate:[AuthGuard]},
  {path:"checkout", component: CheckoutComponent, canActivate:[AuthGuard]},
  {path:"my-orders",component: MyOrdersComponent, canActivate:[AuthGuard]}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
