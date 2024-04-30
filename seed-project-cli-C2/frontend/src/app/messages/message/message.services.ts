import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Message } from './message.model';

@Injectable()
export class MessageService {
  private baseUrl = 'http://localhost:3000';

  private messageSService: Message[] = [];

  errorHandler(e: any, info: string): Observable<any> {
    throw {
      info_extra: info,
      error_SS: e, //pega o server-side error
      error_CS: 'Client-Side: errorHandler : Ocorreu um erro!', //Pega o client-side error
    };
  }

  //constructor(private:httpClient) {}
  private http = inject(HttpClient);

  addMessage(message: Message) {
    this.messageSService.push(message);
    console.log(this.messageSService);

    return this.http
      .post<any>(`${this.baseUrl}/message`, message)
      .pipe(catchError((e) => this.errorHandler(e, 'addMessage()')));
  }

  deleteMessage(message: Message) {
    this.messageSService.splice(this.messageSService.indexOf(message), 1);
  }

  getMessages(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/message`).pipe(
      map((responseRecebida: any) => {
        console.log(responseRecebida);
        console.log({ content: responseRecebida.objSMessageSRecuparadoS[0].content });
        console.log({ _id: responseRecebida.objSMessageSRecuparadoS[0]._id });

        const messageSResponseRecebida = responseRecebida.objSMessageSRecuparadoS;

        let transformedCastMessagesModelFrontend: Message[] = [];
        for (let msg of messageSResponseRecebida) {
          transformedCastMessagesModelFrontend.push(
            new Message(msg.content, ' Iago, Luiz, Nikolas', msg._id),
          );
        }

        this.messageSService = [...transformedCastMessagesModelFrontend];
        responseRecebida.objSMessageSRecuparadoS = this.messageSService;

        console.log({ myMsgSucesso: responseRecebida.myMsgSucesso });
        console.log({ content: responseRecebida.objSMessageSRecuparadoS[0].content });
        console.log({ id: responseRecebida.objSMessageSRecuparadoS[0].messageId });

        return responseRecebida;
      }),
      catchError((e) => this.errorHandler(e, 'getMessages()')),
    );
  }

  //   getMessages() {
  //     return this.messageSService;
  //   }
}
