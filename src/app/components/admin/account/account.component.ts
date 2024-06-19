import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch,faRemove,faInfo,faAdjust} from '@fortawesome/free-solid-svg-icons';
import { AppConstants } from 'src/app/helpers/appconstant';
import { EPagination } from 'src/app/helpers/pagination.enum';
import { AccountModel } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  iconSearch = faSearch;
  iconDelete =faRemove;
  iconInfo = faInfo;
  iconupdate = faAdjust

  customerAccountList!:AccountModel[];

  ImageUrl:string = "http://localhost:8080/image/";

  message?:string;

  totalPages!:number
  currentPage!:number;
  itemsPerPage!:number;
  totalItems!:number;
  page?:number;
  limit?:number;

  constructor(private router:Router,private route:ActivatedRoute,private accountService:AccountService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) =>{
      this.page = params['page'] || EPagination.page;
      this.limit = params['limit'] || EPagination.litmit;
      this.getCustomerAccountList();
    })
  }

  onPageChange(pageNumber: number):void {
    if (pageNumber > 0 &&  pageNumber <= this.totalItems){
      this.currentPage = pageNumber!;
      this.limit = this.itemsPerPage;
      this.router.navigate(['/admin/account'], { queryParams: { page: this.currentPage,limit:this.limit},queryParamsHandling: 'merge' });
    }
  }

  getCustomerAccountList():void{
    this.accountService.getCustomerAccountList(this.page!,this.limit!).subscribe((result) =>{
      this.customerAccountList = result.content;
      this.currentPage = result.pageNumber + 1;
      this.itemsPerPage = result.pageSize;
      this.totalItems = result.totalElements;
      this.totalPages = result.totalPages;
    })
  }

  checked(value:boolean,object:AccountModel,action:String):void{
    if (value && action == 'inactive'){
      object.status = false;
    } else if(value && action == 'active'){
      object.status = true;
    } else {
      return;
    }
    this.submitConfirmAcctive(object);
  }

  submitConfirmAcctive(object: Object):void {
    this.accountService.updateAccount(object).subscribe((result) =>{
      this.message = AppConstants.UPDATE_SUCCESS;
      const indexOfObjectToUpdate = this.customerAccountList.findIndex(obj => obj.id === result.id);
      if(indexOfObjectToUpdate !== -1){
        this.customerAccountList[indexOfObjectToUpdate] = result;
      }
    },
    (error) =>{
      this.message = error.error.message;
    })
    setTimeout(() => {
      this.message = undefined;
    }, AppConstants.DEYPLAY_TIME);
    return;
  }

  redirectPage(url:string){
    this.router.navigate([url]);
  }

  findAccount(query: KeyboardEvent):void {
    if(query){
      const element = query.target as HTMLInputElement;
      this.accountService.searchAccountCustomerByUsername(element.value).subscribe(result =>{
        this.customerAccountList = result.content;
        this.currentPage = result.pageNumber + 1;
        this.itemsPerPage = result.pageSize;
        this.totalItems = result.totalElements;
        this.totalPages = result.totalPages;
      })
    }
    return;
  }

  trackByFn(index: number, item: AccountModel):number {
    return item.id!;
  }

}
