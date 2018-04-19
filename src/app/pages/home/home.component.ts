import { Component, OnInit } from '@angular/core';
import { Record } from '../../models/record';
import { Observable } from 'rxjs/Observable';
import { RecordsService } from '../../services/records/records.service';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public records$: Observable<Record[]>;
  public filteredRecoreds$: Observable<Record[]>;
  public statuses$: Observable<string[]>;
  public activeStatusFilters$: Observable<string[]>;

  constructor(private recordsService: RecordsService) {
    this.records$ = this.recordsService.getRecords();
    this.activeStatusFilters$ = this.recordsService.getActiveStatusFilters();
    this.filteredRecoreds$ = this.recordsService.getFilteredRecords();

    this.statuses$ = this.records$.map((records: Record[]) => {
      return Object.keys(records.map(record => record.status).reduce((current: any, status: string) => {
        current[status] = true;
        return current;
      }, {}));
    });
  }

  ngOnInit() {
    // this.recordsService.loadRecords();
  }

  recordPropertyChanged({ record, key, value }) {
    this.recordsService.updateRecordProperty(record, key, value);
  }

  filterStatus(status, value) {
    this.recordsService.toggleStatusFilter(status, value);
  }

}
