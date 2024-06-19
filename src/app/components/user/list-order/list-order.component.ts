import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EPagination } from 'src/app/helpers/pagination.enum';
import { Status_Order } from 'src/app/helpers/status_order.enum';
import BillModel from 'src/app/models/bill';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {
  orderList!:BillModel[];
  page!:number;
  limit!:number;
  totalPages!:number
  currentPage!:number;
  itemsPerPage!:number;
  totalItems!:number;

  constructor(private router:Router,private route:ActivatedRoute,private orderService:OrderService) { }

  ngOnInit() { 
    this.route.queryParams.subscribe((params) =>{
      this.page = params['page'] || EPagination.page;
      this.limit = params['limit'] || EPagination.litmit;
      this.getOrderList();
    })

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getOrderList();
      }
    });
  }

  getOrderList(){
    this.orderService.getOrderList(this.page,this.limit).subscribe((relust) =>{
      this.orderList = relust.content;
    })
  }

  submitConfirm(item:BillModel){
    item.status = Status_Order.Finish;
    this.orderService.finishOrder(item).subscribe((data) =>{
      console.log(data);
    })
  }

  submitCancle(item:BillModel){
    this.orderService.cancelOrder(item.id!).subscribe((data) =>{
      this.getOrderList();
    })
  }

  checked(value:boolean,object:Object,action:string){
    if ( value && action == 'cancel'){
        this.submitCancle(object);
    } else if (value && action == 'finish'){
        this.submitConfirm(object);
    }
  }

  onPageChange(pageNumber: number) {
    if (pageNumber > 0 &&  pageNumber <= this.totalItems){
      this.currentPage = pageNumber!;
      this.limit = this.itemsPerPage;
      this.router.navigate(['/order/list'], { queryParams: { page: this.currentPage,limit:this.limit},queryParamsHandling: 'merge' });
    }
  }
}
