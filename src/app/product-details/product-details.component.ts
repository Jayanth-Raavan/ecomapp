import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Cart, Product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | Product;
  productQuantity = 0;
  removeCart = false;
  cartData: Product | undefined;
  itemsIncart : number | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productS: ProductService
  ) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('productId');

    productId &&
      this.productS.getProduct(productId).subscribe((result) => {
        this.productData = result;

        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter(
            (item: Product) => productId === item.id.toString()
          );
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }
        let user = localStorage.getItem('user');
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.productS.GetCartList(userId);
          this.productS._cartData.subscribe((result) => {
            let item = result.filter(
              (item: Product) =>
                productId?.toString() === item.productId?.toString()
            );
            if (item.length) {
              this.cartData = item[0];
              this.removeCart = true;
            } else {
              this.removeCart = false;
            }
          });
        }
      });
  }
  quantityControl(val: string) {
    if (this.productQuantity < 20 && val === 'plus') this.productQuantity += 1;
    else if (this.productQuantity > 0 && val === 'min')
      this.productQuantity -= 1;
  }
  AddToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      console.log(this.productQuantity)
      if (!localStorage.getItem('user')) {
        this.productS.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        console.warn(userId);
        let cartData: Cart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
        };
        this.itemsIncart = cartData.quantity;
        delete cartData.id;
        this.productS.AddToCart(cartData).subscribe((result) => {
          if (result) {
            this.productS.GetCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }
  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.productS.removeItemFromCart(productId);

    } 
    else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      console.warn(this.cartData);
      this.cartData && this.productS.RemoveToCart(this.cartData.id)
      .subscribe((result) => {
          if(result){
          this.productS.GetCartList(userId);
          }
        });
    }
    this.removeCart = false;

  }
  buyNow(){
    this.AddToCart();
    this.router.navigate(['/cart-page']);
  }
}
