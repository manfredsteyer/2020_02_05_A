import {Component, OnInit} from '@angular/core';
import {FlightService, Flight} from '@flight-workspace/flight-api';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FlightBookingAppState, flightBookingFeatureKey } from '../+state/flight-booking.reducer';
import { flightsLoaded, loadFlights, flightUpdated } from '../+state/flight-booking.actions';
import { selectFlights } from '../+state/flight-booking.selectors';
import { first } from 'rxjs/operators';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  // deprecated
  get flights() {
    return []
  }

  flights$ = this.store.select(selectFlights);

  // "shopping basket" with selected flights
  basket: object = {
    "3": true,
    "5": true
  };

  constructor(
    private store: Store<FlightBookingAppState>,
    private flightService: FlightService
    ) {
  }

  ngOnInit() {
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.store.dispatch(loadFlights({from: this.from, to: this.to, urgent: this.urgent}));

  }

  delay(): void {
   
    this.flights$.pipe(first()).subscribe(flights => {
      const oldFlight = flights[0];
      const flight = { ...oldFlight, date: new Date().toISOString() }
      this.store.dispatch(flightUpdated({flight}));
    })
  }

}
