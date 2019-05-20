import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Event } from 'src/app/models/events';
import { CalendarEventsService } from 'src/app/services/calender-events.service';
import { MatDialog } from '@angular/material';
import { FormDailogComponent } from '../form-dailog/form-dailog.component';

@Component({
  selector: 'app-day-events',
  templateUrl: './day-events.component.html',
  styleUrls: ['./day-events.component.scss']
})
export class DayEventsComponent implements OnInit, OnDestroy, OnChanges {

  eventSource = new BehaviorSubject<string>('');
  selectedDateSource = new BehaviorSubject<string>('');
  events: Event;
  mobileSelectedDate: any;
  mobileQuery: MediaQueryList;
  noEvent: boolean;
  event: Event;

  constructor(public dialog: MatDialog,
              private router: ActivatedRoute,
              private calendarEventService: CalendarEventsService,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 1024px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.noEvent = true;
  }

  @Input() desktopSelectedDate: any;
  private mobileQueryListener: () => void;
  ngOnInit() {
    if (this.desktopSelectedDate) {
      this.getEvent(this.desktopSelectedDate)
      .subscribe(event => {
        this.events = event;
        this.checkLoadedEvents();
      });
    } else {
      this.router.params
        .subscribe(params => {
          this.mobileSelectedDate = params.selectedDate.replace(/\d+% ?/g, '');
          this.eventSource.next(this.mobileSelectedDate);
        });
      this.eventSource
        .pipe(mergeMap(selectedDay => {
          return this.getEvent(selectedDay);
        }))
        .subscribe(event => {
          this.events = event;
          this.checkLoadedEvents();
        });
    }
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (!changes.desktopSelectedDate.firstChange) {
      this.getEvent(changes.desktopSelectedDate.currentValue).subscribe(event => {
        this.events = event;
        this.checkLoadedEvents();
      });
    }
  }

  checkLoadedEvents() {
    if (this.events.id === null || this.events.id === undefined) {
      this.noEvent = true;
    } else {
      this.noEvent = false;
    }
  }

  getEvent(selectedDate: any) {
    const date = new Date(selectedDate);
    const startTime = date.toISOString();
    return this.calendarEventService.getEvent(startTime);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FormDailogComponent, {
      width: '500px',
      data: this.event
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.event = result;
      console.log(this.event);
      //this.events = result;
    });
  }
}
