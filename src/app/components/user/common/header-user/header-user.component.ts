import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faHome,faCartShopping,faCircleUser,faCodeCompare,faTruck,faBell,faRemove} from '@fortawesome/free-solid-svg-icons';
import { NotificationModel } from 'src/app/models/notification';
import { ProductModel } from 'src/app/models/product';
import { Role } from 'src/app/models/role.enum';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {

  @ViewChild('suggestedSearchLeft', { static: true }) // true work with OnInit, false work with ngAfterViewInit
  suggestedSearchLeft!: ElementRef;

  @ViewChild('headerNavMenu') 
  headerNavMenu!: ElementRef;

  fashome = faHome;
  fascart = faCartShopping;
  fascompare = faCodeCompare;
  faslogin = faCircleUser;
  isLogged = false;
  fastruck = faTruck;
  faBell = faBell;
  faremvoe = faRemove;

  quantityNotification:number = 0;

  productList?: ProductModel[];

  notificationList?: NotificationModel[];

  product?:ProductModel;

  ImageUrl: string = 'http://localhost:8080/image/';

  heightSuggestedSearch?: number;

  isDropdownOpen = false;

  constructor(private authService:AuthService,private router:Router,
    private productService:ProductService,private notificationService:NotificationService) { }

  ngOnInit() {
    this.checkLogged();
  }

  checkLogged(){
    if (this.authService.getUser() && this.authService.getRole() === Role.USER){
      this.isLogged = true;
      this.loadNotification();
    }

  }

  loadNotification(){
    this.notificationService.getListNotificationOfUser().subscribe(result =>{
      this.notificationList = result.content;
      this.quantityNotification = this.notificationList.reduce((count,item) => item.looked == false ? ++count : count,0)
    })
  }

  lookedNotification(notificationId: number,notification:NotificationModel) {
    notification.looked = true;
    this.notificationService.updateNotification(notification,notificationId).subscribe(result =>{
      this.loadNotification();
    })
  }

  removeNotification(notificationId: number,notification:NotificationModel) {
    notification.status = false;
    this.notificationService.updateNotification(notification,notificationId).subscribe(result =>{
      this.loadNotification();
    })
    
  }

  redirectToPage(path:string){
    this.router.navigate([path]);
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openNotification(event:any) {
    const eleLi = this.headerNavMenu?.nativeElement.querySelector('li:nth-child(5)');
    if(eleLi){
      const eleNotification = eleLi.querySelector('a .dropdowns-notification');
      if(eleNotification && !this.isDropdownOpen){
        eleNotification.style.display = 'block';
        this.isDropdownOpen = !this.isDropdownOpen;
      } else {
        eleNotification.style.display = 'none';
        this.isDropdownOpen = !this.isDropdownOpen;
      }
    }
  }

  handleDropdownClick(event: Event) {
    event.stopPropagation();
  }

  searchProductLeft(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.productService
        .getProductsByNameContaining(element.value)
        .subscribe((data) => {
          this.productList = data;
          let number = this.productList && this.productList.length;
          if (number >= 4) {
            this.heightSuggestedSearch = this.calculateHeight(4);
          } else {
            this.heightSuggestedSearch = this.calculateHeight(number);
          }
          this.suggestedSearchLeft.nativeElement.style.display = 'block';
          this.suggestedSearchLeft.nativeElement.style.height = this.heightSuggestedSearch + 'px';
        });
    }
  }

  calculateHeight(multiplier: number): number {
    const baseHeight = 78.2;
    return baseHeight * multiplier;
  }

  totalPrice(price:number,rate:number) {
    if (rate == 0){
      return price;
    } else {
      return price - (price / rate);
    }
  }

  selectProductLeft(name?:string){
    this.productService.getProductByName(name).subscribe((data) =>{
      this.product = data;
      this.router.navigate([`products/${this.product.id}`]);
    });
  }

  hideSearchLeft() {
    this.productList = undefined;
    this.suggestedSearchLeft.nativeElement.style.display = 'none';
  }


}
