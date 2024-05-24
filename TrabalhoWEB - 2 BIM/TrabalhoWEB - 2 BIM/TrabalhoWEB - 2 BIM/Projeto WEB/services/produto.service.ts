import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProdutoService {
    private apiUrl = 'http://localhost:3000/produtos';

    constructor(private http: HttpClient) { }

    getAllProdutos(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    updateProduto(produtoId: string, data: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${produtoId}`, data);
    }

    deleteProduto(produtoId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${produtoId}`);
    }

    createProduto(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data);
    }
}