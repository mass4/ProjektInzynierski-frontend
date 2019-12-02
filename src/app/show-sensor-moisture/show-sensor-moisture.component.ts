import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoistureSensor } from 'src/app/MoistureSensor';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MoistureComponent } from '../sensorForm/moisture/moisture.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-show-sensor-moisture',
  templateUrl: './show-sensor-moisture.component.html',
  styleUrls: ['./show-sensor-moisture.component.scss']
})
export class ShowSensorMoistureComponent implements OnInit {

  private subscription: Subscription;

  constructor(
    private httpClient:HttpClient,
    private restApiService:RestApiService,
    private dialog:MatDialog) { }

  displayedColumns: string[] = ['id', 'name', 'channel','option'];
  sensors: MoistureSensor[];

  ngOnInit() {
    this.initList();

    this.subscription = this.restApiService.moistureSensorChanged.subscribe(
      () => {
        console.log("ZMIENIONO SENSOR MOIST")
        this.initList();
    })
  }

  initList(){
    this.sensors=null;

    this.restApiService.getMoistureSensors().then(data =>
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

    this.dialog.open(MoistureComponent, dialogConfig);
  }

  onDeleteSensor(sensorIndex){
    this.restApiService.deleteMoistureSensor(sensorIndex);
  }

}
