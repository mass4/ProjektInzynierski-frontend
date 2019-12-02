import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSensorTemperatureComponent } from './add-sensor-temperature.component';
import { MaterialModule } from '../material/material.module';
// import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule, HttpRequest, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AddSensorTemperatureComponent],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClient,
    ReactiveFormsModule
  ],
  exports:[
    AddSensorTemperatureComponent
  ]
})
export class AddSensorTemperatureModule implements OnInit {
  constructor() {}

  ngOnInit(){  }
  


 }
