import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string, format: string): any {
    // if (!Moment(value, format).isValid()) {
    //   return '';
    // }
    var dateStringWithTime = moment(value).format(format);
    if(dateStringWithTime == 'Invalid date'){
      return ''
    }
    return dateStringWithTime;
  }

}
