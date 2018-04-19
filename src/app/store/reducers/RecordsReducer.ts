// counter.ts
import { Action } from '@ngrx/store';
import { Record } from '../../models/record';
import { MockData } from '../../models/mock-data';

export enum RecordActionTypes {
  UPDATE_RECORD_PROPERTY = '[RECORD] UPDATE_RECORD_PROPERTY',
  TOGGLE_STATUS_FILTER = '[RECORD] TOGGLE_STATUS_FILTER',
}

export class UpdateRecordProperty implements Action {
  readonly type = RecordActionTypes.UPDATE_RECORD_PROPERTY;

  constructor(public payload: { record: Record, key: string, value: any }) {}
}

export class ToggleStatusFilter implements Action {
  readonly type = RecordActionTypes.TOGGLE_STATUS_FILTER;

  constructor(public payload: { status: string, value: any }) {}
}

export type RecordsActionsUnion =
  | UpdateRecordProperty
  | ToggleStatusFilter;

export interface RecordsStateInterface {
  records: Record[];
  statusFilter: string[];
}

export const initialState: RecordsStateInterface = {
  records: MockData.GetData(),
  statusFilter: []
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
    case RecordActionTypes.TOGGLE_STATUS_FILTER:
      const statusFilter = state.statusFilter.filter(status => status !== action.payload.status);

      if (action.payload.value) {
        statusFilter.push(action.payload.status);
      }

      return {
        ...state,
        statusFilter
      };
    default:
      return state;
  }
}
