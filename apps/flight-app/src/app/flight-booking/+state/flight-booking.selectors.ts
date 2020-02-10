import { flightBookingFeatureKey, FlightBookingAppState, FlightBookingState } from "./flight-booking.reducer";
import { createSelector, createFeatureSelector } from '@ngrx/store';

// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import * as fromFlightBooking from './flight-booking.reducer';

// export const selectFlightBookingState = createFeatureSelector<fromFlightBooking.State>(
//   fromFlightBooking.flightBookingFeatureKey
// );



// export const selectFlights = 
//   (appState: FlightBookingAppState) => appState[flightBookingFeatureKey].flights;

// export const selectFlights2 = createSelector(
//   (appState: FlightBookingAppState) => appState[flightBookingFeatureKey].flights,
//   flights => flights);

// export const selectFlightsFiltered = createSelector(
//     (appState: FlightBookingAppState) => appState[flightBookingFeatureKey].flights,
//     (appState: FlightBookingAppState) => appState[flightBookingFeatureKey].blackList,
//     (flights, blackList) => flights.filter(f => !blackList.includes(f.id))
// );
  
export const selectFlightBooking = 
  createFeatureSelector<FlightBookingState>(flightBookingFeatureKey);

// export const selectFlights3 = createSelector(
//   selectFlightBooking,
//   fb => fb.flights);


// export const selectFlightBooking = 
//   createFeatureSelector<FlightBookingState>(flightBookingFeatureKey);


export const selectFlights = createSelector(
  (s: FlightBookingAppState) => s[flightBookingFeatureKey].flights,
  (s: FlightBookingAppState) => s[flightBookingFeatureKey].flightIds,
  (flights, ids) => ids.map(id => flights[id])
);