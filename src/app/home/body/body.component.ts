import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  myDateRange: myDateRange = new myDateRange();
  dateForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dateForm = this.formBuilder.group({
      'startDate': [this.myDateRange.startDate,[

      ]],
      'endDate': [this.myDateRange.endDate,[

      ]]
    });

    
  }

  onDateFormSubmit(){
    console.log(this.myDateRange.startDate);
    console.log(this.myDateRange.endDate);
    //TO DO
  }
}

class myDateRange{
  public startDate: Date;
  public endDate: Date;
  constructor(){
    this.startDate = new Date();
    this.endDate = new Date();
  }
}
