import { RoleModel } from "./role";


export interface RegisterModel{
    email:string;
    username:string;
    password:string;
    confirmPassword:string;
    role:RoleModel;
}