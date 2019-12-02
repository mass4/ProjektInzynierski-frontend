import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { Chart } from 'angular-highcharts';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { seriesType } from 'highcharts';

export interface SensorReading{
  name:string,
  readings:Array<SingleReading>

}

export interface SingleReading{
  value:number,
  date:Date
}

@Component({
  selector: 'app-output-graph',
  templateUrl: './output-graph.component.html',
  styleUrls: ['./output-graph.component.scss']
})
export class OutputGraphComponent implements OnInit {
  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Wykres Temperatury'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Line 1',
        data: [1, 2, 3]
      } as Highcharts.SeriesColumnOptions
    ]
  });

  constructor(private httpClient:HttpClient ) {}
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
      series: [
        {
          name: 'Line 1',
          data: [1, 2, 3]
        } as Highcharts.SeriesColumnOptions
      ]
    });
  }
  ngOnInit(){  
    this.initializeMyReadings();
  }

  initializeMyReadings(){
    this.chart.destroy();
    this.createChart();
    this.httpClient.get<Array<SensorReading>>("http://localhost:8080/readings/temperature").subscribe((xxx : Array<SensorReading>) => 
    {
      console.log(xxx);
      xxx.forEach(element => {
        var yValues = new Array();
        element.readings.forEach(reading => {
          yValues.push(reading.value)
        });
        this.chart.addSeries({name:element.name, data:yValues} as Highcharts.SeriesColumnOptions, true, false)
      });
    }, (error) => 
    {
      console.log("coś poszło nie tak z ściaganiem danych");
    })
  }

  getReadingsBetween(){
    //TO DO
    console.log("getReadingsBetween() --- TO DO")
  }

  add() {
    this.chart.destroy();
    this.createChart();
    this.httpClient.get<Array<SensorReading>>("http://localhost:8080/readings/temperature").subscribe((xxx : Array<SensorReading>) => 
    {
      console.log(xxx);
      xxx.forEach(element => {
        var yValues = new Array();
        element.readings.forEach(reading => {
          yValues.push(reading.value)
        });
        this.chart.addSeries({name:element.name, data:yValues} as Highcharts.SeriesColumnOptions, true, false)
      });
    }, (error) => 
    {
      console.log("coś poszło nie tak z ściaganiem danych");
    })

    this.chart.addPoint(Math.floor(Math.random() * 10));
  }
  addSeries()
  {
    this.chart.addSeries({name:'line2', data: [0.2,0.3,0.5,0.8]} as Highcharts.SeriesColumnOptions, true, false);


  }
}