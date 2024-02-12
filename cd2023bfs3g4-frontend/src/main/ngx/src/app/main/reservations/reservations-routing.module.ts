import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationHomeComponent } from './reservation-home/reservation-home.component';
import { ReservationSentDetailComponent } from './reservation-home/reservation-sent-detail/reservation-sent-detail.component';
import { ReservationReceivedDetailComponent } from './reservation-home/reservation-received-detail/reservation-received-detail.component';
import { ProfileDialogComponent } from './reservation-home/profile-dialog/profile-dialog.component';


const routes: Routes = [
  {path:'', component:ReservationHomeComponent},
  {path:'reservation/detailSent/:id_reservation', component:ReservationSentDetailComponent},
  {path:'reservation/detailReceived/:id_reservation', component:ReservationReceivedDetailComponent},
  {path:'reservation/profile/:id_client', component:ProfileDialogComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationsRoutingModule { }
