import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Supplier } from '../models/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(productId: string): Observable<Product> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<Product>(url);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  deleteProduct(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  updateProductWithSupplierId(productId: string, supplierId: string): Observable<void> {
    const url = `${this.apiUrl}/${productId}/supplier`;
    return this.http.put<void>(url, { supplierId });
  }

  getSuppliersByProductId(productId: string): Observable<Supplier[]> {
    const url = `${this.apiUrl}/${productId}/suppliers`;
    return this.http.get<Supplier[]>(url);
  }
}
