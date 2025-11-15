import { provideServerRendering, RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Server
  },
  {
    path: 'prouductDeteils/:id', 
    renderMode: RenderMode.Server
  },
  
];
