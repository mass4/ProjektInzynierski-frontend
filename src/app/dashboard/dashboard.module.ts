import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
