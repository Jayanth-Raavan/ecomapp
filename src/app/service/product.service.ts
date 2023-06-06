import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Order, Product } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  _cartData = new EventEmitter<Product[] | []>();

  constructor(private http: HttpClient) {}

  AddProduct(data: Product) {
    return this.http.post(`http://localhost:3000/products`, data);
  }
  ProductLists() {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }
  DeleteProduct(id: number) {
    return this.http.delete('http://localhost:3000/products' + '/' + id);
  }
  getProduct(id: string) {
    return this.http.get<Product>('http://localhost:3000/products' + '/' + id);
  }
  updateProduct(product: Product) {
    return this.http.put<Product>(
      'http://localhost:3000/products' + '/' + product.id,
      product
    );
  }
  PopularProducts() {
    return this.http.get<Product[]>(`http://localhost:3000/products?_limit=5`);
  }
  TrendyProducts() {
    return this.http.get<Product[]>(`http://localhost:3000/products`);
  }
  SearchProduct(query: string) {
    return this.http.get<Product[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }
  localAddToCart(data: Product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this._cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this._cartData.emit(cartData);
  }
  AddToCart(cartData: Cart) {
    return this.http.post(`http://localhost:3000/cart`, cartData);
  }
  GetCartList(userId: number) {
    return this.http
      .get<Product[]>(`http://localhost:3000/cart?userId=` + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        // console.warn(result);
        if (result && result.body) {
          this._cartData.emit(result.body);
        }
      });
  }
  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: Product[] = JSON.parse(cartData);
      items = items.filter((item: Product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this._cartData.emit(items);
    }
  }
  RemoveToCart(cartId: number) {
    return this.http.delete(`http://localhost:3000/cart/` + cartId);
  }
  CurrentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Cart[]>(
      `http://localhost:3000/cart?userId=` + userData.id
    );
  }
  OrderNow(data: Order) {
    console.log(data)
    return this.http.post(`http://localhost:3000/orders`, data);
  }

  OrderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Order[]>(
      `http://localhost:3000/orders?userId=` + userData.id
     
    );
    
  }

  DeleteCartItems(cartId: number) {
    return this.http
      .delete(`http://localhost:3000/cart/` + cartId, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          this._cartData.emit([]);
        }
      });
  }
  CancelOrder(orderId: number) {
    return this.http.delete(`http://localhost:3000/orders/` + orderId);
  }
}
