import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { MoistureSensor } from 'src/app/MoistureSensor';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-moisture',
  templateUrl: './moisture.component.html',
  styleUrls: ['./moisture.component.scss']
})
export class MoistureComponent implements OnInit {

  sensor:MoistureSensor = new MoistureSensor();
  addSensorForm: FormGroup;
  sensors:MoistureSensor[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef:MatDialogRef<MoistureSensor>,
    private formBuilder: FormBuilder,
    private restApiService:RestApiService
  ) { }

  ngOnInit() {
  
    this.sensors = this.data.sensors;

    if(this.data.sensorIndex != null){
      for (let accSensor of this.sensors){
        if(accSensor.id == this.data.sensorIndex){
          this.sensor = {
            id:accSensor.id,
            name:accSensor.name,
            channel:accSensor.channel
          };
        }
      }
    }

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

  updateSensor(sensor: MoistureSensor){
    this.restApiService.updateMoistureSensor(sensor);
  }

  onAddSubmit(){
    var flag = true;
    var message = "Nieoczekiwany błąd";
    for (let accSensor of this.sensors){
      if (accSensor.id != this.sensor.id){
        if(accSensor.name == this.sensor.name || accSensor.channel == this.sensor.channel){
          flag = false;
          message = "Nazwa lub adres sensora powtarza się";
        };
      }
    }

    if(this.sensor.channel < 0 || this.sensor.channel > 7){
      flag = false;
      message = "Nie wybrano kanału";
    }

    if(flag==true){
      if(this.sensor.id == null){
        message = "Dodano sensor";
        this.saveSensor(this.sensor);
        this.dialogRef.close();
      }
      else{
        message = "Zaaktualizowano sensor";
        this.updateSensor(this.sensor);
        this.dialogRef.close();
      }
    }

    alert(message);
  }
}