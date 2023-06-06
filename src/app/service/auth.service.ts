import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { SignUp, signIn } from '../data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  haveError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private route : Router) { }

  UserSignUp(data : SignUp){
    return this.http.post(`http://localhost:3000/users`,data,{observe:'response'})
  }
  UserSignIn(data: signIn){
    return this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
     {observe:'response'}).subscribe((result:any)=>{
      if(result && result.body?.length){
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.route.navigate(['/']);
        this.haveError.emit(false)
      }else{
        this.haveError.emit(true)
      }
     })

  }
  userAuthReload(){
    if(localStorage.getItem('user'))
      this.route.navigate(['/']);
    // else 
    // this.route.navigate(['/user-auth']);

  }
}
