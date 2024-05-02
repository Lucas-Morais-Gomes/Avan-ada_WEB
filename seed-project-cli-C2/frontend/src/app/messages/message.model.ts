export class Message {
    _id: string; // Propriedade _id para armazenar o identificador único gerado pelo MongoDB
    content: string;
    userId?: string;
    username: string;
    
    constructor(content: string, username: string, userId?: string) {
        // Não é necessário gerar manualmente o _id, pois o MongoDB o fará automaticamente
        this._id = ''; // Inicialize com uma string vazia por padrão
        this.content = content;
        this.userId = userId;
        this.username = username;
    }
}
