// imports the necessary components
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleMapsModule } from '@angular/google-maps';

import { MapRoutingModule } from './map-routing.module';
import { HomeComponent } from './components/home/home.component';

import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AutocompleteComponent } from './components/auto-complete/auto-complete.component';

//declares what components are being imported and exports necessary components
@NgModule({
  declarations: [HomeComponent, AutocompleteComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
})
export class MapModule {}
