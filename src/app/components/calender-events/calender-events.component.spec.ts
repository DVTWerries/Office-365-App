import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderEventsComponent } from './calender-events.component';

describe('CalenderEventsComponent', () => {
  let component: CalenderEventsComponent;
  let fixture: ComponentFixture<CalenderEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalenderEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
