import { Component, OnInit } from '@angular/core';
import { SesionService } from '../services/sesion.service';

@Component({
  selector: 'app-logintiendas',
  templateUrl: './logintiendas.component.html',
  styleUrls: ['./logintiendas.component.css']
})
export class LogintiendasComponent implements OnInit {

  correo;
  contrasena;

  constructor(
    private SesionService: SesionService
  ) {
    this.correo = null;
    this.contrasena = null;
    this.clientes = [];
  }

  clientes : any[]

  ngOnInit() {
    this.SesionService.nuevo();

    localStorage.removeItem("cliente");
    this.SesionService.listadoUsuario()
    .snapshotChanges()
    .subscribe(data => {
      this.clientes = [];
      this.clientes = data.map(element => element.payload.toJSON());
    });
  }

  login(){
    this.clientes.forEach(element => {
      if(element.Correo === this.correo && element.Contrasena === this.contrasena && element.Tienda === true){
        localStorage.setItem("tienda",element.Correo);
        location.href="/mitienda";
      }
    });
  }
}
