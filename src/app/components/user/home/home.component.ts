import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductModel } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { faLaptop,faMicrochip,faMemory,faHardDrive,faWeight,faRug} from '@fortawesome/free-solid-svg-icons'
import { EPagination } from 'src/app/helpers/pagination.enum';
import { BrandModel } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { Pagination } from 'src/app/models/pagination';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displaySize = faLaptop;
  cpu = faMicrochip;
  ram = faMemory;
  hardDrive = faHardDrive;
  graphicCard = faRug;
  weight = faWeight

  currentPage!:number;
  itemsPerPage!:number;
  totalItems!:number;
  page?:number;
  limit?:number;

  brandId!:number;
  ramSe!:String;
  cpuSe!:String;
  minPrice!:number;
  maxPrice!:number;
  hardDriveSe!:String;

  currentUrl!: string;

  ImageUrl: string = 'http://localhost:8080/image/';

  productList?:ProductModel[];
  brandList?:BrandModel[];

  description!:String;

  label!:String;

  listRam = [
    {name:'4GB',checked:false},
    {name:'8GB',checked:false},
    {name:'16GB',checked:false},
    {name:'32GB',checked:false},
  ];

  listCpu = [
    {name:'Core i9',checked:false},
    {name:'Core i7',checked:false},
    {name:'Core i5',checked:false},
    {name:'Core i3',checked:false},
    {name:'AMD Ryzen 9',checked:false},
    {name:'AMD Ryzen 7',checked:false},
    {name:'AMD Ryzen 5',checked:false},
  ];

  listJob = [
    {name:'Công nghệ thông tin'},
    {name:'Văn phòng'},
    {name:'Thiết kế đồ hoạ'},
    {name:'Học tập và nghiên cứu'},
    {name:'Khác...'}
  ];

  listBrand = [
    {name:'MACBOOK'},
    {name:'ASUS'},
    {name:'LENOVO'},
    {name:'ACER'},
    {name:'MSI'},
    {name:'HP'},
    {name:'Khác...'}
  ];

  listPrice = [
    {name:"0 - 20 triệu", min:0, max:20000000,checked:false},
    {name:"20 - 30 triệu" , min:20000000, max:30000000,checked:false},
    {name:"30 - 100 triệu" , min:30000000, max:1000000000,checked:false}
  ]

  constructor(private formBuilder:FormBuilder,private productService:ProductService,private brandService: BrandService, private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.currentUrl = this.route.snapshot.url.join('/'); // Lấy URL hiện tại
    if (this.currentUrl.includes('predict')){

      this.route.queryParams.subscribe((params) =>{
        this.page = params['page'] || EPagination.page;
        this.limit = params['limit'] || EPagination.litmit;
        this.description = params['description'];
        this.label = params['label'];
        this.loadPredict(this.label,this.description,this.page!,this.limit!);
      })
     
    } else {
      this.route.queryParams.subscribe((params) =>{
        this.page = params['page'] || EPagination.page;
        this.limit = params['limit'] || EPagination.litmit;
        this.brandId = params['brand'] || '';
        this.loadPage();
      })
    }
    
  }

  predict = this.formBuilder.group({
    price: [0],
    job:[null],
    brand:[null],
    description:[null,Validators.required]
  })

  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onPageChange(pageNumber: number) {
    console.log(1)
    if (pageNumber > 0 &&  pageNumber <= this.totalItems){
      this.currentPage = pageNumber!;
      this.currentUrl = this.route.snapshot.url.join('/'); // Lấy URL hiện tại
      if (this.currentUrl.includes('predict')){
        this.description = this.route.snapshot.queryParams['description'];
        this.label = this.route.snapshot.queryParams['label'];
        this.router.navigate(['/predict'], { queryParams: {label:this.label,description: this.description, page: this.currentPage},queryParamsHandling: 'merge' });
      } else {
        this.router.navigate(['/home'], { queryParams: { page: this.currentPage},queryParamsHandling: 'merge' });
      }
    }
  }

  choseeBrand(idBrand:number) {
    this.brandId = idBrand;
    this.page = EPagination.page;
    this.limit = EPagination.litmit;
    this.productService.getProductsOfHome(this.page,this.limit,this.brandId,this.ramSe,this.cpuSe,this.hardDriveSe).subscribe(result =>{
      this.productList = result.content;
      this.currentPage = result.pageNumber + 1;
      this.itemsPerPage = result.pageSize;
      this.totalItems = result.totalElements;
      this.router.navigate(['/home'], {relativeTo: this.route, queryParams: { brand:this.brandId,page: this.currentPage}});
    })
  }

  itemChangedRam(item:any){
    this.ramSe = item.name;
    this.page = EPagination.page;
    this.limit = EPagination.litmit;
    this.productService.getProductsOfHome(this.page,this.limit,this.brandId,this.ramSe,this.cpuSe,this.hardDriveSe).subscribe(result =>{
      this.productList = result.content;
      this.currentPage = result.pageNumber + 1;
      this.itemsPerPage = result.pageSize;
      this.totalItems = result.totalElements;
      this.router.navigate(['/home'], {relativeTo: this.route, queryParams: { brand:this.brandId,ram:this.ramSe,page: this.currentPage}});
    })
  }

  itemChangedCpu(item:any){
    this.cpuSe = item.name;
    this.page = EPagination.page;
    this.limit = EPagination.litmit;
    this.productService.getProductsOfHome(this.page,this.limit,this.brandId,this.ramSe,this.cpuSe,this.hardDriveSe).subscribe(result =>{
      this.productList = result.content;
      this.currentPage = result.pageNumber + 1;
      this.itemsPerPage = result.pageSize;
      this.totalItems = result.totalElements;
      console.log(this.predict.controls.description);
      this.router.navigate(['/home'], {relativeTo: this.route, queryParams: { brand:this.brandId,ram:this.ramSe,cpu:this.cpuSe,page: this.currentPage}});
    })
  }

  itemChangedPrice(item:any){
    this.minPrice = item.min;
    this.maxPrice = item.max;
    this.page = EPagination.page;
    this.limit = EPagination.litmit;
    this.productService.getProductsOfHome(this.page,this.limit,this.brandId,this.ramSe,this.cpuSe,this.hardDriveSe,this.minPrice,this.maxPrice).subscribe(result =>{
      this.productList = result.content;
      this.currentPage = result.pageNumber + 1;
      this.itemsPerPage = result.pageSize;
      this.totalItems = result.totalElements;
      console.log(this.predict.controls.description);
      this.router.navigate(['/home'], {relativeTo: this.route, queryParams: { brand:this.brandId,ram:this.ramSe,cpu:this.cpuSe,page: this.currentPage}});
    })
  }

  loadPage(){
    this.productService.getProductsOfHome(this.page!,this.limit!,this.brandId,this.ramSe,this.cpuSe,this.hardDriveSe).subscribe((result) =>{
      this.productList = result.content;
      this.currentPage = result.pageNumber + 1;
      this.itemsPerPage = result.pageSize;
      this.totalItems = result.totalElements;
    },
    (error) =>{
      
    })

    this.brandService.getAllBrandOfUser().subscribe((result) =>{
      this.brandList = result;
    })
  }

  redirectToPage(item:ProductModel){
    this.router.navigate([`/compare/${item.name}`])
  }

  checked(value:boolean,object:Object,action:string){
    this.page =  EPagination.page;
    this.limit =  EPagination.litmit;
    this.loadPredict("",this.predict.controls.description.value!,this.page,this.limit);
    //this.router.navigate(['/predict'], {relativeTo: this.route, queryParams: {label:this.label,description: this.predict.controls.description.value,page: this.currentPage},queryParamsHandling: 'merge'});
  }

  loadPredict(label:String,description:String,page:number,limit:number){
    this.productService.predict(label,description,page,limit).subscribe(result =>{
      this.label = result.label;
      this.productList = result.content;
      this.currentPage = result.pageNumber + 1;
      this.itemsPerPage = result.pageSize;
      this.totalItems = result.totalElements;
      this.page = EPagination.page;
      this.router.navigate(['/predict'], {relativeTo: this.route, queryParams: {label:this.label,description: this.predict.controls.description.value,page: this.currentPage},queryParamsHandling: 'merge'});
    })
  }

  caculatePrice(price:number,promotion:number):number{
    if (promotion == 0){
      return price;
    }
    return price - (price / promotion);
  }
}
