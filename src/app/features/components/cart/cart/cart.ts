import { Component, inject, Injector, OnInit, runInInjectionContext, signal } from '@angular/core';
import { CartService } from '../../../../core/services/components/cart-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { quantity, Root } from '../../../../core/interfaces/components/cart';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { log } from 'console';
@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit{
ngOnInit(): void {
  this.userCart()
}
//#region declare
_cartServise=inject(CartService);
loadSpin=signal(false);
_injectoer=inject(Injector);
userCartCome=signal<Root | null>(null);
_toaster=inject(ToastrService)
waitUpdate=signal(false)
removeproductSpin=signal(false)
clearUsercartSoin=signal(false)
//#endregion

//#region getUserCart
userCart(){
  this.loadSpin.set(true)
  runInInjectionContext(this._injectoer,()=>{
    const userCart = toSignal(this._cartServise.getUserCart().pipe(
      tap({
        next:res=>{
          this.loadSpin.set(false)
          this.userCartCome.set(res)
          console.log(this.userCartCome());
          
        },
        error:err=>{
          this.loadSpin.set(false)
          console.log(err);
          
        }
      })
    ))
  })
}
//#endregion

//#region updateCount
counForm=new FormGroup({
  count:new FormControl( '', Validators.required)
})
updateCountProduct(productId:string,count:any){
      this.waitUpdate.set(true)
     setTimeout(()=>{
      this.waitUpdate.set(false);
     },3000)
  this.counForm.patchValue({count:count})
  if(this.counForm.valid){
    runInInjectionContext(this._injectoer,()=>{
      const newCount = toSignal(this._cartServise.updateProductQuantityInCart(
        this.counForm.value as quantity , productId).pipe(
          tap({
            next:res=>{
                  this.userCart()
                  this._toaster.success('Updated Success','', {
                  toastClass: 'custom-toast toast-success',
               }) 
               console.log(res);
               
            },
            error:err=>{
              console.log(err);
              
            }
          })
        ))
    })
  }
}
//#endregion


//#region remove product
    removeProduct(productId:string){
      this.removeproductSpin.set(true)
      runInInjectionContext(this._injectoer,()=>{
        const removSignal = toSignal(this._cartServise.removeProductFrpmCart(productId).pipe(
          tap({
            next:res=>{
               console.log(res);
               this.removeproductSpin.set(false)
               this._toaster.success('product removed' )
               this.userCart()
            },
            error:err=>{
                  console.log(err);
                  this.removeproductSpin.set(false)
                  this._toaster.error('error in removed')
            }
          })
        ))
      })
    }
//#endregion

//#region clearAll
ClearAll(){
      this.clearUsercartSoin.set(true)
      runInInjectionContext(this._injectoer,()=>{
        const clearSignal = toSignal(this._cartServise.clearUserCart().pipe(
          tap({
            next:res=>{
               console.log(res);
               this.clearUsercartSoin.set(false)
               this._toaster.success('Your Cart empty now' )
               this.userCart()
            },
            error:err=>{
                  console.log(err);
                  this.clearUsercartSoin.set(false)
                  this._toaster.error('error in cleared')
            }
          })
        ))
      })
    }
//#endregion

}
