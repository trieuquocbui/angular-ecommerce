import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faAdd, faAdjust, faDeleteLeft, faInfo, faSearch } from '@fortawesome/free-solid-svg-icons';
import { interval } from 'rxjs';
import { EPagination } from 'src/app/helpers/pagination.enum';
import { ConfigModel } from 'src/app/models/config';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent implements OnInit {
  configList!: ConfigModel[];
  message?: string;
  isLoading: boolean = true;

  page: number = 1;
  limit: number = EPagination.litmit;

  iCon = faAdd;
  iconSearch = faSearch;
  iconUpdate = faAdjust;
  iconDelete = faDeleteLeft;
  iconInfo = faInfo;

  totalPages!:number
  currentPage!:number;
  itemsPerPage!:number;
  totalItems!:number;


  constructor(private router: Router,private configService:ConfigService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) =>{
      this.page = params['page'] || EPagination.page;
      this.limit = params['limit'] || EPagination.litmit;
      this.loadingData();
    })
    
    
  }

  loadingData(){
    this.getConfigList();
    let subscription = interval(1000).subscribe(() => {
      if (this.isLoading){
        this.getConfigList();
      }
      
    });
    
  }

  findConfig(query: KeyboardEvent):void {
    if(query){
      const element = query.target as HTMLInputElement;
      this.configService.searchConfigByName(element.value).subscribe(result =>{
        this.configList = result.content;
        this.currentPage = result.pageNumber + 1;
        this.itemsPerPage = result.pageSize;
        this.totalItems = result.totalElements;
        this.totalPages = result.totalPages;
      })
    }
    return;
  }

  getConfigList() {
    if (this.isLoading) {
      this.configService.getConfigList(this.page, this.limit).subscribe((result) => {
        if (this.configList == undefined) {
          this.configList = result.content;
        } else {
          this.configList.push(...result.content);
          
        }
        if (result.lastPage) {
          this.isLoading = false;
        }
      });
    }
    this.page++;
  }

  

  redirectPage(url: string) {
    this.router.navigate([url]);
  }

  checked(value: boolean, object: Object, action: string) {
    if (value) {
      this.submitConfirm(object);
    }
  }

  submitConfirm(object:ConfigModel){
    this.configService.deleteConfig(object).subscribe( (result) =>{
      this.message = result.message!;
      this.configList = this.configList.filter((item) => {
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

  trackByFn(index: number, item: ConfigModel):number {
    return item.id!;
  }

}
