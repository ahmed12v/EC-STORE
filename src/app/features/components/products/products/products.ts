import { Component, Inject, inject, Injector, OnInit, PLATFORM_ID, runInInjectionContext, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Proud } from '../../../../core/interfaces/components/product';
import { HomeService } from '../../../../core/services/home/home';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { ScrollRevealDirective } from '../../../../shared/directives/animationScrool';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SerchPipePipe } from '../../../../shared/pipes/serch-pipe-pipe';
import { FormControl, FormGroup, FormsModule, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../../core/services/components/cart-service';
import { Cart } from '../../../../core/interfaces/components/cart';

@Component({
  selector: 'app-products',
  imports: [RouterLink, ScrollRevealDirective, CommonModule, SerchPipePipe, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit{
ngOnInit(): void {
    this.getAllProuduct()
  }
  constructor(@Inject(PLATFORM_ID) private platformId: Object){}
  _toster=inject(ToastrService)
addTocartSppiner=signal(false)
cartService=inject(CartService)
  userWord=signal('')
  homeService=inject(HomeService)
  _injector=inject(Injector)
  loadSpinner=signal(false)
  allProuduct=signal<Proud[]>([])
  
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
}

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
