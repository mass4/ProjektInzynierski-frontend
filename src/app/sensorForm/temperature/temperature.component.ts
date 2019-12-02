import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { TemperatureSensor } from 'src/app/TemperatureSensor';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss']
})
export class TemperatureComponent implements OnInit {

  sensor:TemperatureSensor = new TemperatureSensor();
  addSensorForm: FormGroup;
  sensors:TemperatureSensor[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef:MatDialogRef<TemperatureComponent>,
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
            address:accSensor.address
          };
        }
      }
    }

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

  updateSensor(sensor: TemperatureSensor){
    this.restApiService.updateTemperatureSensor(sensor);
  }

  onAddSubmit(){
    var flag = true;
    var message = "Nieoczekiwany błąd";
    for (let accSensor of this.sensors){
      if (accSensor.id != this.sensor.id){
        if(accSensor.name == this.sensor.name || accSensor.address == this.sensor.address){
          flag = false;
          message = "Nazwa lub adres sensora powtarza się";
        };
      }
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