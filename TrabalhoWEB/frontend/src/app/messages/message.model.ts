export interface Message {
  _id?: string; // Propriedade _id para armazenar o identificador único gerado pelo MongoDB
  content: string;
  userId?: string;
  username?: string;
}
