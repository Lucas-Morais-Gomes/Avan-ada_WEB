import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {
    private apiUrl = 'http://localhost:3000/products';

    constructor(private http: HttpClient) { }

    getAllProducts(): Observable<any[]> {
        console.log('Fetching all products from API...');
        return this.http.get<any[]>(this.apiUrl);
    }

    updateProduct(productId: string, data: any): Observable<any> {
        console.log(`Updating product with ID: ${productId}`);
        return this.http.patch(`${this.apiUrl}/${productId}`, data);
    }

    deleteProduct(productId: string): Observable<any> {
        console.log(`Deleting product with ID: ${productId}`);
        return this.http.delete(`${this.apiUrl}/${productId}`);
    }

    createProduct(data: any): Observable<any> {
        console.log('Creating a new product');
        return this.http.post(this.apiUrl, data);
    }
}
