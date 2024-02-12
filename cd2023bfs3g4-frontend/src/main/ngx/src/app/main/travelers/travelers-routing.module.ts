import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TravelersHomeComponent } from './travelers-home/travelers-home.component';
import { TravelersDetailComponent } from './travelers-detail/travelers-detail.component';
import { TravelersReservationComponent } from './travelers-reservation/travelers-reservation.component';
import { TravelersReservationDetailComponent } from './travelers-reservation/travelers-reservation-detail/travelers-reservation-detail.component';
import { TravelersReservationReceivedDetailComponent } from './travelers-reservation/travelers-reservation-received-detail/travelers-reservation-received-detail.component';
import { TravelersAllComponent } from './travelers-all/travelers-all.component';


const routes: Routes = [
  {path:'', component:TravelersHomeComponent},
  {path:'all/:id_activity', component:TravelersAllComponent},
  {path:':id_client', component:TravelersDetailComponent},
  {path:'reservation/:id_client', component:TravelersReservationComponent},
  {path:'reservation/detailSent/:id_reservation', component:TravelersReservationDetailComponent},
  {path:'reservation/detailReceived/:id_reservation', component:TravelersReservationReceivedDetailComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelersRoutingModule { }
