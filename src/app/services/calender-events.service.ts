import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Event } from '../models/events';
import { ODataResponse } from '../models/ODataResponse';


const baseUrl = 'https://graph.microsoft.com/v1.0';

@Injectable({
  providedIn: 'root'
})
export class CalenderEventsService {

  constructor(private http: HttpClient) { }

  getCalenderEvents(): Observable<Event[]> {
    return this.http.get<ODataResponse<Event>>(`${baseUrl}/me/events?$select=subject,organizer,attendees,start,end,location`).pipe(
      map(x => x.value)
    );
  }
}
