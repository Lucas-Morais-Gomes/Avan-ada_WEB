import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./signup.component.html",
})
export class SignupComponent implements OnInit {
  myForm!: FormGroup;

  onSubmit() {
    console.log(this.myForm);
    this.myForm.reset();
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
    });
  }
}
