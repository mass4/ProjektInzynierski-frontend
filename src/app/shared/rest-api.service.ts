import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { SensorReading } from '../SensorReading';
import { retry, catchError } from 'rxjs/operators';
import { DateRange } from '../DateRange';
import { TemperatureSensor } from 'src/app/TemperatureSensor';
import { MoistureSensor } from 'src/app/MoistureSensor';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiURL = 'http://localhost:8080';
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
    return this.http.get<Array<SensorReading>>('http://localhost:8080/readings/temperature/' + begin+'/'+ end).toPromise();
  }

  getMoistureReadingsBetween(begin : Date, end: Date) : Promise<Array<SensorReading>>{
    return this.http.get<Array<SensorReading>>('http://localhost:8080/readings/moisture/' + begin+'/'+ end).toPromise();
  }

  getTemperatureSensors(){
    return this.http.get<Array<TemperatureSensor>>("http://localhost:8080/sensor/temperature").toPromise();
  }

  getMoistureSensors(){
    return this.http.get<Array<MoistureSensor>>("http://localhost:8080/sensor/moisture").toPromise();
  }

  getDateRange(){
    return this.dateRange;
  }

  addTemperatureSensor(sensor: TemperatureSensor){
    this.http.post('http://localhost:8080/sensor/temperature', sensor).subscribe(
      response => console.log('poprawnie przeslano', response),
      error => console.log('error', error),
      () => {
        this.changeTemperatureSensor();
        console.log('completed')
      }
    );
  }

  updateTemperatureSensor(sensor: TemperatureSensor){
    this.http.put('http://localhost:8080/sensor/temperature/'+sensor.id, sensor).subscribe(
      response => console.log('poprawnie przeslano', response),
      error => console.log('error', error),
      () => {
        this.changeTemperatureSensor();
        console.log('completed')
      }
    );
  }

  deleteTemperatureSensor(index: number){
    this.http.delete('http://localhost:8080/sensor/temperature/'+index).subscribe(
      response => console.log('poprawnie przeslano', response),
      error => console.log('error', error),
      () => {
        this.changeTemperatureSensor();
        console.log('completed')
      }
    );
  }

  addMoistureSensor(sensor: MoistureSensor){
    this.http.post('http://localhost:8080/sensor/moisture', sensor).subscribe(
      response => console.log('poprawnie przeslano', response),
      error => console.log('error', error),
      () => {
        this.changeMoistureSensor();
        console.log('completed')
      }
    );
  }

  updateMoistureSensor(sensor: MoistureSensor){
    this.http.put('http://localhost:8080/sensor/moisture/'+sensor.id, sensor).subscribe(
      response => console.log('poprawnie przeslano', response),
      error => console.log('error', error),
      () => {
        this.changeMoistureSensor();
        console.log('completed')
      }
    );
  }

  deleteMoistureSensor(index: number){
    this.http.delete('http://localhost:8080/sensor/moisture/'+index).subscribe(
      response => console.log('poprawnie przeslano', response),
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
