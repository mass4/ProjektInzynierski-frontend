import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShowSensorTemperatureComponent } from './show-sensor-temperature/show-sensor-temperature.component';
import { ShowSensorMoistureComponent } from './show-sensor-moisture/show-sensor-moisture.component';

const routes: Routes = [
  { path:'temperaturesensors', component: ShowSensorTemperatureComponent},
  { path: 'moisturesensors', component: ShowSensorMoistureComponent},
  { path:'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ShowSensorMoistureComponent, ShowSensorTemperatureComponent]
