import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { SignUp, signIn } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http: HttpClient, private route: Router) { }

  userSignUp(data:SignUp){
    return this.http.post('http://localhost:3000/seller', data, {observe:'response'});
  }
  isLoggedIn = new BehaviorSubject<boolean>(false);

  reloadSeller(){
    if(localStorage.getItem('seller'))
      this.isLoggedIn.next(true);
      this.route.navigate(["seller-home"])
  }
  //user login
  haveError = new EventEmitter<boolean>(false);

  userLogin(data:signIn){
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    {observe : 'response'}).subscribe((result:any)=>{
      
      if(result && result.body && result.body.length){
        console.log("Seller LOGGED IN SUCCESSFULL!")
        localStorage.setItem("seller",JSON.stringify(result.body))
          this.route.navigate(["seller-home"]);
      }
      else{
        console.error("Seller LOGIN FAILED!");
        this.haveError.emit(true);
      }
    })
  }
}
