import { ProductModel } from "./product";

export class PurchaseOrderDetailsModel {
    quantity?:number;
    price?:number;
    product?:ProductModel;
}