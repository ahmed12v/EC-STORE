
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
    {
        path:'forget-password',
        loadComponent:()=>
            import('./features/Auth/forget-password/forget-password/forget-password')
            .then((c)=>c.ForgetPassword)
    },
    {
        path:'new-pass',
        loadComponent:()=>
            import('./features/Auth/newPassword/new-password/new-password')
            .then((c)=>c.NewPassword)
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
