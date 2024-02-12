import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { ReservationHomeComponent } from './reservation-home/reservation-home.component';
import { ReservationSentDetailComponent } from './reservation-home/reservation-sent-detail/reservation-sent-detail.component';
import { ReservationReceivedDetailComponent } from './reservation-home/reservation-received-detail/reservation-received-detail.component';
import { ProfileDialogComponent } from './reservation-home/profile-dialog/profile-dialog.component';


@NgModule({
  declarations: [ReservationHomeComponent, ReservationSentDetailComponent, 
    ReservationReceivedDetailComponent, ProfileDialogComponent],
  imports: [
    CommonModule,
    ReservationsRoutingModule, OntimizeWebModule
  ]
})
export class ReservationsModule { }
