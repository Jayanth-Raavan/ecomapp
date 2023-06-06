import { Component, OnInit } from '@angular/core';
import { SellerService } from '../service/seller.service';
import { Router } from '@angular/router';
import { SignUp, signIn } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor(private service: SellerService, private route : Router) { }

  ngOnInit(): void {
    this.service.reloadSeller();
  }
  signUp(data : SignUp) : void{
    this.service.userSignUp(data).subscribe(result=>{
      if(result){
        this.service.isLoggedIn.next(true);
        localStorage.setItem("seller",JSON.stringify(result.body))
        this.route.navigate(["seller-home"]);
      }
    })
  }
  //check already have account
  accountHave = true
  haveAccount(){
    this.accountHave = !this.accountHave;
  }

  //signIn
  displayError : string = '';
  signIn(data:signIn){
    this.service.userLogin(data);
    this.service.haveError.subscribe(result=>{
      if(result = true){
        this.displayError = "Wrong credentials"

      }
      else{
        this.displayError = "Login success"
      console.log("result " + result)

      }  
    })
  }
}
