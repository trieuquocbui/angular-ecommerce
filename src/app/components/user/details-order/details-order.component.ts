import { Component, Input, OnInit } from '@angular/core';
import BillModel from 'src/app/models/bill';


@Component({
  selector: 'app-details-order',
  templateUrl: './details-order.component.html',
  styleUrls: ['./details-order.component.css']
})
export class DetailsOrderComponent implements OnInit {
  @Input() order!:BillModel;
  totalMoney: number = 0;

  ImageUrl: string = 'http://localhost:8080/image/';

  constructor() { }

  ngOnInit() {
    this.order.billDetails?.forEach(element => {
      if (element.product?.rate == 0){
        this.totalMoney += element.product?.price! * element.quantity!;
      } else {
        this.totalMoney += (element.product?.price! - (element.product?.price! / element.product?.rate!))  * element.quantity!;
      }
    });
  }

  caculatePrice(price:number,promotion:number):number{
    if (promotion == 0){
      return price;
    }
    return price - (price / promotion);
  }

  totalPay(price:number,promotion:number,quantity:number){
    if (promotion == 0){
      return price * quantity;
    } else {
      return  (price - (price / promotion)) * quantity;
    }
    
  }

}
