import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helpers/URL';
import { ProductModel } from '../models/product';
import { ParamsHome } from '../models/paramsHome';
import { Pagination } from '../models/pagination';
import { MessageModel } from '../models/message';
import { PriceModel } from '../models/price';

const reqHeader = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  searchByName(value: string) {
    const params: ParamsHome = {
      search: value,
    };
    const queryParams = new HttpParams({ fromObject: params as any });
    return this.http.get<Pagination<ProductModel>>(`${baseUrl}/admin/product/find`, {
      params: queryParams,
    });
  }
  
  constructor(private http: HttpClient) {}

  public getProducts(page?: number, limit?: number) {
    const params: ParamsHome = {
      page: page,
      limit: limit,
    };
    const queryParams = new HttpParams({ fromObject: params as any });
    return this.http.get<Pagination<ProductModel>>(
      `${baseUrl}/home?page=${page}&limit=${limit}`
    );
  }

  public getProductById(idProduct: number) {
    return this.http.get<ProductModel>(`${baseUrl}/product/${idProduct}`);
  }

  public getProductsByNameContaining(name: string) {
    const params = new HttpParams().set('name', name);
    return this.http.get<ProductModel[]>(`${baseUrl}/product/search`, {
      params,
    });
  }

  public getProductByName(name?: string) {
    return this.http.get<ProductModel>(`${baseUrl}/product/search/${name}`);
  }

  getProductList(page: number, limit: number) {
    const params: ParamsHome = {
      page: page,
      limit: limit,
    };
    const queryParams = new HttpParams({ fromObject: params as any });
    return this.http.get<Pagination<ProductModel>>(`${baseUrl}/admin/product`, {
      params: queryParams,
    });
  }

  getAllProduct() {
    return this.http.get<ProductModel[]>(`${baseUrl}/admin/product/all`);
  }

  createProduct(formData: FormData) {
    return this.http.post<MessageModel>(`${baseUrl}/admin/product`, formData);
  }

  findById(productId: number) {
    return this.http.get<ProductModel>(`${baseUrl}/admin/product/${productId}`);
  }

  updateProduct(productModal: ProductModel, productId: number) {
    return this.http.put<MessageModel>(
      `${baseUrl}/admin/product/${productId}`,
      productModal
    );
  }

  uploadFile(productId: number, formData: FormData) {
    return this.http.put<MessageModel>(
      `${baseUrl}/admin/product/${productId}/upload`,
      formData
    );
  }

  deleteProduct(id: number | undefined) {
    return this.http.delete<MessageModel>(`${baseUrl}/admin/product/${id}`);
  }

  createPrice(object: PriceModel, productId: number) {
    return this.http.post<MessageModel>(
      `${baseUrl}/admin/product/${productId}/price`,
      object
    );
  }

  getPricesByProductId(productId: number) {
    return this.http.get<PriceModel[]>(
      `${baseUrl}/admin/product/${productId}/prices`
    );
  }

  deletePrice(object: PriceModel, productId: number) {
    return this.http.delete<MessageModel>(
      `${baseUrl}/admin/product/${productId}/price/${object.appliedDate}`
    );
  }

  getProductsOfHome(
    page: number,
    limit: number,
    brandId?: number,
    ram?: String,
    cpu?: String,
    hardDrive?: String,
    minPrice?:number,
    maxPrice?:number,
  ) {
    let params: ParamsHome = {
      page: page,
      limit: limit,
    };
    if (typeof brandId !== 'undefined'){
      params.brand = brandId;
    } 
     if (typeof ram !== 'undefined'){
      params.ram = ram;
    } 
     if (typeof cpu !== 'undefined'){
      params.cpu = cpu;
    } 
     if (typeof hardDrive !== 'undefined'){
      params.hardDrive = hardDrive;
    }

    if (typeof minPrice !== 'undefined' && typeof maxPrice !== 'undefined'){
      params.minPrice = minPrice;
      params.maxPrice = maxPrice;
    }
    
    const queryParams = new HttpParams({ fromObject: params as any });
    return this.http.get<Pagination<ProductModel>>(`${baseUrl}/home`, {
      params: queryParams,
    });
  }

  predict(label:String,description:String,page: number,
    limit: number,) {
    let params: ParamsHome = {
      label:label,
      page: page,
      limit: limit,
      description: description
    }
    const queryParams = new HttpParams({ fromObject: params as any });
    return this.http.get<Pagination<ProductModel>>(`${baseUrl}/predict`,{
      params: queryParams,
    })
  }
}
