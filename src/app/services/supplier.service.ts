import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../models/pagination';
import baseUrl from '../helpers/URL';
import { ParamsHome } from '../models/paramsHome';
import { MessageModel } from '../models/message';
import { SupplierModel } from '../models/supplier';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  
  constructor(private http: HttpClient) {}

  updateSupplier(supplierId: string | undefined, supplier: SupplierModel) {
    return this.http.put<MessageModel>(`${baseUrl}/admin/supplier/${supplierId}`,supplier);
  }

  searchByName(value: string) {
    const params: ParamsHome = {
      search: value,
    };
    const queryParams = new HttpParams({ fromObject: params as any });
    return this.http.get<Pagination<SupplierModel>>(`${baseUrl}/admin/supplier/find`, {
      params: queryParams,
    });
  }

  getSupplier(page: number, limit: number) {
    const params: ParamsHome = {
      page: page,
      limit: limit,
    };
    const queryParams = new HttpParams({ fromObject: params as any });
    return this.http.get<Pagination<SupplierModel>>(`${baseUrl}/admin/supplier`, {
      params: queryParams,
    });
  }

  deleteSupplier(supplier: SupplierModel) {
    return this.http.delete<MessageModel>(
      `${baseUrl}/admin/supplier/${supplier.id}`
    );
  }

  createSupplier(supplier: SupplierModel) {
    return this.http.post<MessageModel>(`${baseUrl}/admin/supplier`, supplier);
  }

  findById(supplierId: string) {
    return this.http.get<SupplierModel>(`${baseUrl}/admin/supplier/${supplierId}`);
  }

  getAllSupplier(){
    return this.http.get<SupplierModel[]>(`${baseUrl}/admin/supplier/all`);
  }
}
