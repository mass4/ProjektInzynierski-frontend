import { Injectable } from '@angular/core';
import { SensorReading } from './SensorReading';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DateRange } from './DateRange';

@Injectable({
  providedIn: 'root'
})
export class ReadingService {

  constructor(private httpClient:HttpClient) { }

  sensorReadings: SensorReading[];
  dateRangeChanged = new Subject<DateRange>();
  dateRange: DateRange;

  getTemperatureReadingsFromDateToDate(begin : Date, end: Date) : Promise<Array<SensorReading>>{
    return this.httpClient.get<Array<SensorReading>>('http://localhost:8080/readings/temperature/' + begin+'/'+ end).toPromise();
  }

  getAllTemperatureReadings() : Promise<Array<SensorReading>>
  {
    return this.httpClient.get<Array<SensorReading>>("http://localhost:8080/readings/temperature").toPromise();
  }

  getDateRange(){
    return this.dateRange;
  }

  setDateRange(begin : Date, end : Date){
    this.dateRange.beginDate = begin;
    this.dateRange.endDate = end;
    this.dateRangeChanged.next();
  }

}
