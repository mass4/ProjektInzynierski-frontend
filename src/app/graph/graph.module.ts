import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'angular-highcharts';
import { GraphComponent } from '../graph/graph.component';
import { TemperatureGraphComponent } from './temperature-graph/temperature-graph.component';
import { MoistureGraphComponent } from './moisture-graph/moisture-graph.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [GraphComponent ,TemperatureGraphComponent, MoistureGraphComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ChartModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    GraphComponent
  ]
})
export class GraphModule { }
