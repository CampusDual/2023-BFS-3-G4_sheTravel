import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    OntimizeWebModule
  ]
})
export class RegisterModule { }
