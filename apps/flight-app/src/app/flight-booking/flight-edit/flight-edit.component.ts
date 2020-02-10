import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { pluck, switchMap, map } from 'rxjs/operators';
import { FlightBookingAppState, flightBookingFeatureKey } from '../+state/flight-booking.reducer';
import { Store } from '@ngrx/store';
import { loadFlight, saveFlight } from '../+state/flight-booking.actions';
import { combineLatest } from 'rxjs';
import { selectCurrentFlight } from '../+state/flight-booking.selectors';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent implements OnInit {
  id: string;
  showDetails: string;
  showWarning = false;
  urgent = false;
  flight$ = this.store.select(selectCurrentFlight);

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

  decide(decision: boolean) {
  }

  save() {
    const urgent = this.urgent;
    this.store.dispatch(saveFlight({ urgent }));
  }

}
