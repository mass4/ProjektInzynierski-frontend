import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSensorMoistureComponent } from './show-sensor-moisture.component';

describe('ShowSensorMoistureComponent', () => {
  let component: ShowSensorMoistureComponent;
  let fixture: ComponentFixture<ShowSensorMoistureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSensorMoistureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSensorMoistureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
