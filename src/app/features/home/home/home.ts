import { Component, inject, Injector, OnInit, runInInjectionContext, signal } from '@angular/core';
import { HomeSliderOne } from '../../../Addtions/home-slider-one/home-slider-one';
import { GategoryHomeSlider } from '../../../Addtions/gategory-home-slider/gategory-home-slider';
import { HomeService } from '../../../core/services/home/home';
import { Proud } from '../../../core/interfaces/components/product';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [HomeSliderOne , GategoryHomeSlider],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  ngOnInit(): void {
    this.getAllProuduct()
  }
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

}
