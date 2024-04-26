import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { Message } from './message.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-message-signal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './message-signal.component.html',
  styleUrl: './message.component.css'

})
export class MessageComponentSignal {

 messageVarClasse = input<Message>(new Message("",""));

  @Output() outputMessage = new EventEmitter<string>();
  color = 'yellow'
  onEdit() {
    this.outputMessage.emit("Texto retornado componente com Signal: venho de message (child) para o app (pai)");
  }

  
}
