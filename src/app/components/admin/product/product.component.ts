import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faAdd,
  faAdjust,
  faRemove,
  faInfo,
  faSearch,
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons';
import { interval } from 'rxjs';
import { EPagination } from 'src/app/helpers/pagination.enum';
import { ProductModel } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productList?: ProductModel[];
  message?: string;

  isLoading: boolean = true;

  ImageUrl: string = 'http://localhost:8080/image/';

  iconAdd = faPlusCircle;
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

  constructor(private router: Router,private route:ActivatedRoute, private productService: ProductService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) =>{
      this.page = params['page'] || EPagination.page;
      this.limit = params['limit'] || EPagination.litmit;
      this.getProductList();
    })
  }


  getProductList() {
    this.productService.getProductList(this.page!,this.limit!).subscribe((result) =>{
      this.productList = result.content;
      this.currentPage = result.pageNumber + 1;
      this.itemsPerPage = result.pageSize;
      this.totalItems = result.totalElements;
      this.totalPages = result.totalPages;
    })
  }

  findProduct(query: KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      this.productService.searchByName(element.value).subscribe(result =>{
        this.productList = result.content;
        this.currentPage = result.pageNumber + 1;
        this.itemsPerPage = result.pageSize;
        this.totalItems = result.totalElements;
        this.totalPages = result.totalPages;
      })
    }
    return;
  }

  onPageChange(pageNumber: number):void {
    if (pageNumber > 0 &&  pageNumber <= this.totalItems){
      this.currentPage = pageNumber!;
      this.limit = this.itemsPerPage;
      this.router.navigate(['/admin/product'], { queryParams: { page: this.currentPage,limit:this.limit},queryParamsHandling: 'merge' });
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

  submitConfirm(object: ProductModel) {
    this.productService.deleteProduct(object.id).subscribe(
      (result) => {
        this.message = result.message;
        this.productList = this.productList?.filter((item) => {
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
