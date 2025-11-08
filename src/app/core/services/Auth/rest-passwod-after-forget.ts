import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CodeFform, forgetpassworForm, resetPassForm } from '../../interfaces/Auth/login';
import { Observable } from 'rxjs';
import { ecStoreUrl } from '../../../base/base';

@Injectable({
  providedIn: 'root',
})
export class RestPasswodAfterForget {
  constructor(private _HttpClient:HttpClient){}

  submitEmail(forgetForm:forgetpassworForm):Observable<any>
  {
    return this._HttpClient.post(`${ecStoreUrl.storeUrl}/api/v1/auth/forgotPasswords`,forgetForm)
  }
  
  submitCode(codeForm:CodeFform):Observable<any>
  {
    return this._HttpClient.post(`${ecStoreUrl.storeUrl}/api/v1/auth/verifyResetCode`,codeForm)
  }

  resetNewPassword(resetForm:resetPassForm):Observable<any>
  {
    return this._HttpClient.put(`${ecStoreUrl.storeUrl}/api/v1/auth/resetPassword`,resetForm)
  }
  
}
