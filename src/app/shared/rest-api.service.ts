import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Subject } from 'rxjs';
import { SensorReading } from '../SensorReading';
import { DateRange } from '../DateRange';
import { TemperatureSensor } from 'src/app/TemperatureSensor';
import { MoistureSensor } from 'src/app/MoistureSensor';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  //apiURL = 'http://192.168.43.101:9090';
  apiURL = 'http://192.168.0.101:9090/api';
  
  dateRangeChanged = new Subject<DateRange>();
  dateRange: DateRange = new DateRange();

  temperatureSensorChanged = new Subject();
  moistureSensorChanged = new Subject();

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  addDateRange(dateRange: DateRange){
    this.dateRange = dateRange;
    this.dateRangeChanged.next(dateRange);
  }

  changeTemperatureSensor(){
    this.temperatureSensorChanged.next();
  }

  changeMoistureSensor(){
    this.moistureSensorChanged.next();
  }

  getTemperatureReadingsBetween(begin : Date, end: Date) : Promise<Array<SensorReading>>{
    return this.http.get<Array<SensorReading>>(this.apiURL+'/readings/temperature/' + begin+'/'+ end).toPromise();
  }

  getMoistureReadingsBetween(begin : Date, end: Date) : Promise<Array<SensorReading>>{
    return this.http.get<Array<SensorReading>>(this.apiURL+'/readings/moisture/' + begin+'/'+ end).toPromise();
  }

  getTemperatureSensors(){
    return this.http.get<Array<TemperatureSensor>>(this.apiURL+'/sensor/temperature').toPromise();
  }

  getMoistureSensors(){
    return this.http.get<Array<MoistureSensor>>(this.apiURL+'/sensor/moisture').toPromise();
  }

  getDateRange(){
    return this.dateRange;
  }

  addTemperatureSensor(sensor: TemperatureSensor){
    this.http.post(this.apiURL+'/sensor/temperature', sensor).subscribe(
      response => console.log('response', response),
      error => console.log('error', error),
      () => {
        this.changeTemperatureSensor();
        console.log('completed')
      }
    );
  }

  updateTemperatureSensor(sensor: TemperatureSensor){
    this.http.put(this.apiURL+'/sensor/temperature/'+sensor.id, sensor).subscribe(
      response => console.log('response', response),
      error => console.log('error', error),
      () => {
        this.changeTemperatureSensor();
        console.log('completed')
      }
    );
  }

  deleteTemperatureSensor(index: number){
    this.http.delete(this.apiURL+'/sensor/temperature/'+index).subscribe(
      response => console.log('response', response),
      error => console.log('error', error),
      () => {
        this.changeTemperatureSensor();
        console.log('completed')
      }
    );
  }

  addMoistureSensor(sensor: MoistureSensor){
    this.http.post(this.apiURL+'/sensor/moisture', sensor).subscribe(
      response => console.log('response', response),
      error => console.log('error', error),
      () => {
        this.changeMoistureSensor();
        console.log('completed')
      }
    );
  }

  updateMoistureSensor(sensor: MoistureSensor){
    this.http.put(this.apiURL+'/sensor/moisture/'+sensor.id, sensor).subscribe(
      response => console.log('response', response),
      error => console.log('error', error),
      () => {
        this.changeMoistureSensor();
        console.log('completed')
      }
    );
  }

  deleteMoistureSensor(index: number){
    this.http.delete(this.apiURL+'/sensor/moisture/'+index).subscribe(
      response => console.log('response', response),
      error => console.log('error', error),
      () => {
        this.changeMoistureSensor();
        console.log('completed')
      }
    );
  }

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
