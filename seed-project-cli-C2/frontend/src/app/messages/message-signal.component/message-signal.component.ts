import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { Message } from '../message.model';
import {CommonModule} from '@angular/common';
import { MessageService } from '../message.services';

@Component({
  selector: 'app-message-signal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './message-signal.component.html',
  styleUrl: '../message.component/message.component.css'

})
export class MessageComponentSignal {

  // messageVarClasse = input<Message>(new Message("",""));
  @Input() messageVarClasse!: Message;
  @Output() outputMessage = new EventEmitter<string>();
  editModalActive = false;
  editedMessageContent = '';
  
  constructor(private messageServiceObj: MessageService) {}

  onSave(messageId: any) {
    // Atualizar a mensagem com o conteúdo editado
    if (confirm("Tem certeza que deseja Editar essa mensagem?")) {
      this.messageVarClasse.content = this.editedMessageContent;
      const updatedMessage = { content: this.editedMessageContent }; // Criar objeto com o conteúdo editado
      // Chamar o serviço para salvar a mensagem editada
      this.messageServiceObj.updateMessage(messageId, updatedMessage).subscribe((res: any) => {
        alert("Mensagem Editada");
      });
    }
  }
  
  onDelete(event: any, messageId: any) {
    if (confirm("Tem certeza que deseja deletar essa mensagem?")) {
      event.target.innerText = "Deletando...";
      this.messageServiceObj.deleteMessage(messageId).subscribe((res: any) => {
        alert("Mensagem Deletada");
      });

    }
  }
}
