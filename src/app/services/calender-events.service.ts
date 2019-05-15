import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Event } from '../models/events';
import { ODataResponse } from '../models/odataResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventsService {

  constructor(private http: HttpClient) { }

  getCalenderEvents(): Observable<Event> {
    return this.http.get<ODataResponse<Event>>(`${environment.baseUrl}/me/events?$select=subject,organizer,attendees,start,end,location`)
    .pipe(map(x => x.value));
  }

  getEvent(day: any): Observable<Event> {
    const selectedDay = new Date(day);
    const nextDate = new Date(day);
    nextDate.setDate(selectedDay.getDate() + 1);
    return this.http.get<ODataResponse<Event>>(`
        ${environment.baseUrl}/me/calendarview?startdatetime=${day}&enddatetime=${nextDate.toISOString()}
    `)
    .pipe(map(x => x.value));
  }
}
