import { checkOutForm, quantity } from './../../interfaces/components/cart';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal, DestroyRef } from '@angular/core';
import { Cart, Root } from '../../interfaces/components/cart';
import { Observable, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ecStoreUrl } from '../../../base/base';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private htpp = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  numberOfitmes = signal(0);


  addProductTouserCart(productId: Cart): Observable<any> {
    return this.htpp.post(`${ecStoreUrl.storeUrl}/api/v1/cart`, productId).pipe(
      tap(() => this.loadCartCount())
    );
  }

  getUserCart(): Observable<Root> {
    return this.htpp.get<Root>(`${ecStoreUrl.storeUrl}/api/v1/cart`);
  }

  updateProductQuantityInCart(count: quantity, productId: string): Observable<any> {
    return this.htpp.put(`${ecStoreUrl.storeUrl}/api/v1/cart/${productId}`, count).pipe(
      tap(() => this.loadCartCount())
    );
  }

  removeProductFrpmCart(productId: string): Observable<any> {
    return this.htpp.delete(`${ecStoreUrl.storeUrl}/api/v1/cart/${productId}`).pipe(
      tap(() => this.loadCartCount())
    );
  }

  clearUserCart(): Observable<any> {
    return this.htpp.delete(`${ecStoreUrl.storeUrl}/api/v1/cart`).pipe(
      tap(() => this.loadCartCount())
    );
  }

  checkOut(shippingAddress: checkOutForm, cartId: string): Observable<any> {
    return this.htpp.post(
      `${ecStoreUrl.storeUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      shippingAddress
    ).pipe(
      tap(() => this.loadCartCount())
    );
  }

  loadCartCount() {
    this.getUserCart().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((res: Root) => {
      this.numberOfitmes.set(res?.numOfCartItems);
    });
  }
}