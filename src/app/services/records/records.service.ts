import { Injectable } from '@angular/core';
import { AppState } from '../../store/state';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import {RecordsStateInterface, ToggleStatusFilter, UpdateRecordProperty} from '../../store/reducers/RecordsReducer';
import 'rxjs/add/operator/combineLatest';
import { Record } from '../../models/record';

@Injectable()
export class RecordsService {

  constructor(private store: Store<AppState>) { }

  public getRecords() {
    return this.store.pipe(select('recordsState'),
      map((state: RecordsStateInterface) => state.records));
  }

  public updateRecordProperty(record, key, value) {
    this.store.dispatch(new UpdateRecordProperty({
      record: record,
      key: key,
      value: value
    }));
  }

  public getFilteredRecords() {
    return this.getRecords().combineLatest(this.getActiveStatusFilters(), (records: Record[], statusFilters: String[]) => {
      if (statusFilters.length === 0) {
        return records;
      }
      return records.filter(record => statusFilters.includes(record.status));
    });
  }

  public toggleStatusFilter(status, value) {
    this.store.dispatch(new ToggleStatusFilter({
      status: status,
      value: value
    }));
  }

  public getActiveStatusFilters() {
    return this.store.pipe(select('recordsState'),
      map((state: RecordsStateInterface) => state.statusFilter));
  }

}
