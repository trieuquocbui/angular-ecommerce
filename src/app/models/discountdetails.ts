import { DiscountModel } from "./discount";
import { ProductModel } from "./product";

export class DiscountDetailsModel{
    products:ProductModel[] = [];
    product?:ProductModel;
}