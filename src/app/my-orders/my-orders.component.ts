import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Order } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orderData : Order[] | undefined
  constructor(private productS : ProductService) { }

  ngOnInit(): void {
    this.getOrderList();
  }
  getOrderList(){
    this.productS.OrderList().subscribe(result=>{
      this.orderData = result;
    })
  }
  cancelOrder(orderId:number | undefined){
    orderId && this.productS.CancelOrder(orderId).subscribe(result=>{
      this.getOrderList();
    })
  }
}
