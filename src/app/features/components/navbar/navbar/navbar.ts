import { Component, effect, HostListener, Injector, OnInit, runInInjectionContext, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Loginservice } from '../../../../core/services/Auth/login';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit{
    constructor(private _Router:Router , private _Loginservice:Loginservice ){}

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
