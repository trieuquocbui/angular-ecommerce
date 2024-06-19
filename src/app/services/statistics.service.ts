import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StastiticsModel } from '../models/statistics';
import { ReceiptModel } from '../models/receipt';
import baseUrl from '../helpers/URL';
import { Observable } from 'rxjs';
import BillModel from '../models/bill';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  

  constructor(private http: HttpClient) { }

  getReceiptStatistics(fromDate:String,toDate:String): Observable<ReceiptModel[]> {
    const params  = new HttpParams().set('fromDate', fromDate.toString())
    .set('toDate', toDate.toString());
    return this.http.get<ReceiptModel[]>(`${baseUrl}/admin/receipt/statistics`, {params});
  }

  getBillStatistics(fromDate: any, toDate: any) {
    const params  = new HttpParams().set('fromDate', fromDate.toString())
    .set('toDate', toDate.toString());
    return this.http.get<BillModel[]>(`${baseUrl}/admin/bill/statistics`, {params});
  }

}
