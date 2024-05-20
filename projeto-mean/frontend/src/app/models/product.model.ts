import { Supplier } from "./supplier.model";

export interface Product {
    _id?: string;
    name: string;
    type: string;
    supplier?: Supplier[];
  }
  