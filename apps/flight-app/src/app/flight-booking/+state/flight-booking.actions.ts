import { createAction, props } from '@ngrx/store';
import { Flight } from '@flight-workspace/flight-api';

export const flightsLoaded = createAction(
  '[FlightBooking] flightsLoaded',  // Event
  props<{flights: Flight[]}>()
);

export const flightUpdated = createAction(
  '[FlightBooking] flightUpdated',
  props<{flight: Flight}>()
);

export const loadFlights = createAction(
  '[FlightBooking] loadFlights', // Commando
  props<{from: string, to: string, urgent: boolean}>()
);


export const loadFlight = createAction(
  '[FlightBooking] loadFlight', 
  props<{id: string}>()
);

export const flightLoaded = createAction(
  '[FlightBooking] flightLoaded', 
  props<{flight: Flight}>()
);

export const saveFlight = createAction(
  '[FlightBooking] saveFlight',
  props<{ urgent: boolean }>()
);

export const flightSaved = createAction(
  '[FlightBooking] flightSaved', 
  props<{flight: Flight}>()
);

export const saveFlightError = createAction(
  '[FlightBooking] saveFlightError', 
  props<{message: string}>()
);

