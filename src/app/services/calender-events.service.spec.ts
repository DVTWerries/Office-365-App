import { TestBed } from '@angular/core/testing';

import { CalenderEventsService } from './calender-events.service';

describe('CalenderEventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalenderEventsService = TestBed.get(CalenderEventsService);
    expect(service).toBeTruthy();
  });
});
