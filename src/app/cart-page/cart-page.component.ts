import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartData: Cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };
  cartIsEmpty: boolean = true;
  cartItems = new BehaviorSubject<number>(0);
  private cartDataSubject = new BehaviorSubject<Cart[]>([]);
  private cartDataSubscription: Subscription | undefined;

  constructor(private productS: ProductService, private route: Router) {}

  ngOnInit(): void {
    this.cartDataSubscription = this.cartDataSubject.subscribe((items) => {
      this.cartData = items;
      this.updateCartItems(items);
      this.updateCartStatus();
      // console.log(this.cartItems.getValue())
    });
    this.priceSummaryData();
  }

  ngOnDestroy(): void {
    this.cartDataSubscription?.unsubscribe();
  }

  priceSummaryData() {
    this.productS.CurrentCart().subscribe((result) => {
      this.cartDataSubject.next(result);
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * item.quantity;
        }
      });
      this.updatePriceSummary(price);
    });
  }

  removeItem(productId: number | undefined) {
    if (productId && this.cartData) {
      this.productS.RemoveToCart(productId).subscribe(() => {
        const updatedCartData = this.cartData && this.cartData.filter((item) => item.id !== productId);
        this.cartDataSubject.next(updatedCartData || []);
      // this.cartItems.getValue();
      // console.log(this.cartItems.getValue())
      });
    }
  }

  checkOut() {
    this.route.navigate(['checkout']);
  }

  private updatePriceSummary(price: number) {
    this.priceSummary.price = price;
    this.priceSummary.discount = price / 10;
    this.priceSummary.tax = price / 10;
    this.priceSummary.delivery = 100;
    this.priceSummary.total = price + price / 10 + 100 - price / 10;
  }

  private updateCartItems(items: Cart[]) {
    const cartItemCount = items.length;
    this.cartItems.next(cartItemCount);
  }

  private updateCartStatus() {
    this.cartIsEmpty = this.cartItems.getValue() === 0;
  }
}
