import { TestBed } from '@angular/core/testing';

import { CalendarEventsService } from './calender-events.service';

describe('CalenderEventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalendarEventsService = TestBed.get(CalendarEventsService);
    expect(service).toBeTruthy();
  });
});
