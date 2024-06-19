export class ReceiptDetailsModel{
    constructor(quantity?: number, price?: number) {
        this.quantity = quantity;
        this.price = price;
      }
    quantity?:number;
    price?:number;
}