import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = 'http://localhost:3000/message'; // URL base para as operações de mensagem
  private messageSService: Message[] = []; // Array local para armazenar as mensagens

  constructor(private http: HttpClient) { } // Injeta HttpClient para fazer solicitações HTTP

  // Método para lidar com erros
  errorHandler(error: any, info: string) {
    console.error(`Erro: ${info}`, error); // Registra o erro no console
    return throwError(`Erro: ${info}`); // Retorna um Observable de erro com uma mensagem personalizada
  }

  // Adiciona uma nova mensagem
  addMessage(message: Message): Observable<any> {
    this.messageSService.push(message); // Adiciona a mensagem localmente
    console.log(this.messageSService); // Registra a mensagem no console

    return this.http.post<any>(`${this.baseUrl}`, message).pipe( // Envia uma solicitação POST para adicionar a mensagem no backend
      catchError(error => this.errorHandler(error, 'Erro ao adicionar mensagem')) // Lida com erros
    );
  }

  // Exclui uma mensagem com base no ID
  deleteMessage(messageId: any) {
    return this.http.delete(`${this.baseUrl}/${messageId}`); // Envia uma solicitação DELETE para excluir a mensagem no backend
  }
  
  // Obtém todas as mensagens do backend
  getMessages(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`).pipe( // Envia uma solicitação GET para obter todas as mensagens do backend
      map(response => {
        console.log(response); // Registra a resposta no console

        const messagesResponse = response.objSMessageSRecuperadoS; // Extrai as mensagens da resposta

        let transformedMessages: Message[] = []; // Inicializa uma matriz para armazenar as mensagens transformadas
        for (let msg of messagesResponse) {
          transformedMessages.push(new Message(msg.content, 'Lucas', msg._id)); // Transforma os dados em instâncias de Message e as armazena na matriz
        }
        this.messageSService = transformedMessages; // Armazena as mensagens localmente

        console.log('Mensagens recuperadas:', this.messageSService); // Registra as mensagens recuperadas no console

        return response; // Retorna a resposta
      }),
      catchError(error => this.errorHandler(error, 'Erro ao recuperar mensagens')) // Lida com erros
    );
  }

  // Atualiza uma mensagem com base no ID
  updateMessage(messageId: any, updatedMessage: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${messageId}`, updatedMessage) // Envia uma solicitação PUT para atualizar a mensagem no backend
      .pipe(
        catchError(error => {
          console.error('Erro ao atualizar mensagem no servidor:', error); // Registra o erro no console
          return throwError(error); // Retorna um Observable de erro
        })
      );
  }  
}
