
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
        path:'prouduct',
        loadComponent:()=>
            import('./features/components/products/products/products').then((c)=>c.Products),
             canActivate:[roterGurdGuard]
    },
    {
        path:'wishlist',
        loadComponent:()=>
            import('./features/components/wishlist/wishlist/wishlist').then((c)=>c.Wishlist),
             canActivate:[roterGurdGuard]
    },
    {
        path:'cart',
        loadComponent:()=>
            import('./features/components/cart/cart/cart').then((c)=>c.Cart),
             canActivate:[roterGurdGuard]
    },
    {
        path:'brands',
        loadComponent:()=>
            import('./features/components/Brands/brand/brand').then((c)=>c.Brand),
             canActivate:[roterGurdGuard]
    },
    {
        path:'category',
        loadComponent:()=>
            import('./features/components/categories/categories/categories').then((c)=>c.Categories),
             canActivate:[roterGurdGuard]
    },
    {
        path:'checkOut/:id',
        loadComponent:()=>
            import('./Addtions/check-out/check-out').then((c)=>c.CheckOut),
             canActivate:[roterGurdGuard]
    },
    
    // notfound | error 404
    {
        path: '**', component:Notfound , 
    }
];
