import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MessageComponentSignal } from "../message-signal.component/message-signal.component";
import { Message } from "../message.model";
import { MessageService } from "../message.services";

@Component({
  selector: "app-message-list",
  standalone: true,
  imports: [FormsModule, MessageComponentSignal],
  template: `
    <div class="col-md-8 col-md-offset-2">
      @for (msg of messageS; track $index) {
      <app-message-signal
        [messageVarClasse]="msg"
        (outputMessage)="msg.content = $event"
      >
      </app-message-signal>
      } @empty { messageS é uma lista vazia }
    </div>
  `,
  // providers: [MessageService]
})
export class MessageListComponent implements OnInit {
  messageS: Message[] = []; // Lista de mensagens


  constructor(private messageService: MessageService) {} // Injeta o serviço de mensagem

  ngOnInit(): void { // Método executado ao inicializar o componente
    this.messageService.getMessages().subscribe({ // Obtém as mensagens do serviço
      next: (dadosSucesso: any) => { // Lida com o sucesso da operação
        console.log(dadosSucesso.myMsgSucesso); // Exibe uma mensagem de sucesso
        console.log({content: dadosSucesso.objSMessageSRecuperadoS[0].content}); // Exibe o conteúdo da primeira mensagem recuperada
        console.log({id: dadosSucesso.objSMessageSRecuperadoS[0].messageId}); // Exibe o ID da primeira mensagem recuperada

        this.messageS = dadosSucesso.objSMessageSRecuperadoS; // Atribui as mensagens recuperadas à lista de mensagens
      },
      error: (dadosErro) => { // Lida com erros
        console.log(`$== !!Error (subscribe): - ${dadosErro.info_extra} ==`); // Exibe uma mensagem de erro
        console.log(dadosErro); // Exibe detalhes do erro
      },
    });
  }
}
