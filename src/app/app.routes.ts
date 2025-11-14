
import { Routes } from '@angular/router';
import { roterGurdGuard } from './core/gurds/roter-gurd-guard';
import { Notfound } from './features/components/notfound/notfound/notfound';

export const routes: Routes = [
    {
        path:'' , redirectTo:'login' , pathMatch:'full'
    },
    // Auth | create Account
    {
        path:'login' , 
        loadComponent:()=>
            import('./features/Auth/login/login/login').then((c)=>c.Login)
    },
    {
        path:'register',
        loadComponent:()=>
            import('./features/Auth/register/register/register').then((c)=>c.Register)
    },
    {
        path:'forget-password',
        loadComponent:()=>
            import('./features/Auth/forget-password/forget-password/forget-password')
            .then((c)=>c.ForgetPassword), 
             canActivate:[roterGurdGuard]
            
    },
    {
        path:'new-pass',
        loadComponent:()=>
            import('./features/Auth/newPassword/new-password/new-password')
            .then((c)=>c.NewPassword),
            canActivate:[roterGurdGuard]
    },
    
    // pages | Components
    {
        path:'home',
        loadComponent:()=>
            import('./features/home/home/home').then((c)=>c.Home),
             canActivate:[roterGurdGuard]
    },
    {
        path:'prouductDeteils/:id',
        loadComponent:()=>
            import('./Addtions/prouduct-detials/prouduct-detials').then((c)=>c.ProuductDetials),
             canActivate:[roterGurdGuard]
    },
    {
        path:'Prouduct',
        loadComponent:()=>
            import('./features/components/products/products/products').then((c)=>c.Products),
             canActivate:[roterGurdGuard]
    },
    
    // notfound | error 404
    {
        path: '**', component:Notfound , 
    }
];
