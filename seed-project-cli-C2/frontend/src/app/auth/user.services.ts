import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, firstValueFrom, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private baseUrl = "http://localhost:3000/user";
  private htttpClient = inject(HttpClient); // Injeção do HttpClient

  constructor(private httpClient: HttpClient) {}

  // Método para registrar um novo usuário
  register(formValue: any) {
    // Ajustando os nomes dos campos para correspondência com o backend
    const formValueToSend = {
      firstName: formValue.firstNameTS,
      lastName: formValue.lastNameTS,
      email: formValue.emailTS,
      password: formValue.passwordTS,
      country: formValue.countryTS,
      gender: formValue.genderTS,
      acceptTerms: formValue.acceptTermsTS,
    };

    // Enviar uma solicitação POST para o endpoint de registro
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/signup`, formValueToSend)
    );
  }

  getAllUsers() {
    // Pegando todos os Usuários já cadastrados
    // Enviar uma solicitação GET para o endpoint de users
    return this.httpClient
      .get<any>(`${this.baseUrl}/getAll`)
      .pipe(map((response: any) => response.users));
  }

  // Método para fazer login
  login(formValue: any) {
    // Preparar os dados do formulário para envio
    const formValueToSend = {
      email: formValue.emailTS,
      password: formValue.passwordTS,
    };

    // Enviar uma solicitação POST para o endpoint de login
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/signin`, formValueToSend)
    );
  }
}
