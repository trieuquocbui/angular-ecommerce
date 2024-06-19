import BillModel from "./bill";

export class SupplierModel{
    id?:string;
    name?:string;
    phoneNumber?:string;
    address?:String;
    status?:boolean;
    orders?:BillModel[];
}