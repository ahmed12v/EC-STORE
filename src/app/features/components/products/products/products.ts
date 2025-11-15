import { Component, inject, Injector, OnInit, runInInjectionContext, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Proud } from '../../../../core/interfaces/components/product';
import { HomeService } from '../../../../core/services/home/home';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { ScrollRevealDirective } from '../../../../shared/directives/animationScrool';
import { CommonModule } from '@angular/common';
import { SerchPipePipe } from '../../../../shared/pipes/serch-pipe-pipe';
import { FormsModule } from "@angular/forms";

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
            console.log(this.allProuduct());
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
