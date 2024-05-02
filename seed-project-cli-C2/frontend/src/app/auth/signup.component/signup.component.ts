import { Component, OnInit, inject } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { UserService } from "../user.services";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./signup.component.html",
})
export class SignupComponent implements OnInit {
  myForm!: FormGroup;
  UserService = inject(UserService);
  countries = ['Brasil', 'Estados Unidos', 'Canadá', 'Reino Unido'];

  async onSubmit() {
    try {
      console.log("Formulário enviado:", this.myForm.value);
      if (this.myForm.valid) {
        const response = await this.UserService.register(this.myForm.value);
        console.log("Resposta do servidor:", response);
        alert("Usuário Cadastrado Com Sucesso!");
        this.myForm.reset();
      } else {
        console.error("Formulário inválido. Por favor, verifique os campos.");
      }
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
    }
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      firstNameTS: new FormControl("", Validators.required),
      lastNameTS: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
      ]),
      emailTS: new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}"),]),
      passwordTS: new FormControl("", Validators.required),
      countryTS: new FormControl("", Validators.required), // Inicialize com uma string vazia e defina como obrigatório
      genderTS: new FormControl("", Validators.required), // Para o radio
      acceptTermsTS: new FormControl("", Validators.required) // Para o checkbox
      
    });
  }
}
