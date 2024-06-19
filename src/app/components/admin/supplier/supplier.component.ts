import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faAdd,
  faSearch,
  faRemove,
  faInfo,
  faAdjust,
} from '@fortawesome/free-solid-svg-icons';
import { interval } from 'rxjs';
import { EPagination } from 'src/app/helpers/pagination.enum';
import { Pagination } from 'src/app/models/pagination';
import { SupplierModel } from 'src/app/models/supplier';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
})
export class SupplierComponent implements OnInit {
  supplierList!: SupplierModel[];
  message?: string;
  isLoading: boolean = true;

  iCon = faAdd;
  iconSearch = faSearch;
  iconUpdate = faAdjust;
  iconDelete = faRemove;
  iconInfo = faInfo;

  totalPages!:number
  currentPage!:number;
  itemsPerPage!:number;
  totalItems!:number;
  page?:number;
  limit?:number;


  constructor(
    private supplierService: SupplierService,
    private router: Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) =>{
      this.page = params['page'] || EPagination.page;
      this.limit = params['limit'] || EPagination.litmit;
      this.getSupplierList();
    })
  }

  findSupplier(query: KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      this.supplierService.searchByName(element.value).subscribe(result =>{
        this.supplierList = result.content;
        this.currentPage = result.pageNumber + 1;
        this.itemsPerPage = result.pageSize;
        this.totalItems = result.totalElements;
        this.totalPages = result.totalPages;
      })
    }
    return;
  }

  getSupplierList() {
    this.supplierService.getSupplier(this.page!,this.limit!).subscribe((result) =>{
      this.supplierList = result.content;
      this.currentPage = result.pageNumber + 1;
      this.itemsPerPage = result.pageSize;
      this.totalItems = result.totalElements;
      this.totalPages = result.totalPages;
    })
  }

  onPageChange(pageNumber: number):void {
    if (pageNumber > 0 &&  pageNumber <= this.totalItems){
      this.currentPage = pageNumber!;
      this.limit = this.itemsPerPage;
      this.router.navigate(['/admin/supplier'], { queryParams: { page: this.currentPage,limit:this.limit},queryParamsHandling: 'merge' });
    }
  }

  redirectPage(url: string) {
    this.router.navigate([url]);
  }

  checked(value: boolean, object: Object, action: string) {
    if (value) {
      this.submitConfirm(object);
    }
  }

  submitConfirm(object:SupplierModel){
    this.supplierService.deleteSupplier(object).subscribe( (result) =>{
      this.message = result.message!;
      this.supplierList = this.supplierList.filter((item) => {
        return item.id !== object.id ? item : null;
      })
    },
    (error) =>{
      this.message = error.error.message;
    })
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }
}
