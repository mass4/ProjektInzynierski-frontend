import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chart } from 'angular-highcharts';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { DateRange } from 'src/app/DateRange';
import { SensorReading } from 'src/app/SensorReading';
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
      yAxis:{
        title: {
          text: "Temperatura [°C]"
        }
      },
      xAxis:{
        type: 'datetime',
        labels: {
          enabled: true, 
          }
      },
      time:{
        useUTC: true,
        timezoneOffset: -60
      },
      tooltip: {
        xDateFormat: '%Y-%m-%d %H:%M:%S',
        valueSuffix: ' °C',
        shared: true
      }
    });
  }

  ngOnInit() {
    this.subscription = this.restApiService.dateRangeChanged.subscribe(
      (dateRange: DateRange) => {
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
