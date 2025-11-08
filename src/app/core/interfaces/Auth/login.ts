import { inherits } from "util"

export interface Loginform {
    email:string,
    password:string
}

export interface forgetpassworForm{
    email:string
}

export interface CodeFform{
    resetCode:string
}

export interface resetPassForm  {
     email:string,
    newPassword:string
}
