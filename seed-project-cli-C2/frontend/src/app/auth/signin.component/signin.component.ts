import { Component, OnInit, inject } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { UserService } from "../user.services";

@Component({
  selector: "app-signin",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./signin.component.html",
  styleUrl: "./signin.component.css"
})
export class SigninComponent implements OnInit {
  myFormIn!: FormGroup;
  UserService = inject(UserService); // Injeção do serviço UserService

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Criação do FormGroup para o formulário de login
    this.myFormIn = this.fb.group({
      // Definição dos campos e validadores
      emailTS: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}"),
        ]),
      ],
      passwordTS: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          this.minusculoFValidator, // Validador personalizado
        ]),
      ],
    });
  }

  // Validador personalizado para verificar se a senha contém letras minúsculas
  minusculoFValidator(control: AbstractControl) {
    const pass = control.value as string;

    if (pass !== pass?.toLowerCase() && pass !== null) {
      return { minusculoF: true };
    } else return null;
  }

  // Método chamado quando o formulário é submetido
  async onSubmit() {
    const response = await this.UserService.login(this.myFormIn.value); // Chama o método de login do UserService
    console.log(response)
  }
}
