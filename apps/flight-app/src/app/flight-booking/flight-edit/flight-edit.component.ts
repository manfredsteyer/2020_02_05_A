import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { FlightBookingAppState, flightBookingFeatureKey } from '../+state/flight-booking.reducer';
import { Store } from '@ngrx/store';
import { loadFlight, saveFlight, resetFlightError } from '../+state/flight-booking.actions';
import { selectCurrentFlightWithPassengers } from '../+state/flight-booking.selectors';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css']
})
export class FlightEditComponent implements OnInit, OnDestroy {
  id: string;
  showDetails: string;
  showWarning = false;
  urgent = false;

  flight$ = this.store.select(selectCurrentFlightWithPassengers);
  success$ = this.store.select(s => s[flightBookingFeatureKey].success);
  error$ = this.store.select(s => s[flightBookingFeatureKey].error);

  constructor(
    private route: ActivatedRoute,
    private store: Store<FlightBookingAppState>
    ) {
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.id = p['id'];
      this.showDetails = p['showDetails'];

      this.store.dispatch(loadFlight({ id: this.id }));
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetFlightError());
  }

  save() {
    const urgent = this.urgent;
    this.store.dispatch(saveFlight({ urgent }));
  }

}
