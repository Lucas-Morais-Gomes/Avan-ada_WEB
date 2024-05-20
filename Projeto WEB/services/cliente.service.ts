import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ClienteService {
    private apiUrl = 'http://localhost:3000/clientes';

    constructor(private http: HttpClient) { }

    getAllClientes(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    updateCliente(clienteId: string, data: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${clienteId}`, data);
    }

    deleteCliente(clienteId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${clienteId}`);
    }

    createCliente(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data);
    }
}