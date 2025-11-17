import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  let _toaster=inject(ToastrService)
  let authReq = req;
 
  return next(authReq).pipe(
    catchError(err => {
      if (err.status === 401) {
        localStorage.removeItem('user-token');
        router.navigate(['/login']);
        _toaster.error('Session expired. Please login again','',{
          toastClass: 'custom-toast toast-success',
        })
      }
      return throwError(() => err);
    })
  );
};
