import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

import { Injectable } from '@angular/core';
import { DBService } from 'src/app/services/db-service.service';
import {
  LoginData,
  RegisterData,
} from 'src/app/interfaces/auth-data.interface';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
//-> The AuthService is responsible for all communication bewteen the application and the Authentication Server
//-> The types in this class are all pre-defined to ensure that no invalid data is sent to the Authentication Server
//-> This serivce interacts with the DBService to provide access to data concerning users.
export class AuthService {
  constructor(private auth: Auth, private dbService: DBService) {}

  //-> Logs a user in with the given username and password
  login({ email, password }: LoginData) {
    //-> Calls the firebase signin method, passing through the current auth instance and the provided credentials
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  //-> Creates a new user
  async register({
    email,
    username,
    password,
    firstName,
    lastName,
    mobileNumber,
  }: RegisterData): Promise<void> {
    //-> Creates a new user and fetches the information from the Auth Server
    const user = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    //-> Stores aditional information about the user in the database
    this.dbService.create<User>('Users', {
      id: user.user.uid,
      username: username,
      firstName: firstName,
      lastName: lastName,
      mobileNumber: mobileNumber,
    });
  }

  //-> Logs the current user out
  logout() {
    //-> Shutsdown the current auth session
    return signOut(this.auth);
  }
}
