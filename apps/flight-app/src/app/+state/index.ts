import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';


export interface State {
  // currentUser: string
}

export const reducers: ActionReducerMap<State> = {
  // flightBooking: fbReducer
  // currentUser: authReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
