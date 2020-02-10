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
  flightIds: number[];
  flights: { [id: number]: Flight },
  passengers: { [id: number]: any },
  flightBookings: { [id: number]: any }
  stats: object;
  basket: object;
  blackList: number[];
  error: string;
  success: boolean;
  current: Flight;
}

export const initialState: FlightBookingState = {
  flightIds: [],
  flights: {},
  passengers: {},
  flightBookings: {},

  error: '',
  success: undefined,
  current: {} as Flight,

  stats: {},
  basket: {},
  blackList: [3],
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

    const flights = { ...oldFlights, [flight.id]: flight };

    return { ...state, flights };
  }),
  
  on(loadFlight, (state, action) => {
    const current = state.flights[action.id];
    return { ...state, current };
  }),

  on(flightLoaded, (state, action) => {
    const current = action.flight;
    return { ...state, current };
  }),

  on(FlightBookingActions.saveFlight, (state) => {
    
    // Pessimistic
    // const error = '', success = undefined;
    
    // Optimistic
    const error = '', success = true;

    return { ...state, error, success };
  }),

  on(FlightBookingActions.saveFlightError, (state, action) => {
    const error = action.message, success = false;
    return { ...state, error, success };
  }),

  on(FlightBookingActions.flightSaved, (state) => {
    const error = '', success = true;
    return { ...state, error, success };
  }),


);

export function reducer(state: FlightBookingState | undefined, action: Action) {
  return flightBookingReducer(state, action);
}
