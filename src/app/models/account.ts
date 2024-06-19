import { RoleModel } from "./role";
import { StaffModel } from "./staff";
import { UserModel } from "./user";

export class AccountModel{
    id?:number;
    username?:string;
    role?:RoleModel;
    status?:boolean;
    user?:UserModel;
    staff?:StaffModel;
}