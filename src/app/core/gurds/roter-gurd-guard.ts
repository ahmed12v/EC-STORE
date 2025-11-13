import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roterGurdGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  if(typeof window !== 'undefined'  && typeof localStorage !== 'undefined'){

    const isLoggedIn = !!localStorage.getItem('user-token')
    const publicRoutes = ['/login', '/register' , '/new-pass' , '/forget-password'];
  // if user logout + ** Url
     if (!isLoggedIn && !publicRoutes.includes(state.url)) {
         const currentRout = localStorage.getItem('last-path') || '/notfound'
         return router.parseUrl(currentRout); 
     }
  // if user login + ** Url
  if (isLoggedIn && publicRoutes.includes(state.url)) {
      const currentRout = localStorage.getItem('last-path') || '/notfound'
      return router.parseUrl(currentRout); 
    }

  }
 
  return true
  
};