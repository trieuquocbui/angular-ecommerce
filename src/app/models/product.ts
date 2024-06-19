import { BrandModel } from './brand';
import { ConfigModel } from './config';

export interface ProductModel {
  label?:String;
  id?: number;
  img?: string;
  name?: string;
  price?: number;
  description?: string;
  status?: boolean;
  config?: ConfigModel;
  brand?: BrandModel;
  rate?: number;
}
