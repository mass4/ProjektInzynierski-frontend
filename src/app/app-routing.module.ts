import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddSensorMoistureComponent} from './add-sensor-moisture/add-sensor-moisture.component';
import {OutputGraphComponent} from './output-graph/output-graph.component';
import { HomeComponent } from './home/home.component';
import { AddSensorTemperatureComponent } from './add-sensor-temperature/add-sensor-temperature.component';
import { ShowSensorTemperatureComponent } from './show-sensor-temperature/show-sensor-temperature.component';
import { ShowSensorMoistureComponent } from './show-sensor-moisture/show-sensor-moisture.component';

const routes: Routes = [
  { path:'addsensormoisture', component: AddSensorMoistureComponent },
  { path:'addsensortemperature', component: AddSensorTemperatureComponent },
  { path:'temperaturesensors', component: ShowSensorTemperatureComponent},
  { path: 'moisturesensors', component: ShowSensorMoistureComponent},
  { path:'graph', component: OutputGraphComponent},
  { path:'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AddSensorMoistureComponent, AddSensorTemperatureComponent, ShowSensorMoistureComponent, ShowSensorTemperatureComponent]
