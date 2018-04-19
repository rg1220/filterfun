import * as moment from 'moment';

export class Record {

  constructor(public title: String,
              public division: String,
              public projectOwner: String,
              public budget: Number,
              public status: String,
              public created: moment.Moment,
              public modified: moment.Moment) {
  }

}
