import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSensorTemperatureComponent } from './add-sensor-temperature.component';

describe('AddSensorTemperatureComponent', () => {
  let component: AddSensorTemperatureComponent;
  let fixture: ComponentFixture<AddSensorTemperatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSensorTemperatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSensorTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
