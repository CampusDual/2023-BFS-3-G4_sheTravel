import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelersRoutingModule } from './travelers-routing.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { TravelersHomeComponent } from './travelers-home/travelers-home.component';
import { TravelersDetailComponent } from './travelers-detail/travelers-detail.component';
import { TravelersReservationComponent } from './travelers-reservation/travelers-reservation.component';
import { TravelersReservationDetailComponent } from './travelers-reservation/travelers-reservation-detail/travelers-reservation-detail.component';
import { TravelersReservationReceivedDetailComponent } from './travelers-reservation/travelers-reservation-received-detail/travelers-reservation-received-detail.component';
import { TravelersAllComponent } from './travelers-all/travelers-all.component';


@NgModule({
  declarations: [TravelersHomeComponent, TravelersDetailComponent, TravelersReservationComponent, TravelersReservationDetailComponent, TravelersReservationReceivedDetailComponent, TravelersAllComponent],
  imports: [
    CommonModule,
    TravelersRoutingModule,
    OntimizeWebModule
  ]
})
export class TravelersModule { }
