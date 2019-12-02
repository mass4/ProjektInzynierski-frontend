import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowSensorMoistureComponent } from './show-sensor-moisture.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [ShowSensorMoistureComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    ShowSensorMoistureComponent
  ]
})
export class ShowSensorMoistureModule { }
