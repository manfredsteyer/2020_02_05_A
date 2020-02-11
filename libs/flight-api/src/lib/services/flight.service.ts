import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {Flight} from '../models/flight';

@Injectable()
export class FlightService {

  flights: Flight[] = [];
  baseUrl = `https://flight-api-demo.azurewebsites.net/api`;
  //baseUrl = `http://localhost:5000/api`;

  constructor(private http: HttpClient) {
  }

  load(from: string, to: string, urgent: boolean): void {
    const o = this.find(from, to, urgent)
                .subscribe(
                  flights => {
                    this.flights = flights;
                  },
                  err => console.error('Error loading flights', err)
                );
  }

  find(from: string, to: string, urgent: boolean = false): Observable<Flight[]> {

    // For offline access
    // let url = '/assets/data/data.json';

    // For online access
    let url = this.baseUrl + '/flight';

    if (urgent) {
      url = this.baseUrl + '/error?code=403';
    }

    const params = new HttpParams()
      .set('from', from)
      .set('to', to);

    const headers = new HttpHeaders()
      .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});
    
  }

  findById(id: string): Observable<Flight> {
    const params = new HttpParams()
      .set('id', id)
      .set('expand', 'true');

    const url = this.baseUrl + '/flight';
    return this.http.get<Flight>(url, { params });
  }

  save(flight: Flight, urgent = false): Observable<Flight> {
    let url = this.baseUrl + '/flight';

    if (urgent) {
      url = this.baseUrl + '/error?code=403';
    }
    return this.http.post<Flight>(url, flight);
  }

  delay() {
    const ONE_MINUTE = 1000 * 60;

    const oldFlights = this.flights;
    const oldFlight = oldFlights[0];
    const oldDate = new Date(oldFlight.date);

    // Mutable
    oldDate.setTime(oldDate.getTime() + 15 * ONE_MINUTE);
    oldFlight.date = oldDate.toISOString();
  }

}
