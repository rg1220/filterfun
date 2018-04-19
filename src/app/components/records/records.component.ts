import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Record } from '../../models/record';
import * as moment from 'moment';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {

  @Input() records: Record[] = [];
  @Output() recordPropertyChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
  }

  trackRecordsBy(index, record: Record) {
    return record.id;
  }

  recordChanged(record, key, value) {
    switch (key) {
      case 'modified':
      case 'created':
        value = moment(value, 'MM-DD-YYYY');
        break;
      default:
        break;
    }

    this.recordPropertyChanged.emit({
      record: record,
      key: key,
      value: value
    });
  }

}
