import { Component, OnInit } from '@angular/core';
import { TemperatureSensor } from 'src/app/TemperatureSensor';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TemperatureComponent } from '../sensorForm/temperature/temperature.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-sensor-temperature',
  templateUrl: './show-sensor-temperature.component.html',
  styleUrls: ['./show-sensor-temperature.component.scss']
})

export class ShowSensorTemperatureComponent implements OnInit {

  private subscription: Subscription;

  constructor(
    private restApiService:RestApiService,
    private dialog:MatDialog) { }

  displayedColumns: string[] = ['id', 'name', 'address','option'];
  sensors: TemperatureSensor[];

  ngOnInit() {
    this.initList();

    this.subscription = this.restApiService.temperatureSensorChanged.subscribe(
      () => {
        this.initList();
    })
  }

  initList(){
    this.sensors=null;

    this.restApiService.getTemperatureSensors().then(data =>
      {
        this.sensors = data;
      }).finally();
  }

  addOrEditSensor(sensorIndex, sensors){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="80%";
    dialogConfig.data = {sensorIndex, sensors}

    this.dialog.open(TemperatureComponent, dialogConfig);
  }

  onDeleteSensor(sensorIndex){
    this.restApiService.deleteTemperatureSensor(sensorIndex);
  }

}
