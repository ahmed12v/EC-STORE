import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Root, Root2 } from '../../interfaces/components/product';
import { ecStoreUrl } from '../../../base/base';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  htpp=inject(HttpClient)
 private _allProducts = signal<Root | null | undefined>(null);

  get allProducts() {
    if (this._allProducts()) return this._allProducts;

    const obs$ = this.htpp.get<Root>(`${ecStoreUrl.storeUrl}/api/v1/products`);
    const allProductsSignal = toSignal(obs$) ?? signal<Root | null | undefined>(null);
    this._allProducts.set(allProductsSignal());
    return this._allProducts;
  }
  
  getOneProuduct(id:string):Observable<Root2>{
  return this.htpp.get<Root2>(`${ecStoreUrl.storeUrl}/api/v1/products/${id}`)
  }
}
