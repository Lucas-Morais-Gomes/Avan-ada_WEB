import { Injectable } from "@angular/core";

import { Message } from "./message.model";

@Injectable ()

export class MessageService {
    private messageSService: Message [] = [];

    addMessage(message: Message){
        this.messageSService.push(message);
        console.log(this.messageSService);
    }

    deleteMessage(message: Message){
        this.messageSService.splice(this.messageSService.indexOf(message), 1)
    }

    getMessages(){
        return this.messageSService;
    }
}

