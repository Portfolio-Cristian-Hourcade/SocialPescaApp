import { Component, OnInit } from '@angular/core';
import { SesionService } from '../services/sesion.service';
import { element } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-negocios',
  templateUrl: './negocios.component.html',
  styleUrls: ['./negocios.component.css']
})
export class NegociosComponent implements OnInit {

  listadoTiendas: any[];
  constructor(
    private sesionService: SesionService
  ) {
    this.listadoTiendas = [];
  }

  ngOnInit() {
    this.sesionService.listadoUsuario()
      .snapshotChanges()
      .subscribe(data => {
        let aux = [];
        this.listadoTiendas = [];
        aux = data.map(element => element.payload.toJSON());
        aux.map(element => {
          if (element.Tienda === true){
            this.listadoTiendas.push(element);
          }
      });
      });
  }

}
