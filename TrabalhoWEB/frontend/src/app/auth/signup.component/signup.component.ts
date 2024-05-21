import { Component, OnInit, inject } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { UserService } from "../user.services"; // Importa o serviço UserService
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Importa ReactiveFormsModule e CommonModule
  styleUrl: './signup.component.css', // Arquivo de estilo do componente
  templateUrl: "./signup.component.html", // Arquivo HTML do componente
})
export class SignupComponent implements OnInit {
  myForm!: FormGroup; // Declara uma variável para armazenar o formulário
  UserService = inject(UserService); // Injeta o serviço UserService no componente
  countries = ['Brasil', 'Estados Unidos', 'Canadá', 'Reino Unido']; // Array de países

  async onSubmit() {
    try {
      console.log("Formulário enviado:", this.myForm.value); // Log dos dados do formulário
      if (this.myForm.valid) { // Verifica se o formulário é válido
        const response = await this.UserService.register(this.myForm.value); // Chama o método register do serviço UserService para registrar o usuário
        console.log("Resposta do servidor:", response); // Log da resposta do servidor
        alert("Usuário Cadastrado Com Sucesso!"); // Exibe um alerta de sucesso
        this.myForm.reset(); // Reseta o formulário após o envio bem-sucedido
      } else {
        console.error("Formulário inválido. Por favor, verifique os campos."); // Log de erro se o formulário for inválido
      }
    } catch (error) {
      console.error("Erro ao registrar usuário:", error); // Log de erro caso ocorra uma exceção durante o registro do usuário
    }
  }

  ngOnInit() {
    // Inicializa o formulário com os campos e validações necessárias
    this.myForm = new FormGroup({
      firstNameTS: new FormControl("", Validators.required), // Campo para o primeiro nome, obrigatório
      lastNameTS: new FormControl("", [ // Campo para o sobrenome, com validações de mínimo e máximo de caracteres
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
      ]),
      emailTS: new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}"),]), // Campo para o email, com validação de formato
      passwordTS: new FormControl("", Validators.required), // Campo para a senha, obrigatório
      countryTS: new FormControl("", Validators.required), // Campo para o país, obrigatório
      genderTS: new FormControl("", Validators.required), // Campo para o gênero, obrigatório (radio button)
      acceptTermsTS: new FormControl("", Validators.required) // Campo para aceitar os termos, obrigatório (checkbox)
    });
  }
}
