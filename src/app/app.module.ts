import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular-highcharts';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
//import { OutputGraphComponent } from './output-graph/output-graph.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeModule } from './home/home.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GraphModule } from './graph/graph.module';
import { FormsModule } from '@angular/forms';
import {ReadingService} from './reading.service'
import { RestApiService } from './shared/rest-api.service';
import { parse } from 'date-fns';
import { SensorComponent } from './sensor/sensor.component';
import { TemperatureComponent } from './sensorForm/temperature/temperature.component';
import { MoistureComponent } from './sensorForm/moisture/moisture.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    //OutputGraphComponent,
    routingComponents,
    SensorComponent,
    TemperatureComponent,
    MoistureComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    ChartModule,
    HttpClientModule,
    HomeModule,
    GraphModule,
    DashboardModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents:[
    TemperatureComponent,
    MoistureComponent
  ],
  providers: [
    ReadingService,
    RestApiService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
