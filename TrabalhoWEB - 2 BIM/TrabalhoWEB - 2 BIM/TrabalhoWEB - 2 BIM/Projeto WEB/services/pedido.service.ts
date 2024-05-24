import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PedidoService {
    private apiUrl = 'http://localhost:3000/pedidos';

    constructor(private http: HttpClient) { }

    getAllPedidos(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    updatePedido(pedidoId: string, data: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${pedidoId}`, data);
    }

    deletePedido(pedidoId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${pedidoId}`);
    }

    createPedido(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data);
    }
}