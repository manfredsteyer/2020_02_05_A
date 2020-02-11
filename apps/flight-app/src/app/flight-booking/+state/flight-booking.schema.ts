import { Flight } from '@flight-workspace/flight-api';
import { NormalizedFlights } from './flight-booking.actions';
import { schema, normalize } from 'normalizr';

export const passengerSchema = new schema.Entity('passengers');

export const flightBookingSchema = new schema.Entity('flightBookings', {
  passenger: passengerSchema
});

export const flightSchema = new schema.Entity<Flight>('flights', {
  flightBookings: [flightBookingSchema]
});

export function normalizeFlights(denormalized: Flight[]): NormalizedFlights {
    const entities = normalize(denormalized, [flightSchema]);
    const flights = entities.entities.flights;
    const passengers = entities.entities.passengers;
    const flightBookings = entities.entities.flightBookings;
    const flightIds = entities.result;

    return { flights, passengers, flightBookings, flightIds };
}

export function normalizeFlight(denormalized: Flight): NormalizedFlights {
    const entities = normalize(denormalized, flightSchema);
    const flights = entities.entities.flights;
    const passengers = entities.entities.passengers;
    const flightBookings = entities.entities.flightBookings;
    const flightIds = entities.result;

    return { flights, passengers, flightBookings, flightIds };
}

// const data = {
//     "id": 1,
//     "from": "Hamburg",
//     "to": "Graz",
//     "date": "2020-03-01T21:36:42.1297219+01:00",
//     "delayed": false,
//     "flightBookings": [
//       {
//         "id": 1,
//         "passengerId": 1,
//         "flightId": 1,
//         "bookingDate": "2020-02-05T21:36:42.1332877+01:00",
//         "flightClass": 2,
//         "seat": "1D",
//         "passenger": {
//           "id": 1,
//           "name": "Muster",
//           "firstName": "Max",
//           "bonusMiles": 20000,
//           "passengerStatus": "A",
//           "flightBookings": []
//         }
//       },
//       {
//         "id": 2,
//         "passengerId": 2,
//         "flightId": 1,
//         "bookingDate": "2020-02-07T21:36:42.1334179+01:00",
//         "flightClass": 2,
//         "seat": "1F",
//         "passenger": {
//           "id": 2,
//           "name": "Susi",
//           "firstName": "Sorglos",
//           "bonusMiles": 21000,
//           "passengerStatus": "A",
//           "flightBookings": []
//         }
//       }
//     ]
//   };
    
// const normalized = normalize(data, flightSchema);

// const denormalized = denormalize(normalized.result, flight, normalized.entities);

