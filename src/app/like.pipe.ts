import { Pipe, PipeTransform } from '@angular/core';
import { isFulfilled } from 'q';

@Pipe({
  name: 'like'
})
export class LikePipe implements PipeTransform {

  transform(value: any): any {
    var ret = "favorite_border";

    if (value !== undefined) {
      if (localStorage.getItem("cliente") !== null) {

        Object.keys(value).map(function (key) {
          if (value[key] === localStorage.getItem("cliente")) {
            ret = "favorite";
          }
        });

      } else {
        Object.keys(value).map(function (key) {
          if (value[key] === localStorage.getItem("tienda")) {
            ret = "favorite";
          }
        });
      }
    }
    if (value === undefined) {
      ret = "favorite_border"
    }
    return ret;
  }

}
