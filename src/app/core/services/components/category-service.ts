import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../../interfaces/components/gategory-slider';
import { ecStoreUrl } from '../../../base/base';
import { RootCatoo } from '../../interfaces/components/category-interface';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {
   http=inject(HttpClient)

  getAllCategory():Observable<Result>{
     return this.http.get<Result>(`${ecStoreUrl.storeUrl}/api/v1/categories`)
  }

  getbyId(id:string):Observable<RootCatoo>{
    return this
    .http
    .get<RootCatoo>(`${ecStoreUrl.storeUrl}/api/v1/categories/${id}`)
  }
}
