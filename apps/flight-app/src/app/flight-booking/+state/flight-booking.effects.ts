import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom, catchError, delay } from 'rxjs/operators';
import * as FlightBookingActions from './flight-booking.actions';
import { FlightService } from '@flight-workspace/flight-api';
import { Store } from '@ngrx/store';
import { FlightBookingAppState, flightBookingFeatureKey } from './flight-booking.reducer';
import { of } from 'rxjs';

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
  
  saveFlight$ = createEffect(() => 
    this.actions$.pipe(
      ofType(FlightBookingActions.saveFlight),
      withLatestFrom(this.store.select(s => s[flightBookingFeatureKey].current)),
      switchMap( ([a, current]) => this.flightService.save(current, a.urgent)),
      map(flight => FlightBookingActions.flightSaved({ flight })),
      catchError(resp => of(FlightBookingActions.saveFlightError({ message: resp.message }))),
      delay(7000)
    ));


  constructor(
    private actions$: Actions,
    private store: Store<FlightBookingAppState>,
    private flightService: FlightService) {}

}
