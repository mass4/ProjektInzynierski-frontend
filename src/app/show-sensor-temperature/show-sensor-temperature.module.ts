import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowSensorTemperatureComponent } from './show-sensor-temperature.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [ShowSensorTemperatureComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    ShowSensorTemperatureComponent
  ]
})
export class ShowSensorTemperatureModule { }
