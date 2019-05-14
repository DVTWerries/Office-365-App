import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

import { CalendarEventsService } from 'src/app/services/calender-events.service';
import { Event } from 'src/app/models/events';

@Component({
  selector: 'app-calendar-events',
  templateUrl: './calendar-events.component.html',
  styleUrls: ['./calendar-events.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarEventsComponent implements OnInit, OnDestroy {

  calendarEvents: Event;
  spinner: boolean;
  mobileQuery: MediaQueryList;
  selectedDate: Date;
  hideCalendar = false;

  constructor(private calendarEventsApi: CalendarEventsService,
              private router: Router,
              private datePipe: DatePipe,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 724px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  private mobileQueryListener: () => void;

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

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  dateClass = (d: Date) => {
    const date = d.getDate();

    // Highlight the 1st and 20th day of each month.
    return (date === 1 || date === 20) ? 'example-custom-date-class' : undefined;
  }

  checkForMobile() {
    if (this.mobileQuery.matches) {
      this.hideCalendar = true;
    } else {
      this.hideCalendar = false;
    }
  }

  getSelectedDate(event) {
    this.selectedDate = event as Date;
    this.checkForMobile();
    if (this.mobileQuery.matches) {
      this.router.navigate(['/calendar-events', this.selectedDate.toString() ]);
    }
  }
}
