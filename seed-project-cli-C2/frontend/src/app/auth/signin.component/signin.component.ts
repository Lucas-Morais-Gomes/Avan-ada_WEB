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
})
export class SigninComponent implements OnInit {
  myFormIn!: FormGroup;
  UserService = inject(UserService);

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myFormIn = this.fb.group({
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
          this.minusculoFValidator,
        ]),
      ],
    });
  }
  minusculoFValidator(control: AbstractControl) {
    const pass = control.value as string;

    if (pass !== pass?.toLowerCase() && pass !== null) {
      return { minusculoF: true };
    } else return null;
  }
  async onSubmit() {
    // console.log(this.myFormIn);
    // this.myFormIn.reset();
    const response = await this.UserService.login(this.myFormIn.value);
    console.log(response)
  }
}
