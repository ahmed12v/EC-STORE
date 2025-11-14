import { Component, inject, Injector, OnInit, runInInjectionContext, signal } from '@angular/core';
import { HomeService } from '../../core/services/home/home';
import { ActivatedRoute } from '@angular/router';
import { Root2 } from '../../core/interfaces/components/product';
import { tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
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
    this.getSpecialProduct()
  }
_homeService=inject(HomeService)
_ActivateRoute=inject(ActivatedRoute)
_injector=inject(Injector)
spinnerLoad=signal(false)
specialPRoduct=signal<Partial<Root2>>({})

getSpecialProduct()
{
  let id :string 
  this._ActivateRoute.params.subscribe({
    next:parmeter=>{
      id=parmeter['id']
    }
  });
 this.spinnerLoad.set(true)
 runInInjectionContext(this._injector, ()=>{
    const specialSignal = toSignal(this._homeService.getOneProuduct(id).pipe(
      tap({
          next:res=>{
            this.spinnerLoad.set(false);
            this.specialPRoduct.set(res)
            console.log('commmmmmme' , this.specialPRoduct());
            
          },
          error:err=>{
            console.log(err);
            
          }
      })
    ))
    
 });

}

}
