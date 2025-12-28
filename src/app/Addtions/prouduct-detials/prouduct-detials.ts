import { Component, Inject, inject, Injector, OnInit, PLATFORM_ID, runInInjectionContext, signal } from '@angular/core';
import { HomeService } from '../../core/services/home/home';
import { ActivatedRoute } from '@angular/router';
import { Root2 } from '../../core/interfaces/components/product';
import { tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/components/cart-service';
import { isPlatformBrowser } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cart } from '../../core/interfaces/components/cart';
@Component({
  selector: 'app-prouduct-detials',
  imports: [CarouselModule],
  templateUrl: './prouduct-detials.html',
  styleUrl: './prouduct-detials.css',
})
export class ProuductDetials implements OnInit{
  customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,              
  nav: false,               
  navSpeed: 1000,
  autoplay: true,
  autoplayTimeout: 2000,
  autoplayHoverPause: true,
  responsive: {
    0: { items: 1 },
    400: { items: 1 },
    550: { items: 1 },
    740: { items: 1 },
    940: { items: 1 }
  },
};
  ngOnInit(): void {
    this.specialPRoduct.set(
      this._ActivateRoute.snapshot.data['thisProductDetials']
    )
  }
 constructor(@Inject(PLATFORM_ID) private platformId: Object){}
_toster=inject(ToastrService)
addTocartSppiner=signal(false)
cartService=inject(CartService)
_homeService=inject(HomeService)
_ActivateRoute=inject(ActivatedRoute)
_injector=inject(Injector)
spinnerLoad=signal(false)
specialPRoduct=signal<Partial<Root2>>({})


//#region addProductToCart
addForm=new FormGroup({
  productId:new FormControl('',Validators.required)
})

addToCart(productId:string | any){
  this.addForm.patchValue({
    productId:productId
  })
  if(this.addForm.valid){
    this.addTocartSppiner.set(true)
    runInInjectionContext(this._injector,()=>{
      const addSignal =toSignal(this.cartService.addProductTouserCart(this.addForm.value as Cart).pipe(
        tap({
             next:res=>{
             // console.log(res);
              this.addTocartSppiner.set(false)
              if(isPlatformBrowser(this.platformId)){
              this._toster.success(res.message,'', {
              toastClass: 'custom-toast toast-success',
               })              
              }
              
              
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
