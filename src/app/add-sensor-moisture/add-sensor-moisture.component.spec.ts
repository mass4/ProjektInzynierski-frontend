import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSensorMoistureComponent } from './add-sensor-moisture.component';

describe('AddSensorMoistureComponent', () => {
  let component: AddSensorMoistureComponent;
  let fixture: ComponentFixture<AddSensorMoistureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSensorMoistureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSensorMoistureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
