import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

import { BehaviorSubject, Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Event } from 'src/app/models/events';
import { CalendarEventsService } from 'src/app/services/calender-events.service';

@Component({
  selector: 'app-day-events',
  templateUrl: './day-events.component.html',
  styleUrls: ['./day-events.component.scss']
})
export class DayEventsComponent implements OnInit, OnDestroy {

  routerSubscription: Subscription;
  idSubscription: Subscription;
  idSource = new BehaviorSubject<string>('');
  events: Event;
  mobileSelectedDate: any;
  mobileQuery: MediaQueryList;

  constructor(private router: ActivatedRoute,
              private calendarEventService: CalendarEventsService,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 724px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  @Input() desktopSelectedDate: any;
  private mobileQueryListener: () => void;
  ngOnInit() {
    if (this.desktopSelectedDate) {
      this.getEvent(this.desktopSelectedDate)
        .subscribe(event => this.events = event);
    } else {
      this.routerSubscription = this.router.params
        .subscribe(params => {
          this.mobileSelectedDate = params.selectedDate.replace(/\d+% ?/g, '');
          this.idSource.next(this.mobileSelectedDate);
        });
      this.idSubscription = this.idSource
        .pipe(mergeMap(selectedDay => {
          console.log(selectedDay);
          return this.getEvent(selectedDay);
        }))
        .subscribe(event => this.events = event);
    }
  }

  getEvent(selectedDate: any) {
    const date = new Date(selectedDate);
    const startTime = date.toISOString();
    return this.calendarEventService.getEvent(startTime);
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
    this.idSubscription.unsubscribe();
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
}
