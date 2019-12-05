import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { SensorReading } from 'src/app/SensorReading';
import { DateRange } from 'src/app/DateRange';
import { Subscription } from 'rxjs';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-moisture-graph',
  templateUrl: './moisture-graph.component.html',
  styleUrls: ['./moisture-graph.component.scss']
})
export class MoistureGraphComponent implements OnInit {

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
          text: 'Wykres Wilgotności'
        },
        credits: {
          enabled: false
        },
        yAxis:{
          title: {
            text: "Wilgotność [%]"
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
          valueSuffix: ' %',
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
    this.restApiService.getMoistureReadingsBetween(dateRange.beginDate,dateRange.endDate).then(data =>
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
      this.chart.addSeries({name:element.name, data:dataArray} as Highcharts.SeriesColumnOptions, true, false);
    })
  }
}
