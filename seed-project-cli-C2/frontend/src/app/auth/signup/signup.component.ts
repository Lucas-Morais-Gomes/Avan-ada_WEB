import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  myForm!: FormGroup;

  onSubmit() {
    console.log(this.myForm);
    this.myForm.reset();
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      firstNameTS: new FormControl('', Validators.required),
      lastNameTS: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
      ]),
      emailTS: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
      ]),
      passwordTS: new FormControl('', Validators.required),
    });
  }
}

// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'; // Remova ReactiveFormsModule, não é necessário aqui
// import { UserService } from '../user/user.service'; // Verifique o caminho correto do serviço UserService
// import { HttpErrorResponse } from '@angular/common/http'; // Importe o tipo HttpErrorResponse para tratar erros HTTP

// @Component({
//   selector: 'app-signup',
//   standalone: true,
//   imports: [ReactiveFormsModule],
//   templateUrl: './signup.component.html',
// })
// export class SignupComponent implements OnInit {
//   myForm!: FormGroup;

//   constructor(private userService: UserService) {}

//   onSubmit() {
//     if (this.myForm.valid) {
//       this.userService.cadastrarUsuario(this.myForm.value).subscribe(
//         (response: any) => {
//           console.log('Usuário cadastrado com sucesso:', response);
//           // Resete o formulário apenas se o cadastro for bem-sucedido
//           this.myForm.reset();
//         },
//         (error: HttpErrorResponse) => {
//           console.error('Erro ao cadastrar usuário:', error);
//         },
//       );
//     } else {
//       console.error('Formulário inválido. Verifique os campos.');
//     }
//   }

//   ngOnInit() {
//     this.myForm = new FormGroup({
//       firstNameTS: new FormControl('', Validators.required),
//       lastNameTS: new FormControl('', [
//         Validators.required,
//         Validators.minLength(4),
//         Validators.maxLength(16),
//       ]),
//       emailTS: new FormControl('', [
//         Validators.required,
//         Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
//       ]),
//       passwordTS: new FormControl('', Validators.required),
//     });
//   }
// }
