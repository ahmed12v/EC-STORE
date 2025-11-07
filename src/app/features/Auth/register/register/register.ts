import { Component, effect, inject, Injector, runInInjectionContext, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { SignUp } from '../../../../core/services/Auth/sign-up';
import { AbstractControl, FormControl, FormGroup , FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { Signup } from '../../../../core/interfaces/Auth/signup';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, FormsModule , CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  constructor(private _SignUpService:SignUp  , private _router:Router){

  }
  btnSpinner = signal(false);
  private injector = inject(Injector);
  errorMasge=signal('')
  //#region form Work
  signUpForm : FormGroup = new FormGroup({
    name:new FormControl('' , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
    phone:new FormControl('', [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
    email:new FormControl(''  , [Validators.email , Validators.required]),
    password:new FormControl('' , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]),
    rePassword:new FormControl('',[Validators.required]),
  },this.checkrePassword);

  checkrePassword(match: AbstractControl) {
    if (match.get('password')?.value === match.get('rePassword')?.value) {
      return null;
    } else {
      match.get('rePassword')?.setErrors({ missmatch: true });
      return { missmatch: true };
    }
  }
  //#endregion
 

 submitSign() {
  if (this.signUpForm.valid) {
    this.btnSpinner.set(true);

    runInInjectionContext(this.injector, () => {
      const response = toSignal(
        this._SignUpService.SignUpNow(this.signUpForm.value as Signup).pipe(
        tap({
          next:res=>{
            this.btnSpinner.set(false)
            this.signUpForm.reset()
            this._router.navigate(['/login'])
           // console.log(res);
            
          },
          error:err=>{
            this.btnSpinner.set(false)
            this.signUpForm.reset()
            this.errorMasge.set(err.error.message)
            //console.log(this.errorMasge());
          }
        })
          
        )
      );   
    });
  }
 
}

}
