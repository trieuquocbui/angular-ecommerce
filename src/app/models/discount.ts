import { DiscountDetailsModel } from "./discountdetails";

export class DiscountModel{
    id?:String;
    reason?:String;
    startDay?:Date;
    endDay?:Date;
    discountPercent?:number;
    discountDetails?:DiscountDetailsModel[];
}