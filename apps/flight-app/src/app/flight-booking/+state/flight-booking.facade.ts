
import { Injectable } from '@angular/core';
import { FlightService, Flight } from '@flight-workspace/flight-api';
import { BehaviorSubject } from 'rxjs';
import { FlightBookingState, FlightBookingAppState, flightBookingFeatureKey } from './flight-booking.reducer';
import { Store } from '@ngrx/store';
import { flightsLoaded, loadFlights } from './flight-booking.actions';
import { selectFlightsFiltered } from './flight-booking.selectors';

@Injectable({providedIn: 'root'})
export class FlightBookingFacade {
    
    // --- 1 ---
    // private flightsSubject = new BehaviorSubject<Flight[]>(null);
    // flights$ = this.flightsSubject.asObservable();

    // constructor(private flightService: FlightService) { }
    
    // search(from: string, to: string, urgent: boolean): void {
    //     this.flightService.find(from, to, urgent).subscribe( 
    //         flights => {
    //             this.flightsSubject.next(flights);
    //         },
    //         err => console.error('err', err)
    //     )
    // }

    // --- 2 ---
    // flights$ = this.store.select(appState => appState[flightBookingFeatureKey].flights);

    // constructor(
    //     private store: Store<FlightBookingAppState>,
    //     private flightService: FlightService) { }
    
    // search(from: string, to: string, urgent: boolean): void {
    //     this.flightService.find(from, to, urgent).subscribe( 
    //         flights => {
    //             this.store.dispatch(flightsLoaded({flights}));
    //         },
    //         err => console.error('err', err)
    //     )
    // }

    // -- 3 --
    // flights$ = this.store.select(appState => appState[flightBookingFeatureKey].flights);

    // constructor(
    //     private store: Store<FlightBookingAppState>,
    //     private flightService: FlightService) { }
    
    // search(from: string, to: string, urgent: boolean): void {
    //     this.store.dispatch(loadFlights({from, to, urgent}));
    // }

    // -- 4 --
    flights$ = this.store.select(selectFlightsFiltered);

    constructor(
        private store: Store<FlightBookingAppState>,
        private flightService: FlightService) { }
    
    search(from: string, to: string, urgent: boolean): void {
        this.store.dispatch(loadFlights({from, to, urgent}));
    }



}