import { CommonModule } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { constants } from 'buffer';

@Component({
  selector: 'app-scrollbnt',
  imports: [CommonModule],
  templateUrl: './scrollbnt.html',
  styleUrl: './scrollbnt.css',
})
export class Scrollbnt {

  showBtn = false ; 
  @HostListener('window:scroll', [])
  onWindowScroll(){
    const scroly = window.scrollY || document.documentElement.scrollTop ;
    this.showBtn = scroly > 200 

  }
  
    scrolTop(){
      window.scrollTo({
        top : 0 ,
        behavior : 'smooth'
      })
    }


}
