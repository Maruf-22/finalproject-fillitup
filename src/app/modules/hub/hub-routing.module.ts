// imports relevant components
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageProfileComponent } from './components/manage-profile/manage-profile.component';

import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

// declares the path the url uses to access the components
const routes: Routes = [
  {
    path: 'manageProfile',
    component: ManageProfileComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];

// imports and exports the router routes
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HubRoutingModule {}
