import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Message } from '../message.model';
import { MessageListComponent } from '../message-list.component/message-list.component';
import { MessageInputComponent } from '../message-input.component/message-input.component';



@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [MessageListComponent, MessageInputComponent],
  template: `
    <div class="row">
      <app-message-input></app-message-input>
    </div>
    <hr/>
    <div class="row">
      <app-message-list></app-message-list>
    </div>
`

})
export class MessageComponent {

  // @Input() messageVarClasse: Message = new Message ("","");
  // @Output() outputMessage= new EventEmitter<string>();

  // onEdit(){
  //   this.outputMessage.emit("Texto retornado: venho de message (child) para o app (pai)");
  // }

  //  message = {
  //    content: 'To ficando fera com vários frameworks Angular',
  //    author: 'Iago, Luiz, Níkolas'
  //  };

}