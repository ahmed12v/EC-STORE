import { ctegories, Result } from './../../core/interfaces/components/gategory-slider';
import { Component, inject, Injector, OnInit, runInInjectionContext, signal } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { GategorySlider } from '../../core/services/home/gategory-slider';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'app-gategory-home-slider',
  imports: [CarouselModule],
  templateUrl: './gategory-home-slider.html',
  styleUrl: './gategory-home-slider.css',
})
export class GategoryHomeSlider implements OnInit{
  ngOnInit(): void {
    this.catrgoryCome()
  }
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
    400: { items: 2 },
    550: { items: 2 },
    740: { items: 3 },
    940: { items: 4 }
  },
};

categoryService=inject(GategorySlider)
Result =signal<ctegories[]>([])
spinerload=signal(false)
_inject=inject(Injector)

catrgoryCome(){
  this.spinerload.set(true)
  runInInjectionContext(this._inject,()=>{
    const catoResulrt = toSignal(this.categoryService.getAllCategory().pipe(tap({
    next:res=>{
       this.Result.set(res.data)
       this.spinerload.set(false)
       //console.log(this.Result());
       
    },
    error:err=>{
      this.spinerload.set(false)
      //console.log(err);
      
    }
  })))
  })
  
}


}
