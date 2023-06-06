import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchResult : undefined | Product[]
  constructor(private route : ActivatedRoute, private productS: ProductService) { }

  ngOnInit(): void {
    let query = this.route.snapshot.paramMap.get('query');

    query && this.productS.SearchProduct(query).subscribe(result=>{
      this.searchResult = result
    })
  }

}
