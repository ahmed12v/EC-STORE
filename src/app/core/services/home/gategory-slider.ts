import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ecStoreUrl } from '../../../base/base';
import { Result } from '../../interfaces/components/gategory-slider';

@Injectable({
  providedIn: 'root',
})
export class GategorySlider {
  http=inject(HttpClient)

  getAllCategory():Observable<Result>{
     return this.http.get<Result>(`${ecStoreUrl.storeUrl}/api/v1/categories`)
  }
  
}
