import { Component, Injector, runInInjectionContext, signal } from '@angular/core';
import { RestPasswodAfterForget } from '../../../../core/services/Auth/rest-passwod-after-forget';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserEmail } from '../../../../core/services/Auth/SaveUserEmail/user-email';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css',
})
export class ForgetPassword {
  constructor(
    private _RestPasswodAfterForgetService:RestPasswodAfterForget ,
    private _injector:Injector,
    private _Router:Router,
    private _UserEmail:UserEmail
    ){}
  btnSpinnerForget=signal(false)
  btnSpinnerCode=signal(false)
  errorMsg=signal('')
  errorMsgCode=signal('')
  openCodePopup=signal(false)

  //#region forget-work
  forgetForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required , Validators.email])
  })

 

  sendEmail(){
    if(this.forgetForm.valid)
    {
      const email = this.forgetForm.get('email')?.value;
      if(email) this._UserEmail.setUseremail(email)
        
      this.btnSpinnerForget.set(true)
      runInInjectionContext(this._injector, ()=>{
        const result = toSignal(this._RestPasswodAfterForgetService.submitEmail(this.forgetForm.value).pipe(
        tap({
              next:res=>{ 
                this.btnSpinnerForget.set(false)
                this.openCodePopup.set(true)
                this.forgetForm.reset()
               },
               error:err=>{
                 this.btnSpinnerForget.set(false)
                 this.errorMsg.set(err.error.message)
                 this.forgetForm.reset()
                 //console.log(this.errorMsg());
                 
              } 
      })))
      }
        
       )
      
    }
  }
  
//#endregion

   //#region code-work
   CodeForm:FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required , Validators.minLength(4)])
  })

  sendCode(){
    if(this.CodeForm.valid)
    {
      this.btnSpinnerCode.set(true)
      runInInjectionContext(this._injector, ()=>{
        const result = toSignal(this._RestPasswodAfterForgetService.submitCode(this.CodeForm.value).pipe(
        tap({
              next:res=>{ 
                this.btnSpinnerCode.set(false)
                this.CodeForm.reset() 
                this._Router.navigate(['/new-pass'])  
               },
               error:err=>{
                 this.btnSpinnerCode.set(false)
                 this.errorMsgCode.set(err.error.message)
                 this.CodeForm.reset() 
                 //console.log(this.errorMsgCode());
                  
              } 
      })))
      }
        
       )
      
    }
  }
  //#endregion

}
