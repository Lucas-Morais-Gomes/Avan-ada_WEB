import { FormsModule } from '@angular/forms'; // Importa FormsModule para lidar com formulários no Angular
import { Component, EventEmitter, Input, Output, input } from '@angular/core'; // Importa Component, EventEmitter, Input e Output do Angular
import { Message } from '../message.model'; // Importa o modelo de mensagem
import { CommonModule } from '@angular/common'; // Importa CommonModule do Angular
import { MessageService } from '../message.services'; // Importa o serviço de mensagem

@Component({
  selector: 'app-message-signal', // Seletor do componente
  standalone: true, // Define o componente como independente
  imports: [FormsModule, CommonModule], // Importa FormsModule e CommonModule
  templateUrl: './message-signal.component.html', // URL do template HTML do componente
  styleUrl: './message-signal.component.css' // URL do arquivo de estilo do componente
})
export class MessageComponentSignal {
  @Input() messageVarClasse!: Message; // Entrada para a mensagem a ser exibida
  @Output() outputMessage = new EventEmitter<string>(); // Saída para o conteúdo da mensagem editada
  editModalActive = false; // Indica se o modal de edição está ativo
  editedMessageContent = ''; // Conteúdo editado da mensagem

  constructor(private messageServiceObj: MessageService) {} // Injeta o serviço de mensagem

  onEdit() { // Função chamada ao editar uma mensagem
    this.editedMessageContent = this.messageVarClasse.content; // Carrega o conteúdo original da mensagem
    this.openEditModal(); // Abre o modal de edição
  }

  openEditModal() { // Função para abrir o modal de edição
    this.editModalActive = true; // Define o modal de edição como ativo
    this.editedMessageContent = this.messageVarClasse.content; // Carrega o conteúdo original da mensagem no modal
  }

  closeEditModal() { // Função para fechar o modal de edição
    this.editModalActive = false; // Define o modal de edição como inativo
  }

  onSave(messageId: any) { // Função chamada ao salvar uma mensagem editada
    if (confirm("Tem certeza que deseja Editar essa mensagem?")) { // Confirmação de edição
      this.messageVarClasse.content = this.editedMessageContent; // Atualiza o conteúdo da mensagem com o conteúdo editado
      const updatedMessage = { content: this.editedMessageContent }; // Cria um objeto com o conteúdo editado
      // Chama o serviço para salvar a mensagem editada
      this.messageServiceObj.updateMessage(messageId, updatedMessage).subscribe((res: any) => {
        alert("Mensagem Editada"); // Exibe uma mensagem de sucesso
        this.closeEditModal(); // Fecha o modal de edição
      });
    }
  }
  
  onDelete(event: any, messageId: any) { // Função chamada ao excluir uma mensagem
    if (confirm("Tem certeza que deseja deletar essa mensagem?")) { // Confirmação de exclusão
      event.target.innerText = "Deletando..."; // Altera o texto do botão para indicar que está deletando
      // Chama o serviço para deletar a mensagem
      this.messageServiceObj.deleteMessage(messageId).subscribe((res: any) => {
        alert("Mensagem Deletada"); // Exibe uma mensagem de sucesso
      });
    }
  }
}
