import { Component, effect, HostListener, Injector, OnInit, runInInjectionContext, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Loginservice } from '../../../../core/services/Auth/login';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { CartService } from '../../../../core/services/components/cart-service';
import { WishlistService } from '../../../../core/services/components/wishlist';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit{
  cartCount=signal(0)
  wishCount=signal(0)
    constructor(private _Router:Router ,
       private _Loginservice:Loginservice ,
        private CartService:CartService,
        private _wishlistservice:WishlistService
      ){
      effect(()=>{
        this.cartCount.set(this.CartService.numberOfitmes());
        this.wishCount.set(this._wishlistservice.numberOfitmes())
      })

    }

    isMenuOpen = false;
    isLogin = false;
    
  ngOnInit(): void {
     
    this._Loginservice.UserDataAfterDecoded.subscribe((dc)=>{
      if(dc){
        this.isLogin= true
      }else{
        this.isLogin= false
      }
    })
  }
  
logout(){
  localStorage.removeItem('user-token')
  this._Loginservice.UserDataAfterDecoded.next(null)
  this._Router.navigate(['/login'])
  this.isLogin= false
}

toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}

}
