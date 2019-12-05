import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../material/material.module';
import { BodyComponent } from './body/body.component';
import { ChartModule } from 'angular-highcharts';
import { GraphModule } from '../graph/graph.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, BodyComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ChartModule,
    GraphModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
