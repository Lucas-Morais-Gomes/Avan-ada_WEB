import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = 'http://localhost:3000/message';
  private messageSService: Message[] = [];


  constructor(private http: HttpClient) { }

  errorHandler(error: any, info: string) {
    console.error(`Erro: ${info}`, error);
    return throwError(`Erro: ${info}`);
  }

  addMessage(message: Message): Observable<any> {
    this.messageSService.push(message);
    console.log(this.messageSService);

    return this.http.post<any>(`${this.baseUrl}`, message).pipe(
      catchError(error => this.errorHandler(error, 'Erro ao adicionar mensagem'))
    );
  }

  deleteMessage(messageId: any) {
    return this.http.delete(`${this.baseUrl}/${messageId}`);
  }
  
  getMessages(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`).pipe(
      map(response => {
        console.log(response);

        const messagesResponse = response.objSMessageSRecuperadoS;

        let transformedMessages: Message[] = [];
        for (let msg of messagesResponse) {
          transformedMessages.push(new Message(msg.content, 'Lucas', msg._id));
        }
        this.messageSService = transformedMessages;

        console.log('Mensagens recuperadas:', this.messageSService);

        return response;
      }),
      catchError(error => this.errorHandler(error, 'Erro ao recuperar mensagens'))
    );
  }

  // Método para atualizar uma mensagem
  updateMessage(messageId: any, updatedMessage: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${messageId}`, updatedMessage)
      .pipe(
        catchError(error => {
          console.error('Erro ao atualizar mensagem no servidor:', error);
          return throwError(error);
        })
      );
  }  
  
}
