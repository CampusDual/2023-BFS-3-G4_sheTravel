import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TownsHomeComponent } from './towns-home/towns-home.component';
import { TownsDetailComponent } from './towns-detail/towns-detail.component';


const routes: Routes = [
  
  {path:'', component:TownsHomeComponent},
  {path:':id_town', component:TownsDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule]
})
export class TownsRoutingModule { }
