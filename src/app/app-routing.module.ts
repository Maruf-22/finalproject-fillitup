import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsComponent } from './components/brands/brands.component';
import { TypesComponent } from './components/types/types.component';

const routes: Routes = [
  //-> Redirect to the Map page
  {
    path: '',
    redirectTo: '/map',
    pathMatch: 'full',
  },
  //-> Checks if the current route is registed by the Auth module
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  //-> Checks if the current route is registed by the Map module
  {
    path: '',
    loadChildren: () =>
      import('./modules/map/map.module').then((m) => m.MapModule),
  },
  //-> Checks if the current route is registed by the Hub module
  {
    path: '',
    loadChildren: () =>
      import('./modules/hub/hub.module').then((m) => m.HubModule),
  },
  //-> Loads the BrandsComponent on route /brands
  {
    path: 'brands',
    component: BrandsComponent,
  },
  //-> Loads the TypesComponent on route /types
  {
    path: 'types',
    component: TypesComponent,
  },
  { path: '**', redirectTo: '/map', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
