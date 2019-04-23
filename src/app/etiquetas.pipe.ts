import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'etiquetas'
})
export class EtiquetasPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let aux = value.split(",");
    let obj = [{ Nick : aux[0] },{ Nick: aux[1]}];
    return obj;
  }

}
