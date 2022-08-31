// imports necessary components
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

// declares the path the url uses to access the components
const routes: Routes = [
  {
    path: 'map',
    component: HomeComponent,
  },
];
// declares what is imported and exported
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapRoutingModule {}
