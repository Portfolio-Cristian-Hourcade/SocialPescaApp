import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recort'
})
export class RecortPipe implements PipeTransform {

  transform(value: string): any {
    if (value !== undefined) {
      if (value.length > 30) {
        value = value.substring(0, 30) + "...";
      }
    }
    return value;
  }

}
