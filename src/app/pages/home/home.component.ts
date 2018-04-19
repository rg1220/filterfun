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

  constructor(private recordsService: RecordsService) {
    this.records$ = this.recordsService.getRecords();
    this.filteredRecoreds$ = this.records$.map(data => data);
  }

  ngOnInit() {
    // this.recordsService.loadRecords();
  }

  recordPropertyChanged({ record, key, value }) {
    this.recordsService.updateRecordProperty(record, key, value);
  }

}
