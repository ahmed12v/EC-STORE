import { provideServerRendering, RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
 
  {
    path: 'prouductDeteils/:id', 
    renderMode: RenderMode.Server
  },
  {
    path: 'checkOut/:id', 
    renderMode: RenderMode.Server
  },
  {
    path: 'home',
    renderMode: RenderMode.Server
  },
  {
    path: 'forget-password',
    renderMode: RenderMode.Server
  },
  {
    path: 'cart',
    renderMode: RenderMode.Server
  },
  {
    path: 'wishlist',
    renderMode: RenderMode.Server
  },
  {
    path: 'prouduct',
    renderMode: RenderMode.Server
  },
  {
    path: 'new-pass',
    renderMode: RenderMode.Server
  },
  {
    path: 'register',
    renderMode: RenderMode.Server
  },
   {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  
];
