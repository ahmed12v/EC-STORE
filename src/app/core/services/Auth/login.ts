import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Loginform } from '../../interfaces/Auth/login';
import { BehaviorSubject, Observable } from 'rxjs';
import { ecStoreUrl } from '../../../base/base';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Loginservice {
  UserDataAfterDecoded:BehaviorSubject<any>=new BehaviorSubject(null);

  constructor(private _HttpClient:HttpClient , @Inject(PLATFORM_ID) private id:object){
    if (isPlatformBrowser(id)){
      if(localStorage.getItem('user-token')){
        this.decodToken()
      }
    };
  }

  loginNow(loginForm:Loginform):Observable<any>{
    return this._HttpClient.post(`${ecStoreUrl.storeUrl}/api/v1/auth/signin`, loginForm)
  }

    decodToken(){
      
    const token = JSON.stringify(localStorage.getItem('user-token'));
    const decoded = jwtDecode(token);
    this.UserDataAfterDecoded.next(decoded); 
}
  
}
