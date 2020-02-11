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

function metaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.debug('state', state);
    console.debug('action', action);
    return reducer(state, action);
  }
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? 
  [metaReducer] : 
  [];
