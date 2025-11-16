import { provideServerRendering, RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
 
  {
    path: 'prouductDeteils/:id', 
    renderMode: RenderMode.Server
  },
   {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  
];
