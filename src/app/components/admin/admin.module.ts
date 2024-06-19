import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { BrandComponent } from './brand/brand.component';
import { ShareModule } from '../ShareModule/PaginationShare.module';
import { ProfileComponent } from './profile/profile.component';
import { FormAddingBrandComponent } from './brand/form-adding-brand/form-adding-brand.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormUpdatingBrandComponent } from './brand/form-updating-brand/form-updating-brand.component';
import { AccountComponent } from './account/account.component';
import { SupplierComponent } from './supplier/supplier.component';
import { FormAddingSupplierComponent } from './supplier/form-adding-supplier/form-adding-supplier.component';
import { FormUpdatingSupplierComponent } from './supplier/form-updating-supplier/form-updating-supplier.component';
import { ConfigComponent } from './config/config.component';
import { FormUpdatingConfigComponent } from './config/form-updating-config/form-updating-config.component';
import { FormAddingConfigComponent } from './config/form-adding-config/form-adding-config.component';
import { ProductComponent } from './product/product.component';
import { FormAddingProductComponent } from './product/form-adding-product/form-adding-product.component';
import { FormUpdatingProductComponent } from './product/form-updating-product/form-updating-product.component';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { DiscountComponent } from './discount/discount.component';
import { FormAddingDiscountComponent } from './discount/form-adding-discount/form-adding-discount.component';
import { FormUpdatingDiscountComponent } from './discount/form-updating-discount/form-updating-discount.component';
import { FormUpdatingProductDiscountComponent } from './discount/form-updating-product-discount/form-updating-product-discount.component';
import { FormAddingPriceProductComponent } from './product/form-adding-price-product/form-adding-price-product.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { FormAddingPurchaseOrderComponent } from './purchase-order/form-adding-purchase-order/form-adding-purchase-order.component';
import { ReceiptComponent } from './purchase-order/receipt/receipt.component';
import { InforReceiptComponent } from './purchase-order/infor-receipt/infor-receipt.component';
import { AccountOfStaffComponent } from './account-of-staff/account-of-staff.component';
import { FormAddingStaffComponent } from './account-of-staff/form-adding-staff/form-adding-staff.component';
import { FormUpdatingStaffComponent } from './account-of-staff/form-updating-staff/form-updating-staff.component';
import { ReceiptStastiticsComponent } from './receipt-stastitics/receipt-stastitics.component';
import { BillStatisticsComponent } from './bill-statistics/bill-statistics.component';
import { ConfigService } from 'src/app/services/config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UtilsService } from 'src/app/services/utils.service';
import { AuthService } from 'src/app/services/auth.service';
import { AccountService } from 'src/app/services/account.service';


@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    BrandComponent,
    ProfileComponent,
    FormAddingBrandComponent,
    FormUpdatingBrandComponent,
    AccountComponent,
    SupplierComponent,
    FormAddingSupplierComponent,
    FormUpdatingSupplierComponent,
    ConfigComponent,
    FormUpdatingConfigComponent,
    FormAddingConfigComponent,
    ProductComponent,
    FormAddingProductComponent,
    FormUpdatingProductComponent,
    DiscountComponent,
    FormAddingDiscountComponent,
    FormUpdatingDiscountComponent,
    FormUpdatingProductDiscountComponent,
    FormAddingPriceProductComponent,
    PurchaseOrderComponent,
    FormAddingPurchaseOrderComponent,
    ReceiptComponent,
    InforReceiptComponent,
    AccountOfStaffComponent,
    FormAddingStaffComponent,
    FormUpdatingStaffComponent,
    ReceiptStastiticsComponent,
    BillStatisticsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AdminRoutingModule,
    FontAwesomeModule,
    ShareModule,
    ReactiveFormsModule,
  ],
  providers:[DatePipe,HttpClient],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class AdminModule { }
