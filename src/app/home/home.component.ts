import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private productS: ProductService) { }

  popularProducts : undefined | Product[]
  trendyProduct : undefined | Product[]
  ngOnInit(): void {
    this.productS.PopularProducts().subscribe(result=>{
      this.popularProducts = result;
    })
    this.productS.TrendyProducts().subscribe(result=>{
      this.trendyProduct = result;
    })
  }

}
