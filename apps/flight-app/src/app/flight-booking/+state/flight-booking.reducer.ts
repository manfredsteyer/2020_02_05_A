import { Action, createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from './flight-booking.actions';
import { Flight } from '@flight-workspace/flight-api';
import { flightsLoaded, flightLoaded, flightUpdated, loadFlight } from './flight-booking.actions';

export const flightBookingFeatureKey = 'flightBooking';

export interface FlightBookingAppState {
  [flightBookingFeatureKey]: FlightBookingState;
}

export type FlightState = Flight & {
  flightBookings: number[];
}

export function toFlight(flightState: FlightState): Flight {
  if (!flightState) return null;
  const { flightBookings, ...flight } = flightState;
  return flight;
}

export interface FlightBookingState {
  flightIds: number[];
  flights: { [id: number]: FlightState },
  passengers: { [id: number]: any },
  flightBookings: { [id: number]: any }
  stats: object;
  basket: object;
  blackList: number[];
  error: string;
  success: boolean;
  current: number;
}

export const initialState: FlightBookingState = {
  flightIds: [],
  flights: {},
  passengers: {},
  flightBookings: {},

  error: '',
  success: undefined,
  current: 0,

  stats: {},
  basket: {},
  blackList: [3],
};

const flightBookingReducer = createReducer(
  initialState,

  on(flightsLoaded, (state, action) => {
    const result = action.result;
    return { ...state, ...result };
  }),

  on(flightUpdated, (state, action) => {
    const flight = action.flight;
    const oldFlights = state.flights;

    const flights = { ...oldFlights, [flight.id]: flight };

    return { ...state, flights };
  }),
  
  on(loadFlight, (state, action) => {
    const current = parseInt(action.id, 10);
    return { ...state, current };
  }),

  on(flightLoaded, (state, action) => {
    const result = action.result;
    
    const flights = { ...state.flights, ...result.flights };
    const flightBookings = { ...state.flightBookings, ...result.flightBookings };
    const passengers = { ...state.passengers, ...result.passengers };
    const current = result.flightIds;

    return { ...state, flights, flightBookings, passengers, current };
  }),

  on(FlightBookingActions.saveFlight, (state) => {
    
    // Pessimistic
    // const error = '', success = undefined;
    
    // Optimistic
    const error = '', success = true;
    return { ...state, error, success };
  }),

  on(FlightBookingActions.saveFlightError, (state, action) => {
    const error = action.error, success = false;
    return { ...state, error, success };
  }),

  on(FlightBookingActions.flightSaved, (state) => {
    const error = '', success = true;
    return { ...state, error, success };
  }),

  on(FlightBookingActions.resetFlightError, (state) => {
    const error = '', success = undefined;
    return { ...state, error, success };
  }),

);

export function reducer(state: FlightBookingState | undefined, action: Action) {
  return flightBookingReducer(state, action);
}
