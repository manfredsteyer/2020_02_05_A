import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, interval, combineLatest, of, Subject } from 'rxjs';
import { Flight, FlightService } from '@flight-workspace/flight-api';
import { debounceTime, switchMap, distinctUntilChanged, startWith, map, tap, filter, shareReplay, mergeMap, concatMap, exhaustMap, catchError, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'flight-lookahead',
  templateUrl: './flight-lookahead.component.html',
  styleUrls: ['./flight-lookahead.component.css']
})
export class FlightLookaheadComponent implements OnInit, OnDestroy {
  

  formControl = new FormControl();
  input$ = this.formControl.valueChanges.pipe(debounceTime(300));
  flights$: Observable<Flight[]>;

  closeSubj = new Subject<void>();

  online$: Observable<boolean>;

  constructor(private flightService: FlightService) { }

  ngOnInit() {

    this.online$ 
          = interval(2000).pipe(
                  startWith(0),
                  map(_ => Math.random() < 0.5),
                  map(_ => true),
                  distinctUntilChanged(),
                  shareReplay(1)
            );

    this.flights$ = combineLatest(this.online$, this.input$).pipe(
      filter( ([online, _]) => online ),
      map(([_, value]) => value),
      distinctUntilChanged(),
      switchMap(v => this.flightService.find(v, '')),
      takeUntil(this.closeSubj),
    )

    // this.flights$ = this.input$.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap(v => this.flightService.find(v, ''))
    // );

  }

  ngOnDestroy(): void {
    this.closeSubj.next();
  }


}


