import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TownsRoutingModule } from './towns-routing.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { TownsHomeComponent } from './towns-home/towns-home.component';
import { TownsDetailComponent } from './towns-detail/towns-detail.component';


@NgModule({
  declarations: [TownsHomeComponent, TownsDetailComponent],
  imports: [
    CommonModule,
    TownsRoutingModule,
    OntimizeWebModule
  ]
})
export class TownsModule { }
