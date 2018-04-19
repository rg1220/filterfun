// counter.ts
import { Action } from '@ngrx/store';
import { Record } from '../../models/record';
import { MockData } from '../../models/mock-data';

export enum RecordActionTypes {
  UPDATE_RECORD_PROPERTY = '[RECORD] UPDATE_RECORD_PROPERTY',
}

export class UpdateRecordProperty implements Action {
  readonly type = RecordActionTypes.UPDATE_RECORD_PROPERTY;

  constructor(public payload: { record: Record, key: string, value: any }) {}
}

export type RecordsActionsUnion =
  | UpdateRecordProperty;

export interface RecordsStateInterface {
  records: Record[];
}

export const initialState: RecordsStateInterface = {
  records: MockData.GetData()
};

export function recordsReducer(state: RecordsStateInterface = initialState, action: RecordsActionsUnion) {
  switch (action.type) {
    case RecordActionTypes.UPDATE_RECORD_PROPERTY:
      const recordIndex = state.records.findIndex(r => r.id === action.payload.record.id);
      const record = {
        ...state.records[recordIndex]
      };
      record[action.payload.key] = action.payload.value;

      const records = [
        ...state.records.slice(0, recordIndex),
        record,
        ...state.records.slice(recordIndex + 1)
      ];

      return {
        ...state,
        records: records
      };
    default:
      return state;
  }
}
