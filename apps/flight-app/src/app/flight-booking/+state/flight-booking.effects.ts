import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import * as FlightBookingActions from './flight-booking.actions';
import { FlightService } from '@flight-workspace/flight-api';

@Injectable()
export class FlightBookingEffects {

  loadFlightBookings$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(FlightBookingActions.loadFlights),
      switchMap(a => this.flightService.find(a.from, a.to, a.urgent)),
      map(flights => FlightBookingActions.flightsLoaded({flights}))
      );
  });

  loadFlight$ = createEffect(() => 
    this.actions$.pipe(
      ofType(FlightBookingActions.loadFlight),
      switchMap(a => this.flightService.findById(a.id)),
      map(flight => FlightBookingActions.flightLoaded({ flight }))
    ));


  constructor(
    private actions$: Actions,
    private flightService: FlightService) {}

}
