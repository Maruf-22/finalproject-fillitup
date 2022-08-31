// imports necessary components
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HubRoutingModule } from './hub-routing.module';
import { ManageProfileComponent } from './components/manage-profile/manage-profile.component';

//declares what components are being imported and exports necessary components
@NgModule({
  declarations: [ManageProfileComponent],
  imports: [CommonModule, HubRoutingModule],
})
export class HubModule {}
