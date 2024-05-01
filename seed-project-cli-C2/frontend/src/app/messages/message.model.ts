export class Message {
    messageId: string;
    content: string;
    userId?: string;
    username: string;
    
    constructor(content: string, username: string, userId?: string) {
        this.messageId = this.generateId(); // Gera um ID automaticamente ao criar uma nova mensagem
        this.content = content;
        this.userId = userId;
        this.username = username;
    }

    private generateId(): string {
        // Lógica para gerar um ID único, por exemplo:
        return 'msg_' + Math.random().toString(36).substr(2, 9);
    }
}
