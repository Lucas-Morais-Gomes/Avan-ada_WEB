import { Component, inject } from '@angular/core'; // Importa o componente e o injetor do Angular
import { FormsModule, NgForm } from '@angular/forms'; // Importa FormsModule e NgForm para lidar com formulários no Angular
import { MessageService } from '../message.services'; // Importa o serviço de mensagem
import { Message } from '../message.model'; // Importa o modelo de mensagem

@Component({
  selector: 'app-message-input', // Seletor do componente
  standalone: true, // Define o componente como independente
  imports: [FormsModule], // Importa o FormsModule
  templateUrl: './message-input.component.html', // URL do template HTML do componente
  styleUrl: "./message-input.component.css", // URL do arquivo de estilo do componente
  //providers: [MessageService] // Fornecedores de serviços (comentado)
})

export class MessageInputComponent {

  //Constructor (private messageService: MessageService){}
  private messageService = inject(MessageService); // Injeta o serviço de mensagem

  onSubmit(form: NgForm) { // Função chamada quando o formulário é enviado
    console.log("MessageInputComponet: ");
    console.log(form);
    const messageAux = new Message(form.value.myContentngForm, 'Iago, Luiz, Nikolas'); // Cria uma nova mensagem com o conteúdo do formulário

    this.messageService.addMessage(messageAux) // Chama o método addMessage do serviço de mensagem
      .subscribe({ // Assina o observable retornado pelo serviço
        next: (dadosSucesso: any) => { // Lida com o sucesso da operação
          console.log(dadosSucesso.myMsgSucesso); // Exibe uma mensagem de sucesso
          console.log({ content: dadosSucesso.objMessageSave.content }); // Exibe o conteúdo da mensagem salva
          console.log({ _id: dadosSucesso.objMessageSave._id }); // Exibe o ID da mensagem salva
        },
        error: (dadosErro) => { // Lida com erros
          console.log(`$== !!Error (subscribe): - ${dadosErro.info_extra} ==`); // Exibe uma mensagem de erro
          console.log(dadosErro); // Exibe detalhes do erro
        }
      })
    form.resetForm(); // Reseta o formulário
  }

  onSave(textoConsole: string) { // Função chamada para salvar uma mensagem
    const messageAux = new Message(textoConsole, 'Iago, Luiz, Nikolas'); // Cria uma nova mensagem
    this.messageService.addMessage(messageAux); // Chama o método addMessage do serviço de mensagem
    console.log(textoConsole); // Exibe o conteúdo da mensagem no console
  }
}
