import { Product } from "./product.model";
import { Supplier } from "./supplier.model";

export interface Order {
  _id?: string;
  name: string;
  email: string;
  cpf: string;
  product: Product; // ID do produto
  supplier: Supplier; // ID do fornecedor
}
