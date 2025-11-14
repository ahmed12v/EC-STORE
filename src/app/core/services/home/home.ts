import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Root, Root2 } from '../../interfaces/components/product';
import { ecStoreUrl } from '../../../base/base';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  htpp=inject(HttpClient)
  
  getAllProud():Observable<Root>{
    return this.htpp.get<Root>(`${ecStoreUrl.storeUrl}/api/v1/products`)
  }
  
  getOneProuduct(id:string):Observable<Root2>{
  return this.htpp.get<Root2>(`${ecStoreUrl.storeUrl}/api/v1/products/${id}`)
  }
}
