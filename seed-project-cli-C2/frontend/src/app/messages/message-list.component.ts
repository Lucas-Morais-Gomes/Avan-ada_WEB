import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageComponentSignal } from './message-signal.component';
import { Message } from './message.model';
import { MessageService } from './message.services';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [
    FormsModule,
    MessageComponentSignal
  ],
  template:`
    <div class="col-md-8 col-md-offset-2">
      @for (msg of messageS; track $index) {
        <app-message-signal [messageVarClasse]="msg"
                            (outputMessage)="msg.content = $event">
        </app-message-signal>
      } @empty {
          messageS é uma lista vazia
      }
    </div>
  `
  // providers: [MessageService]
})

export class MessageListComponent implements OnInit {
  messageS: Message[] = [
    new Message("Texto 01 da Mensagem", "Nikolas Tostes"),
    new Message("Texto 02 da Mensagem", "GuimarãesTostes"),
    new Message("Texto 03 da Mensagem", "TostesGuimarães")
  ];


  constructor (private messageService: MessageService){ }
  ngOnInit(): void {
    //messageS aponta para o array messageSService que armazena os dados
    this.messageS = this.messageService.getMessages();
  }
}
