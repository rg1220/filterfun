import * as moment from 'moment';

export class Record {

  constructor(public id: number,
              public title: String,
              public division: String,
              public projectOwner: String,
              public budget: number,
              public status: String,
              public created: moment.Moment,
              public modified: moment.Moment) {
  }

}
