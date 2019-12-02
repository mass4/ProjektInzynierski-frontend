import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSensorMoistureComponent } from './add-sensor-moisture.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [AddSensorMoistureComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    AddSensorMoistureComponent
  ]
})
export class AddSensorMoistureModule { }
