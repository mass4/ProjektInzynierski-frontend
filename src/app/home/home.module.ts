import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { ChartModule } from 'angular-highcharts';
import { GraphModule } from '../graph/graph.module';
import { OutputGraphComponent } from '../output-graph/output-graph.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, HeaderComponent, BodyComponent, OutputGraphComponent],
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
