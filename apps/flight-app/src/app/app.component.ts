import {Component} from '@angular/core';
import { schema, normalize, denormalize } from 'normalizr';
import { Flight } from '@flight-workspace/flight-api';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() { 
  }
}


const data = {
  "id": 1,
  "from": "Hamburg",
  "to": "Graz",
  "date": "2020-03-01T21:36:42.1297219+01:00",
  "delayed": false,
  "flightBookings": [
    {
      "id": 1,
      "passengerId": 1,
      "flightId": 1,
      "bookingDate": "2020-02-05T21:36:42.1332877+01:00",
      "flightClass": 2,
      "seat": "1D",
      "passenger": {
        "id": 1,
        "name": "Muster",
        "firstName": "Max",
        "bonusMiles": 20000,
        "passengerStatus": "A",
        "flightBookings": []
      }
    },
    {
      "id": 2,
      "passengerId": 2,
      "flightId": 1,
      "bookingDate": "2020-02-07T21:36:42.1334179+01:00",
      "flightClass": 2,
      "seat": "1F",
      "passenger": {
        "id": 2,
        "name": "Susi",
        "firstName": "Sorglos",
        "bonusMiles": 21000,
        "passengerStatus": "A",
        "flightBookings": []
      }
    }
  ]
}

const passenger = new schema.Entity('passengers');
const flightBooking = new schema.Entity('flightBookings', {
  passenger: passenger
});
const flight = new schema.Entity<Flight>('flights', {
  flightBookings: [flightBooking]
});

const normalized = normalize(data, flight);

const denormalized = denormalize(normalized.result, flight, normalized.entities);
debugger;
