import { HttpInterceptorFn } from '@angular/common/http';

export const sendTokenWithRequestInterceptor: HttpInterceptorFn = (req, next) => {
  let token = '';

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('user-token') ?? '';
  }

  if (token) {
    req = req.clone({
      setHeaders: {
        token: token,
      },
    });
  }

  return next(req);
};

