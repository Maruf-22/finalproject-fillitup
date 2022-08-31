import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { BrandsComponent } from './components/brands/brands.component';
import { TypesComponent } from './components/types/types.component';

@NgModule({
  declarations: [AppComponent, BrandsComponent, TypesComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    //-> Loads firbase and any relevant applications we use from firebase. (Authentication and Firestore)
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
