import { Component, inject, Injector, runInInjectionContext, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../core/services/components/cart-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './check-out.html',
  styleUrl: './check-out.css',
})
export class CheckOut {
  activatedRoute=inject(ActivatedRoute);
  cartservce=inject(CartService);
  Router=inject(Router);
  Injector=inject(Injector);
  toater =inject(ToastrService);
  spinn=signal(false)
  
  shopingForm:FormGroup = new FormGroup({
    details:new FormControl(null , [Validators.required , Validators.minLength(3)]),
    phone:new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city:new FormControl(null,[Validators.required ,Validators.minLength(3)])
  })

  CheckoutNow(){
    let id:string ; 
    this.activatedRoute.params.subscribe({
      next:p=>{
        id=p['id']
      }
    }) 
    if(this.shopingForm.valid){
     this.spinn.set(true)
      runInInjectionContext(this.Injector,()=>{
        const checkSignal = toSignal(this.cartservce.checkOut(this.shopingForm.value , id).pipe(
          tap({
            next:res=>{
              if(typeof window !== 'undefined'){
               window.location.href = res.session.url;
              }
              //console.log(res);
              this.spinn.set(false)
            },
            error:err=>{
              this.toater.error('error in your details')
              //console.log(err);
              this.spinn.set(false)
            }
          })
        ))
      })
    }
  }
}
