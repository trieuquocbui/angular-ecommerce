import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faAdd,
  faAdjust,
  faDeleteLeft,
  faInfo,
  faSearch,
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons';
import { interval } from 'rxjs';
import { EPagination } from 'src/app/helpers/pagination.enum';
import { ProductModel } from 'src/app/models/product';
import { PurchaseOrderModel } from 'src/app/models/purchar-order';
import { ProductService } from 'src/app/services/product.service';
import { PurchaseOrderService } from 'src/app/services/purchase-order.service';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {

  purchaseOrderList?: PurchaseOrderModel[];
  message?: string;

  totalPages!:number
  currentPage!:number;
  itemsPerPage!:number;
  totalItems!:number;
  page?:number;
  limit?:number;


  iconAdd = faPlusCircle;
  iCon = faAdd;
  iconSearch = faSearch;
  iconUpdate = faAdjust;
  iconDelete = faDeleteLeft;
  iconInfo = faInfo;

  constructor(private router: Router, private purchase_orderService: PurchaseOrderService,private route:ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) =>{
      this.page = params['page'] || EPagination.page;
      this.limit = params['limit'] || EPagination.litmit;
      this.getPurchaseOrderList();
    })
  }


  getPurchaseOrderList() {
    this.purchase_orderService.getPurchaseOrderList(this.page!,this.limit!).subscribe( (result) =>{
      this.purchaseOrderList = result.content;
      this.currentPage = result.pageNumber + 1;
      this.itemsPerPage = result.pageSize;
      this.totalItems = result.totalElements;
      this.totalPages = result.totalPages;
    })
  }

  redirectPage(url: string) {
    this.router.navigate([url]);
  }

  checked(value: boolean, object: Object, action: string) {
    if (value) {
      this.submitConfirm(object);
    }
  }

  submitConfirm(object: ProductModel) {
    this.purchase_orderService.deletePurchaseOrder(object.id).subscribe(
      (result) => {
        this.message = result.message;
        this.purchaseOrderList = this.purchaseOrderList?.filter((item) => {
          return item.id !== object.id ? item : null;
        })
      },
      (error) => {
        this.message = error.error.message;
      }
    );
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

}
