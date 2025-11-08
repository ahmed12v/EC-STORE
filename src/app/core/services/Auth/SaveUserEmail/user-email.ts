import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserEmail {
  private _userEmail =signal<string | null>(null)
  userEmail=this._userEmail.asReadonly
  setUseremail(email:string)
  {
    this._userEmail.set(email)
  }
  
}
