import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'countDate'
})
export class CountDatePipe implements PipeTransform {

  transform(value: string,): unknown {
    const date = moment(value).calendar(null, {
      sameDay: '[วันนี้]',
      nextDay: '[วันพรุ่งนี้]',
      nextWeek: '[วันที่] DD [ที่จะถึง]',
      lastDay: '[เมื่อวาน]',
      lastWeek: '[เมื่อวันที่] DD [ที่ผ่านมา]',
      sameElse: 'DD-MM-YYYY'
    });
    if(date == 'Invalid date'){
      return ''
    }
    return date;
  }

}
