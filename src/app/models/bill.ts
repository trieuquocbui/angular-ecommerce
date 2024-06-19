import Cart_Item from "./cartItem";
import { UserModel } from "./user";

export default class BillModel{
    id?:number;
    province?:string;
    district?:string;
    ward?:string;
    totalAmount?:number;
    addressHome?:string;
    note?:string;
    orderDay?:Date;
    status?:number;
    billDetails?:Cart_Item[];
    user?:UserModel;
}