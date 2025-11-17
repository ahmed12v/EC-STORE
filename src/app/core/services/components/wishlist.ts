import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { bodyWish, WishlistInterFace } from '../../interfaces/components/wishlist';
import { ecStoreUrl } from '../../../base/base';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
    http=inject(HttpClient)
    numberOfitmes=signal(0)
    constructor(){
      this.loadWishCount()
    }
    addTowishList(idForm:bodyWish):Observable<any>{
      return this.http.post(`${ecStoreUrl.storeUrl}/api/v1/wishlist`,idForm).pipe(
        tap(()=>{this.loadWishCount()})
      )
    }

    getWishList():Observable<WishlistInterFace>{
      return this.http.get<WishlistInterFace>(`${ecStoreUrl.storeUrl}/api/v1/wishlist`)
    }

    remove(produId:string):Observable<any>{
      return this.http.delete(`${ecStoreUrl.storeUrl}/api/v1/wishlist/${produId}`).pipe(
        tap(()=>{this.loadWishCount()})
      )
    }

    loadWishCount(){
        this.getWishList().subscribe((res:WishlistInterFace)=>{
          this.numberOfitmes.set(res?.count)
        })
      }
}
