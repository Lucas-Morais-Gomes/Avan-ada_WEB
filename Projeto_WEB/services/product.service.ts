import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService { // Alteração aqui: Renomear de SubjectService para ProductService
    private apiUrl = 'http://localhost:3000/products'; // Alteração aqui: Alterar a URL para refletir a nova estrutura do projeto

    constructor(private http: HttpClient) { }

    getAllProducts(): Observable<any[]> { // Alteração aqui: Renomear de getAllSubjects para getAllProducts
        return this.http.get<any[]>(this.apiUrl); // Alteração aqui: Alterar a URL para refletir a nova estrutura do projeto
    }

    updateProduct(productId: string, data: any): Observable<any> { // Alteração aqui: Renomear de updateSubject para updateProduct
        return this.http.patch(`${this.apiUrl}/${productId}`, data); // Alteração aqui: Alterar a URL para refletir a nova estrutura do projeto
    }

    deleteProduct(productId: string): Observable<any> { // Alteração aqui: Renomear de deleteSubject para deleteProduct
        return this.http.delete(`${this.apiUrl}/${productId}`); // Alteração aqui: Alterar a URL para refletir a nova estrutura do projeto
    }

    createProduct(data: any): Observable<any> { // Alteração aqui: Renomear de createSubject para createProduct
        return this.http.post(this.apiUrl, data); // Alteração aqui: Alterar a URL para refletir a nova estrutura do projeto
    }
}
