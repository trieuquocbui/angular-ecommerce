import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helpers/URL';
import { ParamsHome } from '../models/paramsHome';
import BillModel from '../models/bill';
import { Pagination } from '../models/pagination';
import { MessageModel } from '../models/message';

const reqHeader = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class OrderService {

constructor(private http: HttpClient) { }

  getOrderList(page:number,limit:number){
    const params:ParamsHome = {
      page:page,
      limit:limit
    }
    const queryParams = new HttpParams({ fromObject: params as any});
    return this.http.get<Pagination<BillModel>>(`${baseUrl}/bill/list`,{params:queryParams});
  }

  cancelOrder(idOrder:number){
    return this.http.delete(`${baseUrl}/bill/${idOrder}/cancel`);
  }

  finishOrder(order:BillModel){
    return this.http.put(`${baseUrl}/bill/${order.id}/finish`,order);
  }

  getListApprovingOrder(page:number,limit:number){
    const params:ParamsHome = {
      page:page,
      limit:limit
    }
    const queryParams = new HttpParams({ fromObject: params as any});
    return this.http.get<Pagination<BillModel>>(`${baseUrl}/admin/bill/approve`,{params:queryParams});
  }

  getListNotApprovingOrder(page:number,limit:number){
    const params:ParamsHome = {
      page:page,
      limit:limit
    }
    const queryParams = new HttpParams({ fromObject: params as any});
    return this.http.get<Pagination<BillModel>>(`${baseUrl}/admin/bill/not-approve-yet`,{params:queryParams});
  }

  getListDisApprovingOrder(page:number,limit:number){
    const params:ParamsHome = {
      page:page,
      limit:limit
    }
    const queryParams = new HttpParams({ fromObject: params as any});
    return this.http.get<Pagination<BillModel>>(`${baseUrl}/admin/bill/disapprove`,{params:queryParams});
  }

  getListCompletedOrder(page:number,limit:number){
    const params:ParamsHome = {
      page:page,
      limit:limit
    }
    const queryParams = new HttpParams({ fromObject: params as any});
    return this.http.get<Pagination<BillModel>>(`${baseUrl}/admin/bill/completed`,{params:queryParams});
  }

  getListInTransitOrder(page:number,limit:number){
    const params:ParamsHome = {
      page:page,
      limit:limit
    }
    const queryParams = new HttpParams({ fromObject: params as any});
    return this.http.get<Pagination<BillModel>>(`${baseUrl}/admin/bill/transit`,{params:queryParams});
  }

  getListDeliveredOrder(page:number,limit:number){
    const params:ParamsHome = {
      page:page,
      limit:limit
    }
    const queryParams = new HttpParams({ fromObject: params as any});
    return this.http.get<Pagination<BillModel>>(`${baseUrl}/admin/bill/delivered`,{params:queryParams});
  }

  updateOrder(object:BillModel){
    return this.http.put<MessageModel>(`${baseUrl}/admin/bill/${object.id}`,object);
  }
}
