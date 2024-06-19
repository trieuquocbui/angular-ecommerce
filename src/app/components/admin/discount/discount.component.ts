import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faAdd,faSearch,faRemove,faInfo,faAdjust,faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { EPagination } from 'src/app/helpers/pagination.enum';
import { DiscountModel } from 'src/app/models/discount';
import { DiscountService } from 'src/app/services/discount.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {
  discountList!:DiscountModel[];
  iconAdd = faPlusCircle;
  iCon = faAdd;
  iconSearch = faSearch;
  iconUpdate = faAdjust;
  iconDelete =faRemove;
  iconInfo = faInfo;

  message?:string;

  totalPages!:number
  currentPage!:number;
  itemsPerPage!:number;
  totalItems!:number;
  page?:number;
  limit?:number;

  constructor(private router:Router,private route:ActivatedRoute,private discountService:DiscountService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) =>{
      this.page = params['page'] || EPagination.page;
      this.limit = params['limit'] || EPagination.litmit;
      this.getDiscountList();
    })
  }

  onPageChange(pageNumber: number) {
    if (pageNumber > 0 &&  pageNumber <= this.totalItems){
      this.currentPage = pageNumber!;
      this.limit = this.itemsPerPage;
      this.router.navigate(['/admin/discount'], { queryParams: { page: this.currentPage,limit:this.limit},queryParamsHandling: 'merge' });
    }
  }

  findDiscount(query: KeyboardEvent):void {
    if(query){
      const element = query.target as HTMLInputElement;
      this.discountService.searchDiscountById(element.value).subscribe(result =>{
        this.discountList = result.content;
        this.currentPage = result.pageNumber + 1;
        this.itemsPerPage = result.pageSize;
        this.totalItems = result.totalElements;
        this.totalPages = result.totalPages;
      })
    }
    return;
  }

  redirectPage(url:string){
    this.router.navigate([url]);
  }

  checked(value:boolean,object:Object,action:string){
    if (value ){
      this.deleteDiscount(object);
    } 
  }

  deleteDiscount(object:DiscountModel){
    this.discountService.deleteDiscount(object).subscribe(result =>{
      this.message = result.message;
      this.discountList = this.discountList.filter(item => item.id != object.id);
    },error =>{
      this.message = error.error.message;
    })
  }

  getDiscountList(){
    this.discountService.getDiscountList(this.page!,this.limit!).subscribe((result) =>{
      this.discountList = result.content;
      this.currentPage = result.pageNumber + 1;
      this.itemsPerPage = result.pageSize;
      this.totalItems = result.totalElements;
      this.totalPages = result.totalPages;
    })
  }

}
