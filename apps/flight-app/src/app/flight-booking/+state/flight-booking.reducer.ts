import { Action, createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from './flight-booking.actions';
import { Flight } from '@flight-workspace/flight-api';
import { flightsLoaded } from './flight-booking.actions';
import { mutableOn } from 'ngrx-etc';

export const flightBookingFeatureKey = 'flightBooking';

export interface FlightBookingAppState {
  [flightBookingFeatureKey]: FlightBookingState;
}

export interface FlightBookingState {
  flights: Flight[];
  stats: object;
  basket: object;
  blackList: number[];
}

export const initialState: FlightBookingState = {
  flights: [],
  stats: {},
  basket: {},
  blackList: [3]
};

const flightBookingReducer = createReducer(
  initialState,

  mutableOn(flightsLoaded, (state, action) => {
    const flights = action.flights;
    state.flights = flights;
  }),

  mutableOn(FlightBookingActions.flightUpdated, (state, action) => {
    const flight = action.flight;
    
    const oldFlights = state.flights;
    const flights = oldFlights.map(f => f.id === flight.id ? flight : f);

    state.flights = flights;
  }),

);

export function reducer(state: FlightBookingState | undefined, action: Action) {
  return flightBookingReducer(state, action);
}
