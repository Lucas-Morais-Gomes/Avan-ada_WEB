import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  myForm!: FormGroup;

  onSubmit() {
    let bodyData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    };
    this.http
      .post('http://localhost:9002/user/create', bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Usuário Cadastrado Com Sucesso!');
      });
    // console.log(this.myForm);
    // this.myForm.reset();
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
