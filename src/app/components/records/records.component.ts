import { Component, OnInit, Input } from '@angular/core';
import { Record } from '../../models/record';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {

  @Input() records: Record[] = [];

  constructor() {}

  ngOnInit() {
  }

}
