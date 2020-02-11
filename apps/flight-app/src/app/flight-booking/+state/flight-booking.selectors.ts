import { flightBookingFeatureKey, FlightBookingAppState, toFlight } from "./flight-booking.reducer";
import { createSelector } from '@ngrx/store';
import { Flight } from '@flight-workspace/flight-api';
import { Passenger } from '../../passengers/passenger.model';

export const selectFlights = createSelector(
  (s: FlightBookingAppState) => s[flightBookingFeatureKey].flights,
  (s: FlightBookingAppState) => s[flightBookingFeatureKey].flightIds,
  (flights, ids) => ids.map(id => flights[id])
);

export const selectCurrentFlight = createSelector(
  (s: FlightBookingAppState) => s[flightBookingFeatureKey].flights,
  (s: FlightBookingAppState) => s[flightBookingFeatureKey].current,
  (flights, current) => flights[current]
);

export type FlightWithPassengers = Flight & {
  passengers: Passenger[];
}

// This selector navigates from the flight via flightBookings to the passengers
// to return a FlightWithPassengers object
export const selectCurrentFlightWithPassengers = createSelector(
  (s: FlightBookingAppState) => s[flightBookingFeatureKey].flights,
  (s: FlightBookingAppState) => s[flightBookingFeatureKey].flightBookings,
  (s: FlightBookingAppState) => s[flightBookingFeatureKey].passengers,
  (s: FlightBookingAppState) => s[flightBookingFeatureKey].current,
  (flightsState, flightBookingsState, passengersState, id): FlightWithPassengers => {
    const flightState = flightsState[id];
    let passengers;

    // Get passengers for flight (via flightBookings)
    if (flightState) {
      const flightBookings = flightState.flightBookings.map(fbId => flightBookingsState[fbId]);
      passengers = flightBookings.map(booking => passengersState[booking.passenger]);
    }

    return {...toFlight(flightState), passengers };
  }
);

