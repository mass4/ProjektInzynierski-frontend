import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MoistureSensor } from '../MoistureSensor';
import { RestApiService } from '../shared/rest-api.service';


@Component({
  selector: 'app-add-sensor-moisture',
  templateUrl: './add-sensor-moisture.component.html',
  styleUrls: ['./add-sensor-moisture.component.scss']
})
export class AddSensorMoistureComponent implements OnInit {

  sensor: MoistureSensor = new MoistureSensor();
  addSensorForm: FormGroup;

  constructor(
    private http:HttpClient, 
    private formBuilder: FormBuilder,
    private restApiService:RestApiService) { }

  ngOnInit() {
    this.addSensorForm = this.formBuilder.group({
      'name': [this.sensor.name,[
        Validators.required,
        Validators.minLength(1)
      ]],
      'channel': [this.sensor.channel,[
        
      ]]
    });
  }

  saveSensor(sensor: MoistureSensor){
    this.restApiService.addMoistureSensor(sensor);
  }

  onAddSubmit(){
    alert("Dodano sensor do bazy")
    this.saveSensor(this.sensor);
    console.log(this.sensor);
  }
}
