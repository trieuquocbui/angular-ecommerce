import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { AdminComponent } from './admin.component';
import { BrandComponent } from './brand/brand.component';
import { ProfileComponent } from './profile/profile.component';
import { FormAddingBrandComponent } from './brand/form-adding-brand/form-adding-brand.component';
import { FormUpdatingBrandComponent } from './brand/form-updating-brand/form-updating-brand.component';
import { AccountComponent } from './account/account.component';
import { SupplierComponent } from './supplier/supplier.component';
import { FormAddingSupplierComponent } from './supplier/form-adding-supplier/form-adding-supplier.component';
import { FormUpdatingSupplierComponent } from './supplier/form-updating-supplier/form-updating-supplier.component';
import { ConfigComponent } from './config/config.component';
import { FormAddingConfigComponent } from './config/form-adding-config/form-adding-config.component';
import { FormUpdatingConfigComponent } from './config/form-updating-config/form-updating-config.component';
import { ProductComponent } from './product/product.component';
import { FormUpdatingProductComponent } from './product/form-updating-product/form-updating-product.component';
import { FormAddingProductComponent } from './product/form-adding-product/form-adding-product.component';
import { OrderComponent } from './order/order.component';
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
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [

  {path:'',component:AdminComponent,children:[
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path:'home',component:HomeComponent},
    {path:'brand',component:BrandComponent},
    {path:'brand/adding',component:FormAddingBrandComponent},
    {path:'brand/updating/:brandId',component:FormUpdatingBrandComponent},
    {path:'profile',component:ProfileComponent},
    {path:'account',component:AccountComponent},
    {path:'account-staff',component:AccountOfStaffComponent},
    {path:'account-staff/adding',component:FormAddingStaffComponent},
    {path:'account-staff/updating/:accountId',component:FormUpdatingStaffComponent},
    {path:'supplier',component:SupplierComponent},
    {path:'supplier/adding',component:FormAddingSupplierComponent},
    {path:'supplier/updating/:supplierId',component:FormUpdatingSupplierComponent},
    {path:'config',component:ConfigComponent},
    {path:'config/adding',component:FormAddingConfigComponent},
    {path:'config/updating/:configId',component:FormUpdatingConfigComponent},
    {path:'discount',component:DiscountComponent},
    {path:'discount/adding',component:FormAddingDiscountComponent},
    {path:'discount/updating/:discountId',component:FormUpdatingDiscountComponent},
    {path:'discount/:discountId/products',component:FormUpdatingProductDiscountComponent},
    {path:'product',component:ProductComponent},
    {path:'product/adding',component:FormAddingProductComponent},
    {path:'product/updating/:productId',component:FormUpdatingProductComponent},
    {path:'product/:productId/price',component:FormAddingPriceProductComponent},
    {path:'order',component:PurchaseOrderComponent},
    {path:'order/adding',component:FormAddingPurchaseOrderComponent},
    {path:'order/:orderId/receipt',component:ReceiptComponent},
    {path:'receipt/statistics',component:ReceiptStastiticsComponent},
    {path:'bill-finish/statistics',component:BillStatisticsComponent},
    {path:'receipt/:receiptId',component:InforReceiptComponent},
    {path:'bill',loadChildren: () => import('./order/order.module').then(m => m.OrderModule)},
  ],canActivate:[AdminGuard]} // canActivate check authentication
];

@NgModule({
  imports: [RouterModule.forChild(routes),HttpClientModule],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
