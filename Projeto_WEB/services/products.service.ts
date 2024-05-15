import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class productsService {
    private apiUrl = 'http://localhost:3000/products';

    constructor(private http: HttpClient) { }

    getAllproductss(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    updateproducts(productsId: string, data: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${productsId}`, data);
    }

    deleteproducts(productsId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${productsId}`);
    }

    createproducts(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data);
    }
}