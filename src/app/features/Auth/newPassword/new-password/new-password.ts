import { CommonModule } from '@angular/common';
import { Component, Injector, OnInit, runInInjectionContext, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestPasswodAfterForget } from '../../../../core/services/Auth/rest-passwod-after-forget';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { UserEmail } from '../../../../core/services/Auth/SaveUserEmail/user-email';

@Component({
  selector: 'app-new-password',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './new-password.html',
  styleUrl: './new-password.css',
})
export class NewPassword implements OnInit{
  ngOnInit(): void {
    const email = this._UserEmail.userEmail();
    if(email()){
       this.resetForm.patchValue({
        email : email()
       })
    }
  }

  constructor(private _RestPasswodAfterForget:RestPasswodAfterForget ,
     private _injector:Injector ,
      private _Router:Router,
      private _UserEmail:UserEmail
    ){}
  banSpinner =signal(false)
  errorMsg =signal('')

  resetForm:FormGroup =new FormGroup({
    email:new FormControl(''  , [Validators.email , Validators.required]),
    newPassword:new FormControl('' , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)])
  })

  NewPassNow(){
    if(this.resetForm.valid){
      this.banSpinner.set(true)
      runInInjectionContext(this._injector , ()=>{
        const respont = toSignal(this._RestPasswodAfterForget.resetNewPassword(this.resetForm.value).pipe(
          tap({
            next:res =>{
              this.banSpinner.set(false)
              this._Router.navigate(['/login'])
              //console.log(res);
              
            },
            error:err=>{
              this.banSpinner.set(false)
              console.log(err);
              this.errorMsg.set(err.error.message);
              //console.log(this.errorMsg());
              console.log(err);
              
              
              
            }
          })
        )
      )
      })
    }
  }

}
