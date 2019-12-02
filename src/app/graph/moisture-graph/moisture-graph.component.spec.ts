import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoistureGraphComponent } from './moisture-graph.component';

describe('MoistureGraphComponent', () => {
  let component: MoistureGraphComponent;
  let fixture: ComponentFixture<MoistureGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoistureGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoistureGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
