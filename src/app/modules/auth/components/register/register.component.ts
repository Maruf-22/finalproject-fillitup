import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
//-> This component handles the registration page
export class RegisterComponent implements OnInit {
  form: FormGroup;
  errorText: string;

  //-> Injects the Router, AuthService and FormBuilder
  //-> Router - Handles actions taken upon routes
  //-> AuthService - Handles Authentication
  //-> FormBuilder - Handles the HTML form and processing it's data
  constructor(
    private readonly router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    //-> Creates a form builder with all the required fields and validation rules
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      mobileNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/[0-9]/),
          Validators.minLength(11),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  //-> Provides getter functions for all the form elements
  get email() {
    return this.form.get('email');
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get mobileNumber() {
    return this.form.get('mobileNumber');
  }

  //-> Triggered when the register form is submitted
  onSubmit() {
    //-> Calls the AuthService to register a new user and redirect the browser to /login
    //-> Displays error text to the user if the registration was unsuccessful
    this.authService
      .register(this.form.value)
      .then(() => this.router.navigate(['/login']))
      .catch(
        (e) => (this.errorText = 'A user with this email already exists!')
      );
  }

  //-> Checks if two strings matches each other
  matches(str1: string, str2: string): boolean {
    return str1 === str2;
  }
}
