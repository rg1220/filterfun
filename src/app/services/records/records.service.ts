import { Injectable } from '@angular/core';
import { AppState } from '../../store/state';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { RecordsStateInterface } from '../../store/reducers/RecordsReducer';

@Injectable()
export class RecordsService {

  constructor(private store: Store<AppState>) { }


  public getRecords() {
    return this.store.pipe(select('recordsState'),
      map((state: RecordsStateInterface) => state.records));
  }

}