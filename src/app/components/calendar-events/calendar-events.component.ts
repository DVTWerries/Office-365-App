import { Component, OnInit } from '@angular/core';

import { CalendarEventsService } from 'src/app/services/calender-events.service';
import { Event } from 'src/app/models/events';

@Component({
  selector: 'app-calendar-events',
  templateUrl: './calendar-events.component.html',
  styleUrls: ['./calendar-events.component.scss']
})
export class CalendarEventsComponent implements OnInit {

  calendarEvents: Event[];
  spinner: boolean;

  constructor(private calendarEventsApi: CalendarEventsService) {}

  ngOnInit() {
    this.spinner = true;
    this.calendarEventsApi.getCalenderEvents()
    .subscribe(
      calendarEvents => {
      this.calendarEvents = calendarEvents;
    },
    error => this.spinner = true,
    () => this.spinner = false);
  }

}
