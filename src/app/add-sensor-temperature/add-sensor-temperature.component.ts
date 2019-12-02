import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,  } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TemperatureSensor } from '../TemperatureSensor';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-add-sensor-temperature',
  templateUrl: './add-sensor-temperature.component.html',
  styleUrls: ['./add-sensor-temperature.component.scss']
})

export class AddSensorTemperatureComponent implements OnInit {

  sensor: TemperatureSensor = new TemperatureSensor();
  addSensorForm: FormGroup;

  constructor(
    private http:HttpClient, 
    private formBuilder: FormBuilder,
    private restApiService: RestApiService) {
  }

  ngOnInit() {
    this.addSensorForm = this.formBuilder.group({
      'name': [this.sensor.name,[
        Validators.required,
        Validators.minLength(1)
      ]],
      'address': [this.sensor.address,[
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(15)
      ]]
    });
  }

  saveSensor(sensor: TemperatureSensor){
    this.restApiService.addTemperatureSensor(sensor);
  }

 onAddSubmit(){
   alert("Dodano sensor do bazy")
   this.saveSensor(this.sensor);
 }

}
