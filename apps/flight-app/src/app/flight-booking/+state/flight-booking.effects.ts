import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom, catchError, delay } from 'rxjs/operators';
import * as FlightBookingActions from './flight-booking.actions';
import { FlightService } from '@flight-workspace/flight-api';
import { Store } from '@ngrx/store';
import { FlightBookingAppState, toFlight } from './flight-booking.reducer';
import { of } from 'rxjs';
import { normalizeFlight, normalizeFlights } from './flight-booking.schema';
import { selectCurrentFlight } from './flight-booking.selectors';

@Injectable()
export class FlightBookingEffects {

  loadFlights$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(FlightBookingActions.loadFlights),
      switchMap(a => this.flightService.find(a.from, a.to, a.urgent)),
      map(flights => FlightBookingActions.flightsLoaded({ result: normalizeFlights(flights) })))
    });

  loadFlight$ = createEffect(() => 
    this.actions$.pipe(
      ofType(FlightBookingActions.loadFlight),
      switchMap(a => this.flightService.findById(a.id)),
      map(flight => FlightBookingActions.flightLoaded({ result: normalizeFlight(flight) })),
      delay(5000)
    ));
  
  saveFlight$ = createEffect(() => 
    this.actions$.pipe(
      ofType(FlightBookingActions.saveFlight),
      withLatestFrom(this.store.select(selectCurrentFlight)),
      switchMap( ([a, current]) => this.flightService.save(toFlight(current), a.urgent).pipe(
        map(flight => FlightBookingActions.flightSaved({ flight })),
        catchError(resp => of(FlightBookingActions.saveFlightError({ error: resp.error }))),
      )),
      delay(5000)
    ));
    
  constructor(
    private actions$: Actions,
    private store: Store<FlightBookingAppState>,
    private flightService: FlightService) {}

}
