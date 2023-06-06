import { Component, OnInit } from '@angular/core';
import { Cart, Product, SignUp, signIn } from '../data-type';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  accountHave = true;
  menuType: string = 'default';
  userName: string = '';
  message: string = '';
  constructor(private authS: AuthService, private route: Router, private productS: ProductService) {}

  ngOnInit(): void {
    if (this.accountHave) {
      this.menuType = 'signIn';
    }
    if (!this.accountHave) {
      this.menuType = 'default';
    }
    this.authS.userAuthReload();
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('user') && val.url.includes('user-auth')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore)[0];
          this.userName = userData.name;
          this.menuType = 'signIn';
        } else {
          this.menuType = 'default';
        }
      }
    });
  }
  SignUp(data: SignUp) {
    this.authS.UserSignUp(data).subscribe((result) => {
      if (result) {
        localStorage.setItem('user', JSON.stringify(result.body));
        // this.route.navigate(['/user-auth'])
        this.menuType = 'signIn';
      }
    });
  }
  SignIn(data: signIn) {
    this.authS.UserSignIn(data);
    this.authS.haveError.subscribe((result) => {
      if (result) {
        this.message = 'User not found';
      } else {
        this.localCartToRemoteCart();
      }
    });
  }
  haveAccount() {
    this.accountHave = !this.accountHave;
    if (this.accountHave) {
      this.menuType = 'signIn';
    } else {
      this.menuType = 'default';
    }
  }
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id
    if(data){
      let cartDataList: Product[] = JSON.parse(data);
      cartDataList.forEach((product: Product, index) => {
        let cartData : Cart={
          ...product,
          productId: product.id,
          userId
        };
        delete cartData.id;
        setTimeout(()=>{
          this.productS.AddToCart(cartData).subscribe((result)=>{
            if(result){
              console.warn("Item stored in DB")
            }
          })
          if(cartDataList.length === index + 1){
            localStorage.removeItem('localCart')
          }
        },500)
      });
    }
    setTimeout(() => {
    this.productS.GetCartList(userId);
    }, 2000);
  }
}
