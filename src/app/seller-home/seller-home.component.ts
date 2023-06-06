import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../data-type';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  constructor(private productS: ProductService) {}

  productList: undefined | Product[];
  deleteMessage: string | undefined;
  trashIcon = faTrash
  penIcon = faPen
  ngOnInit(): void {
    this.Product();
  }
  Product() {
    this.productS.ProductLists().subscribe((result) => {
      this.productList = result;
    });
  }
  //delete product
  deleteProduct(id: number) {
    this.productS.DeleteProduct(id).subscribe((result) => {
      if (result) {
        this.deleteMessage = 'Product deleted successfully!';
        this.Product();
      }
    });
    setTimeout(() => {
      this.deleteMessage = undefined;
    }, 3000);
  }
}
