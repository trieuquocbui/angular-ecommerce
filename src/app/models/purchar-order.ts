import { PurchaseOrderDetailsModel } from "./purchar-order-details";
import { ReceiptModel } from "./receipt";
import { StaffModel } from "./staff";
import { SupplierModel } from "./supplier";

export class PurchaseOrderModel{
    id?:number;
    date?:Date;
    supplier?:SupplierModel;
    staff?:StaffModel;
    receipt?:ReceiptModel;
    orderDetails?:PurchaseOrderDetailsModel[];
}