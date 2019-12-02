import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { Chart } from 'angular-highcharts';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { seriesType } from 'highcharts';
import { ReadingService } from 'src/app/reading.service';
import { RestApiService } from 'src/app/shared/rest-api.service';
import {DateRange} from 'src/app/DateRange';
import {SensorReading} from 'src/app/SensorReading';
import { parse } from 'date-fns';

@Component({
  selector: 'app-temperature-graph',
  templateUrl: './temperature-graph.component.html',
  styleUrls: ['./temperature-graph.component.scss']
})

export class TemperatureGraphComponent implements OnInit {

  chart = new Chart();
  mySensorReadings:Array<SensorReading>;
  startDateRange:DateRange = 
  {
    beginDate:new Date(Date.now()-3600*1000*24),
    endDate: new Date(Date.now())
  };

  private subscription: Subscription;

  constructor(
    private httpClient:HttpClient, 
    private restApiService:RestApiService) { }

  createChart()
  {
    this.chart  = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Wykres Temperatury'
      },
      credits: {
        enabled: false
      },
      xAxis:{
        type: 'datetime',
        labels: {
          enabled: true, 
          }
      },
      lang: {
        months: [
            'Janvier', 'Février', 'Mars', 'Avril',
            'Mai', 'Juin', 'Juillet', 'Août',
            'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ],
        weekdays: [
            'Dimanche', 'Lundi', 'Mardi', 'Mercredi',
            'Jeudi', 'Vendredi', 'Samedi'
        ]
      }
    });
  }

  ngOnInit() {
    this.subscription = this.restApiService.dateRangeChanged.subscribe(
      (dateRange: DateRange) => {
        console.log("ZMIENIONNO DATE /temperatureGraphcomponent");
        console.log(dateRange);

        this.initializeMyReadings(dateRange);
      })

    this.initializeMyReadings(this.startDateRange);
  }


  initializeMyReadings(dateRange:DateRange){
    this.restApiService.getTemperatureReadingsBetween(dateRange.beginDate,dateRange.endDate).then(data =>
      {
        this.mySensorReadings = data;

        this.mySensorReadings.forEach(sensor =>{
          sensor.readings.forEach(read =>{
            var temporaryDate = new Date(Date.parse(read.timestamp));
            read.timestamp = temporaryDate.getTime();
          })
        })
        this.getReadingsBetween(this.mySensorReadings);

      }).finally();
  }

  getReadingsBetween(myReadings:SensorReading[]){
    //TO DO
    console.log("getReadingsBetween() --- TO DO")
    this.chart.destroy();
    this.createChart();
    
    myReadings.forEach(element => {
      var dataArray=[];

      element.readings.forEach(read =>{
        dataArray.push([read.timestamp, read.value])
      })
      this.chart.addSeries({name:element.name, data:dataArray} as Highcharts.SeriesColumnOptions, true, true);
    })
  }
}
