import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../models/pagination';
import baseUrl from '../helpers/URL';
import { ParamsHome } from '../models/paramsHome';
import { DiscountModel } from '../models/discount';
import { MessageModel } from '../models/message';
import { DiscountDetailsModel } from '../models/discountdetails';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {

  searchDiscountById(value: string) {
    const params: ParamsHome = {
      search: value,
    };
    const queryParams = new HttpParams({ fromObject: params as any });
    return this.http.get<Pagination<DiscountModel>>(`${baseUrl}/admin/discount/find`, {
      params: queryParams,
    });
  }
  constructor(private http: HttpClient) {}

  getDiscountList(page: number, limit: number) {
    const params: ParamsHome = {
      page: page,
      limit: limit,
    };
    const queryParams = new HttpParams({ fromObject: params as any });
    return this.http.get<Pagination<DiscountModel>>(`${baseUrl}/admin/discount`, {
      params: queryParams,
    });
  }

  deleteDiscount(discount: DiscountModel) {
    return this.http.delete<MessageModel>(
      `${baseUrl}/admin/discount/${discount.id}`
    );
  }

  createDiscount(discount: DiscountModel) {
    return this.http.post<MessageModel>(`${baseUrl}/admin/discount`, discount);
  }

  getDiscountById(discountId: String) {
    return this.http.get<DiscountModel>(
      `${baseUrl}/admin/discount/${discountId}`
    );
  }

  updateDiscount(discountModel: DiscountModel) {
    return this.http.put<MessageModel>(
      `${baseUrl}/admin/discount/${discountModel.id}`,
      discountModel
    );
  }

  updateDiscountDetails(discountId: String, productList: DiscountDetailsModel) {

    return this.http.put<MessageModel>(`${baseUrl}/admin/discount/${discountId}/products`,productList);
  }
}
