import { Component, Input, OnInit } from '@angular/core';
import { Record } from '../../models/record';
import { Observable } from 'rxjs/Observable';
import { MockData } from '../../models/mock-data';
import {RecordsService} from '../../services/records/records.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  public filteredRecoreds$: Observable<Record[]>;

  public uniqueProjectOwners$: Observable<Number>;
  public averageBudget$: Observable<Number>;
  public newRecords$: Observable<Number>;

  constructor(private recordsService: RecordsService) {
    this.filteredRecoreds$ = this.recordsService.getRecords();

    this.uniqueProjectOwners$ = this.filteredRecoreds$.map((records: Record[]) => {
      const ownersMap = records.map((record: Record) => record.projectOwner).reduce<any>((obj: any, projectOwner: string) => {
        obj[projectOwner] = true;
        return obj;
      }, {});

      return Object.keys(ownersMap).length;
    });

    this.averageBudget$ = this.filteredRecoreds$.map((records: Record[]) => {
      const total: number = records.map((record: Record) => record.budget).reduce<number>((current: number, sum: number) => {
        return current + sum;
      }, 0);

      return total / records.length;
    });

    this.newRecords$ = this.filteredRecoreds$.map((records: Record[]) =>
      records.filter((record: Record) => record.status === 'new').length);
  }

  ngOnInit() {
  }

}
