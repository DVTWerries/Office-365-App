import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CalendarEventsService } from 'src/app/services/calender-events.service';
import { mergeMap } from 'rxjs/operators';
import { Event } from 'src/app/models/events';
import { MediaMatcher } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';

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
  selectedDate: any;
  mobileQuery: MediaQueryList;

  constructor(private router: ActivatedRoute,
              private calendarEventService: CalendarEventsService,
              private datePipe: DatePipe,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 724px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  private mobileQueryListener: () => void;
  ngOnInit() {
    this.routerSubscription = this.router.params
      .subscribe(params => {
        this.selectedDate = params.selectedDate.replace(/\d+% ?/g, '');
        this.idSource.next(this.selectedDate);
      });

    this.idSubscription = this.idSource
      .pipe(mergeMap(selectedDay => {
        const day = this.datePipe.transform(selectedDay, 'yyyy-MM-ddTHH:mm:ss.sss');
        return this.calendarEventService.getEvent(day);
      }))
      .subscribe(event => this.events = event);
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
    this.idSubscription.unsubscribe();
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
}
