import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MessageComponentSignal } from "../message-signal.component/message-signal.component";
import { Message } from "../message.model";
import { MessageService } from "../message.services";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-message-list",
  standalone: true,
  imports: [FormsModule, MessageComponentSignal, CommonModule],
  templateUrl: "./message-list.component.html",
  // providers: [MessageService]
})
export class MessageListComponent implements OnInit {
  messages$: Observable<Message[]>; // Lista de mensagens

  constructor(private messageService: MessageService) {
    this.messages$ = this.messageService.getMessages();
  }

  ngOnInit(): void {
    this.messages$.subscribe(console.log);
  }
}
