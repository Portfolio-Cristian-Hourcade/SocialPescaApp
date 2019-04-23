import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mensajes'
})
export class MensajesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
