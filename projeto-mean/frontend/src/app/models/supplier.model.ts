import { Product } from "./product.model";

export interface Supplier {
  _id?: string;
  name: string;
  email: string;
  cnpj: string;
  phone: string;
  product: Product; 
}
