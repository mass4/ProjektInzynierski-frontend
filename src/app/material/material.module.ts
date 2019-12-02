import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatListModule,
  MatTableModule,
  MatCardModule,
  MatExpansionModule
} from '@angular/material';

import {
  MatDialogModule
} from '@angular/material/dialog';

import { 
  MatIconModule 
} from '@angular/material/icon';


import { 
  MatDatepickerModule 
} from '@angular/material/datepicker';

const material = [
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatListModule,
  MatTableModule,
  MatDatepickerModule,
  MatDialogModule,
  MatCardModule,
  MatExpansionModule
]

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
