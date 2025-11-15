import { Component, inject, Injector, OnInit, runInInjectionContext, signal, Pipe, Inject, PLATFORM_ID } from '@angular/core';
import { HomeSliderOne } from '../../../Addtions/home-slider-one/home-slider-one';
import { GategoryHomeSlider } from '../../../Addtions/gategory-home-slider/gategory-home-slider';
import { HomeService } from '../../../core/services/home/home';
import { Proud } from '../../../core/interfaces/components/product';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { ScrollRevealDirective } from '../../../shared/directives/animationScrool';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/components/cart-service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cart } from '../../../core/interfaces/components/cart';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [HomeSliderOne , GategoryHomeSlider , ScrollRevealDirective  , RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  ngOnInit(): void {
    this.getAllProuduct()
  }

  //#region inject&declare
  constructor(@Inject(PLATFORM_ID) private platformId: Object){}
  homeService=inject(HomeService)
  cartService=inject(CartService)
  FormBuilder=inject(FormBuilder)
  _injector=inject(Injector)
  _toster=inject(ToastrService)
  loadSpinner=signal(false)
  addTocartSppiner=signal(false)
  allProuduct=signal<Proud[]>([])
  //#endregion

 //#region getProduct
 getAllProuduct() {
  this.loadSpinner.set(true);

  runInInjectionContext(this._injector, () => {
    const comeProud = toSignal(
      this.homeService.getAllProud().pipe(
        tap({
          next: (res) => {
            this.loadSpinner.set(false);
            this.allProuduct.set(res.data);
            //console.log(this.allProuduct());
          },
          error: (err) => {
            this.loadSpinner.set(false);
            //console.log(err);
          }
        })
      )
    );
  });
};
//#endregion

//#region addProductToCart
addForm=new FormGroup({
  productId:new FormControl('',Validators.required)
})

addToCart(productId:string){
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
