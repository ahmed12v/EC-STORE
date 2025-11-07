import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loginform } from '../../interfaces/Auth/login';
import { Observable } from 'rxjs';
import { ecStoreUrl } from '../../../base/base';

@Injectable({
  providedIn: 'root',
})
export class Loginservice {
  constructor(private _HttpClient:HttpClient){}

  loginNow(loginForm:Loginform):Observable<any>{
    return this._HttpClient.post(`${ecStoreUrl.storeUrl}/api/v1/auth/signin`, loginForm)
  }
  
}
