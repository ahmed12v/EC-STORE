import { quantity } from './../../interfaces/components/cart';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Cart, Root } from '../../interfaces/components/cart';
import { Observable } from 'rxjs';
import { ecStoreUrl } from '../../../base/base';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  htpp= inject(HttpClient)

  addProductTouserCart(productId:Cart):Observable<any>{
    return this.htpp.post(`${ecStoreUrl.storeUrl}/api/v1/cart`,productId)
  }

  getUserCart():Observable<Root>{
    return this.htpp.get<Root>(`${ecStoreUrl.storeUrl}/api/v1/cart`)
  }

  updateProductQuantityInCart(count:quantity , productId:string):Observable<any>{
    return this.htpp.put(`${ecStoreUrl.storeUrl}/api/v1/cart/${productId}`,count)
  }
  
}
