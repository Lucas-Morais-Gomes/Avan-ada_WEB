import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FornecedorService {
    private apiUrl = 'http://localhost:3000/fornecedores';

    constructor(private http: HttpClient) { }

    getAllFornecedors(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    updateFornecedor(fornecedorId: string, data: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${fornecedorId}`, data);
    }

    deleteFornecedor(fornecedorId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${fornecedorId}`);
    }

    createFornecedor(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data);
    }
}