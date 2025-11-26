import { Component, DestroyRef, inject, Injector, OnInit, runInInjectionContext, signal } from '@angular/core';
import { ctegories } from '../../../../core/interfaces/components/gategory-slider';
import { CategoryService } from '../../../../core/services/components/category-service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { ScrollRevealDirective } from '../../../../shared/directives/animationScrool';
import { Datacatoo, RootCatoo } from '../../../../core/interfaces/components/category-interface';
import { Data } from '../../../../core/interfaces/components/cart';


@Component({
  selector: 'app-categories',
  imports: [ScrollRevealDirective],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit{
  ngOnInit(): void {
    this.catrgoryCome()
  }
  categoryService=inject(CategoryService)
Result =signal<ctegories[]>([])
spinerload=signal(false)
_inject=inject(Injector)
openPopup=signal(false)
destroy=inject(DestroyRef)
//#region catoCome
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
//#endregion
openPopupNow(id:string){
  document.body.classList.add('no-scroll');
  this.openPopup.set(true)
  this.getCategoryById(id)
}
closePopup(){
  document.body.classList.remove('no-scroll');
  this.openPopup.set(false)
}
dataObject!:Datacatoo ;

//#region getbyId
 getCategoryById(id:string){
  this.categoryService.getbyId(id).pipe(
    takeUntilDestroyed(this.destroy)
  )
  .subscribe({
    next:(res)=>{
      this.dataObject=(res.data)
     // console.log(this.dataObject());
    }
  })
 }
//#endregion
}
