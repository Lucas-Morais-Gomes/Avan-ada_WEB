import { Component, OnInit, inject } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { UserService } from "./user.services";

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./signup.component.html",
})
export class SignupComponent implements OnInit {
  myForm!: FormGroup;
  UserService = inject(UserService);

  async onSubmit() {
    // console.log(this.myForm);
    // this.myForm.reset();
    const response = await this.UserService.register(this.myForm.value)
    console.log(response)
    
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
