import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  constructor(private productS: ProductService) { }

  ngOnInit(): void {
  }
  //
  addProductMessage : string | undefined
  submit(data: Product){
    this.productS.AddProduct(data).subscribe(result=>{
      if(result){
        this.addProductMessage = data.name + " is added successfully!"
      }
      // setTimeout(()=>{
      //   this.addProductMessage = undefined
      // }, 3000)
    })
  }
}
