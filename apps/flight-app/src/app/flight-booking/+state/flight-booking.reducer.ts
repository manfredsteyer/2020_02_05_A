import { Action, createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from './flight-booking.actions';
import { Flight } from '@flight-workspace/flight-api';
import { flightsLoaded, flightLoaded, flightUpdated, loadFlight } from './flight-booking.actions';
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
  current: Flight;
}

export const initialState: FlightBookingState = {
  flights: [],
  stats: {},
  basket: {},
  blackList: [3],
  current: {} as Flight
};

const flightBookingReducer = createReducer(
  initialState,

  mutableOn(flightsLoaded, (state, action) => {
    const flights = action.flights;
    state.flights = flights;
  }),

  on(flightUpdated, (state, action) => {
    const flight = action.flight;
    const oldFlights = state.flights;
    
    const exists = oldFlights.find(f => f.id === flight.id);

    const flights =
      exists ? 
      oldFlights.map(f => f.id === flight.id ? flight : f) :
      [...oldFlights, flight];

    return { ...state, flights };
  }),
  
  on(loadFlight, (state, action) => {
    const current = state.flights.find(f => f.id === parseInt(action.id, 10));
    debugger;
    return { ...state, current };
  }),

  on(flightLoaded, (state, action) => {
    const current = action.flight;
    return { ...state, current };
  }),

  // on(flightLoaded, (state, action) => {
  //   const flight = action.flight;


  // }),

);

export function reducer(state: FlightBookingState | undefined, action: Action) {
  return flightBookingReducer(state, action);
}
