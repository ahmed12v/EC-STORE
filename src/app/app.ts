import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Navbar } from './features/components/navbar/navbar/navbar';
import { Footer } from './features/components/footer/footer/footer';
import { Scrollbnt } from './Addtions/scrollbnt/scrollbnt';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , Navbar , Footer , Scrollbnt ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('EC-Store');
  private router = inject(Router)
  ngOnInit(): void {
    if(typeof window !== 'undefined' && typeof localStorage !== 'undefined'){
    // navigate to last-route
    const lastPath = localStorage.getItem('last-path')
    if(lastPath && lastPath !== '/'  ){
     this.router.navigateByUrl(lastPath)
    }
   // router subscribe
    this.router.events.subscribe(ev =>{
      if(ev instanceof NavigationEnd){
        localStorage.setItem('last-path' , ev.urlAfterRedirects)
      }
    })

    }
    
  }

}
