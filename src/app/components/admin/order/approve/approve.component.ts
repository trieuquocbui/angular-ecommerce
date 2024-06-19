import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faAdd, faAdjust, faDeleteLeft, faInfo, faSearch } from '@fortawesome/free-solid-svg-icons';
import { interval } from 'rxjs';
import { EPagination } from 'src/app/helpers/pagination.enum';
import BillModel from 'src/app/models/bill';
import OrderModel from 'src/app/models/bill';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {
  orderList?:OrderModel[];
  message?:string;

  iconSearch = faSearch;
  iconUpdate = faAdjust;
  iconDelete =faDeleteLeft;
  iconInfo = faInfo;

  totalPages!:number
  currentPage!:number;
  itemsPerPage!:number;
  totalItems!:number;
  page?:number;
  limit?:number;

  constructor(private route:ActivatedRoute, private orderService:OrderService,private router:Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) =>{
      this.page = params['page'] || EPagination.page;
      this.limit = params['limit'] || EPagination.litmit;
      this.loadingData();
    })
  }

  loadingData(){
    this.orderService.getListApprovingOrder(this.page!, this.limit!).subscribe((result) => {
      this.orderList = result.content;
      this.currentPage = result.pageNumber + 1;
      this.itemsPerPage = result.pageSize;
      this.totalItems = result.totalElements;
      this.totalPages = result.totalPages;
    });

  }

  checked(value: boolean, object: BillModel, action: string) {
    if (value && action == "cancle") {
      object.status = -1;
      this.orderService.updateOrder(object).subscribe(result =>{
        this.message = result.message;
      })
    } else if (value && action == "approve"){
      object.status = 2;
      this.orderService.updateOrder(object).subscribe(result =>{
        this.message = result.message;
        this.loadingData();
      });
    }
    
  }

  onPageChange(pageNumber: number) {
    if (pageNumber > 0 &&  pageNumber <= this.totalItems){
      this.currentPage = pageNumber!;
      this.limit = this.itemsPerPage;
      this.router.navigate(['/admin/approve'], { queryParams: { page: this.currentPage,limit:this.limit},queryParamsHandling: 'merge' });
    }
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
