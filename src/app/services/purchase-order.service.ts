import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageModel } from '../models/message';
import baseUrl from '../helpers/URL';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { ParamsHome } from '../models/paramsHome';
import { Pagination } from '../models/pagination';
import { PurchaseOrderComponent } from '../components/admin/purchase-order/purchase-order.component';
import { PurchaseOrderModel } from '../models/purchar-order';
import { OrderModule } from '../components/admin/order/order.module';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

constructor(private http: HttpClient) { }

deletePurchaseOrder(id: number | undefined) {
  return this.http.delete<MessageModel>(`${baseUrl}/admin/order/${id}`);
}
getPurchaseOrderList(page: number, limit: number) {
  const params:ParamsHome = {
    page:page,
    limit:limit
  }
  const queryParams = new HttpParams({ fromObject: params as any});
  return this.http.get<Pagination<OrderModule>>(`${baseUrl}/admin/order`,{params:queryParams});
}

createPurchaseOrder(object:PurchaseOrderModel) {
  return this.http.post<MessageModel>(`${baseUrl}/admin/order`,object);
}

findById(purchaseOrderId: Number) {
 return this.http.get<PurchaseOrderModel>(`${baseUrl}/admin/order/${purchaseOrderId}`);
}

}
