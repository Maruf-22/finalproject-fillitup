import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
//-> This component handles the login page
export class LoginComponent implements OnInit {
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
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {}

  //-> Provides getter functions for all the form elements
  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  //-> Triggered when the register form is submitted
  onSubmit() {
    //-> Calls the AuthService to login a new user with the provided credentials and redirect the browser to the index route
    //-> Displays error text to the user if the registration was unsuccessful
    this.authService
      .login(this.form.value)
      .then(() => this.router.navigate(['/']))
      .catch((e) => (this.errorText = 'Invalid Email/Passowrd.'));
  }
}
