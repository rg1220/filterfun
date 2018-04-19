// counter.ts
import { Action } from '@ngrx/store';
import { Record } from '../../models/record';
import { MockData } from '../../models/mock-data';

// export const INCREMENT = 'INCREMENT';
// export const DECREMENT = 'DECREMENT';
// export const RESET = 'RESET';

export interface RecordsStateInterface {
  records: Record[];
}

export const initialState: RecordsStateInterface = {
  records: MockData.GetData()
};

export function recordsReducer(state: RecordsStateInterface = initialState, action: Action) {
  switch (action.type) {
    // case INCREMENT:
    //   return state + 1;
    //
    // case DECREMENT:
    //   return state - 1;
    //
    // case RESET:
    //   return 0;

    default:
      return state;
  }
}
