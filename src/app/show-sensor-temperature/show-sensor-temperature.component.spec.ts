import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSensorTemperatureComponent } from './show-sensor-temperature.component';

describe('ShowSensorTemperatureComponent', () => {
  let component: ShowSensorTemperatureComponent;
  let fixture: ComponentFixture<ShowSensorTemperatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSensorTemperatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSensorTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
