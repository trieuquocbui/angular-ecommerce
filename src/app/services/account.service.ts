import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountModel } from '../models/account';
import { ParamsHome } from '../models/paramsHome';
import { Pagination } from '../models/pagination';
import baseUrl from '../helpers/URL';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  constructor(private http: HttpClient) {}

  getCustomerAccountList(page: number, limit: number) {
    const params: ParamsHome = {
      page: page,
      limit: limit,
    };
    const queryParams = new HttpParams({ fromObject: params as any });
    return this.http.get<Pagination<AccountModel>>(`${baseUrl}/admin/account/users`, {
      params: queryParams,
    });
  }

  getAccountById(accountId: number) {
    return this.http.get<AccountModel>(`${baseUrl}/admin/account/${accountId}`);
  }

  getStaffAccountList(page: number, limit: number) {
    const params: ParamsHome = {
      page: page,
      limit: limit,
    };
    const queryParams = new HttpParams({ fromObject: params as any });
    return this.http.get<Pagination<AccountModel>>(`${baseUrl}/admin/account/staffs`, {
      params: queryParams,
    });
  }

  updateAccount(account: AccountModel) {
    console.log(account);
    return this.http.put<AccountModel>(`${baseUrl}/admin/account/${account.id}`,account);
  }

  searchAccountCustomerByUsername(element:String) {
    const params: ParamsHome = {
      search: element,
    };
    const queryParams = new HttpParams({ fromObject: params as any });
    return this.http.get<Pagination<AccountModel>>(`${baseUrl}/admin/account/users/find`, {
      params: queryParams,
    });
  }

  searchAccountStaffByUsername(element:String) {
    const params: ParamsHome = {
      search: element,
    };
    const queryParams = new HttpParams({ fromObject: params as any });
    return this.http.get<Pagination<AccountModel>>(`${baseUrl}/admin/account/staff/find`, {
      params: queryParams,
    });
  }
}
