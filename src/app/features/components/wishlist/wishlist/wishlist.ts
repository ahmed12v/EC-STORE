import { WishlistInterFace } from './../../../../core/interfaces/components/wishlist';
import { Component, inject, Injector, OnInit, runInInjectionContext, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../../../core/services/components/wishlist';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { Cart } from '../../../../core/interfaces/components/cart';
import { CartService } from '../../../../core/services/components/cart-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ScrollRevealDirective } from '../../../../shared/directives/animationScrool';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink , ScrollRevealDirective],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist implements OnInit{
  ngOnInit(): void {
    this.getWishes()
  }
  wishServices=inject(WishlistService)
  _toaster=inject(ToastrService)
  cartService=inject(CartService)
  injector=inject(Injector)
  allwishes=signal<WishlistInterFace|null>(null)
  addTocartSppiner=signal(false)

  getWishes(){
    runInInjectionContext(this.injector,()=>{
      const wishesSignal = toSignal(this.wishServices.getWishList().pipe(
        tap({
          next:res=>{
            this.allwishes.set(res)
            console.log(res);
            
          },
          error:err=>{
            console.log(err);
            
          }
        })
      ))
    })
  }

  addForm=new FormGroup({
  productId:new FormControl('',Validators.required)
})

addToCart(productId:string){
  this.addForm.patchValue({
    productId:productId
  })
  if(this.addForm.valid){
    this.addTocartSppiner.set(true)
    runInInjectionContext(this.injector,()=>{
      const addSignal =toSignal(this.cartService.addProductTouserCart(this.addForm.value as Cart).pipe(
        tap({
             next:res=>{
             // console.log(res);
              this.addTocartSppiner.set(false)
             
              this._toaster.success(res.message,'', {
              toastClass: 'custom-toast toast-success',
               })              
              
              
              
             },
             error:err=>{
              //console.log(err);
              this.addTocartSppiner.set(false)
             }
        })
      ))
    })
  }
}
//#endregion

}
