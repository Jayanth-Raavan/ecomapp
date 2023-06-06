import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Cart, Order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice : number | undefined
  cartData : Cart[] | undefined
  orderMsg : string | undefined
  constructor(private productS : ProductService, private route: Router) { }

  ngOnInit(): void {
    this.productS.CurrentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * item.quantity;
        }
      });
      this.totalPrice = price + (price / 10 )+ 100 -( price / 10);
      console.log(this.totalPrice);
    });
  }
  orderNow(data:{email:string,contact:string,address:string}){
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if(this.totalPrice){
      let orderData : Order={
        ...data,
        totalPrice :this.totalPrice,
        userId,
        id: undefined
      }
      this.cartData?.forEach((item)=>{
        setTimeout(() => {
        item.id && this.productS.DeleteCartItems(item.id)
        }, 600);
      })
    this.productS.OrderNow(orderData).subscribe((result)=>{
      if(result){
        // alert('Your Order has been placed')
        this.orderMsg = 'Your Order has been placed';
        setTimeout(() => {
          this.route.navigate(["/my-orders"])
          this.orderMsg = undefined;

        }, 3000);
      }
    })

    }
  }
}
