
import { Routes } from '@angular/router';

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

    // pages | Components
    {
        path:'home',
        loadComponent:()=>
            import('./features/home/home/home').then((c)=>c.Home)
    },
    
    // notfound | error 404
    {
        path:'**' , 
        loadComponent:()=>
            import('./features/components/notfound/notfound/notfound').then((c)=>c.Notfound)
    }
];
