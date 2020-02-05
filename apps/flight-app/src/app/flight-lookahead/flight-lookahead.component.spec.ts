import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightLookaheadComponent } from './flight-lookahead.component';

describe('FlightLookaheadComponent', () => {
  let component: FlightLookaheadComponent;
  let fixture: ComponentFixture<FlightLookaheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightLookaheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightLookaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
