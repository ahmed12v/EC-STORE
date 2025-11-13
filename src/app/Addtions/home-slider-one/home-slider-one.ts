import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-slider-one',
  imports: [CarouselModule , CommonModule],
  templateUrl: './home-slider-one.html',
  styleUrl: './home-slider-one.css',
})
export class HomeSliderOne {
  images = [
  '/photo1.jpg',
  '/photo2.jpg',
  '/photo3.jpg',
  '/photo4.jpg',
  '/photo5.jpg',
  '/photo6.jpg'
];

  customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,              
  nav: false,               
  navSpeed: 1000,
  autoplay: true,
  autoplayTimeout: 2000,
  autoplayHoverPause: true,
  responsive: {
    0: { items: 1 },
    400: { items: 1 },
    740: { items: 1 },
    940: { items: 1 }
  },
  dotsData: true             
};


}
