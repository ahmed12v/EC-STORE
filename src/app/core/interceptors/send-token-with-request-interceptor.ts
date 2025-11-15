import { HttpInterceptorFn } from '@angular/common/http';

export const sendTokenWithRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('user-token'); 

  if (token) {
    req = req.clone({
      setHeaders: {
        token: token
      }
    });
  }

  return next(req);
};
