import { OrderModule } from "../components/admin/order/order.module";
import { ReceiptDetailsModel } from "./receiptDetails";

export class ReceiptModel{
    id?:string;
    date?:Date;
    order?:OrderModule;
    listReceiptDetails?:ReceiptDetailsModel[];
}