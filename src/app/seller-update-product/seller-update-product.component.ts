import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  ProductData : undefined | Product;
  UpdateMessage: undefined | string;
  constructor(private route: ActivatedRoute, private productS: ProductService) { }
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    productId && this.productS.getProduct(productId).subscribe(result=>{
      this.ProductData = result;
    })
  }
  update(data:Product){
    if(this.ProductData){
      data.id = this.ProductData.id;
    }
    this.productS.updateProduct(data).subscribe(result=>{
      if(result){
        this.UpdateMessage = "Product Updated Successfull!"
      }
      setTimeout(()=>{
        this.UpdateMessage = undefined;
      },3000)
    })
  }
}
