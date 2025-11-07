import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signup } from '../../interfaces/Auth/signup';
import { Observable } from 'rxjs';
import { ecStoreUrl } from '../../../base/base';

@Injectable({
  providedIn: 'root',
})
export class SignUp {
    constructor(private _HttpClient:HttpClient){}

    SignUpNow(SignUpFornm:Signup):Observable<any>{
      return this._HttpClient.post(`${ecStoreUrl.storeUrl}/api/v1/auth/signup`,SignUpFornm)
    }
}
