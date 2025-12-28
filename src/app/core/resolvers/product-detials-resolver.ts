import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HomeService } from '../services/home/home';
import { Root2 } from '../interfaces/components/product';

export const productDetialsResolver: ResolveFn<Root2> = (route, state) => {
   const productService = inject(HomeService) ; 
   const id = route.paramMap.get('id');
   return productService.getOneProuduct(id!)
};
