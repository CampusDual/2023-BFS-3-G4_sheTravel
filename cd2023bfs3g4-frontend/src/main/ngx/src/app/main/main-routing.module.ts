import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'ontimize-web-ngx';

import { MainComponent } from './main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'towns', loadChildren: () => import('./towns/towns.module').then(m => m.TownsModule) },
      { path: 'profile', loadChildren: () => import('./travelers/travelers.module').then(m => m.TravelersModule) },
      { path: 'travelers', loadChildren: () => import('./travelers/travelers.module').then(m => m.TravelersModule) },
      { path: 'communities', loadChildren: () => import('./community/community.module').then(m => m.CommunityModule) },
      { path: 'reservations', loadChildren: () => import('./reservations/reservations.module').then(m => m.ReservationsModule) }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
