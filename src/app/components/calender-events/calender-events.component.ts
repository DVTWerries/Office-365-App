import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { CalenderEventsService } from 'src/app/services/calender-events.service';
import { Event } from 'src/app/models/events';

@Component({
  selector: 'app-calender-events',
  templateUrl: './calender-events.component.html',
  styleUrls: ['./calender-events.component.scss']
})
export class CalenderEventsComponent implements OnInit {

  calendarEvents: Event[];
  spinner: boolean;

  constructor(private calendarEventsApi: CalenderEventsService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'event',
      sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-event-24px.svg'));
    iconRegistry.addSvgIcon(
      'location',
      sanitizer.bypassSecurityTrustResourceUrl('assets/67347.svg'));
    iconRegistry.addSvgIcon(
      'start-date',
      sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-access_time-24px.svg'));
    iconRegistry.addSvgIcon(
      'end-date',
      sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-timer-24px.svg'));
  }

  ngOnInit() {
    this.spinner = true;
    this.calendarEventsApi.getCalenderEvents().subscribe(
      calendarEvents => {
      this.calendarEvents = calendarEvents;
    },
    error => this.spinner = true,
    () => this.spinner = false);
  }

}
