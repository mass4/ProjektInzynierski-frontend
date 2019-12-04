import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { element } from 'protractor';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { Subscription, Observable } from 'rxjs';
import {DateRange} from 'src/app/DateRange';
import { SensorReading } from '../SensorReading';

class ActualSensor{
  name: String;
  value: any;

  constructor(name: String, value: any){
    this.name = name;
    this.value = value;
  }
}

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})

export class GraphComponent implements OnInit {

  displayedColumns: string[] = ['name', 'value'];

  temperatureData: ActualSensor[];
  moistureData: ActualSensor[];

  temperatureReading: SensorReading[];
  moistureReading: SensorReading[];

  selected = '24h';

  calendarDateRange: DateRange = new DateRange();
  dateForm: FormGroup;

  quickDate: DateRange = new DateRange();

  testfunc(){
    this.quickDate.endDate = new Date(Date.now());
    this.quickDate.beginDate = new Date(this.quickDate.endDate);

    if(this.selected == '24h'){
      this.quickDate.beginDate.setDate(this.quickDate.beginDate.getDate()-1);
    }
    else if (this.selected == 'week'){
      this.quickDate.beginDate.setDate(this.quickDate.beginDate.getDate()-7);
    }
    else if (this.selected == 'month'){
      this.quickDate.beginDate.setDate(this.quickDate.beginDate.getDate()-30);
    }
    else if (this.selected == 'year'){
      this.quickDate.beginDate.setDate(this.quickDate.beginDate.getDate()-365);
    }
    
    console.log(this.quickDate);
    this.restApiService.addDateRange(this.quickDate);
  }

  constructor(
    private httpClient:HttpClient, 
    private formBuilder: FormBuilder, 
    private restApiService:RestApiService) {}

  ngOnInit() {
    this.lastReadings();

    this.dateForm = this.formBuilder.group({
      'startDate': [this.calendarDateRange.beginDate,[

      ]],
      'endDate': [this.calendarDateRange.endDate,[

      ]]

    });

    

  }

  onDateFormSubmit(){
    console.log(this.calendarDateRange.beginDate);
    console.log(this.calendarDateRange.endDate);

    this.restApiService.addDateRange(this.calendarDateRange);
  }

  lastReadings(){
    var endDate : Date = new Date(Date.now());
    var beginDate : Date = new Date(Date.now()-3600*1000); //ostatnia godzina

    this.restApiService.getTemperatureReadingsBetween(beginDate,endDate).then(data =>{
      this.temperatureReading = data;
    }).finally(
      ()=>{
        this.temperatureData = this.assignToData(this.temperatureReading);
      }
    );

    this.restApiService.getMoistureReadingsBetween(beginDate,endDate).then(data =>{
      this.moistureReading = data;
    }).finally(
      ()=>{
        this.moistureData = this.assignToData(this.moistureReading);
      }
    );
  }

  assignToData(readings: SensorReading[]){
    var data: ActualSensor[] = new Array;

    readings.forEach(element => {
      console.log(element.readings.length - 1);
      if(element.readings.length - 1>=0){
        data.push(new ActualSensor(element.name, element.readings[element.readings.length - 1].value));
      }
      else{
        data.push(new ActualSensor(element.name, "-"));
      }
    });

    return data;
  }
}
