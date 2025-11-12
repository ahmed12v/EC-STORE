import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  let authReq = req;
 
  return next(authReq).pipe(
    catchError(err => {
      if (err.status === 401) {
        localStorage.removeItem('user-token');
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};
