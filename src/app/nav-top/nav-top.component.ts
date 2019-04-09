import { Component, OnInit } from '@angular/core';
import { SesionService } from '../services/sesion.service';

@Component({
  selector: 'app-nav-top',
  templateUrl: './nav-top.component.html',
  styleUrls: ['./nav-top.component.css']
})
export class NavTopComponent implements OnInit {

  isMobile: boolean;
  notificacion: boolean;

  constructor(
    private dashboardService: SesionService
  ) {
    this.isMobile = false;
    this.notificacion = false;
  }
  Mensajes : number;
  NickOnline;
  notificaciones : number;
  ngOnInit() {
    this.notificaciones =  0;
    this.Mensajes = 0;
    if (window.innerWidth < 768) {
      this.isMobile = true;
    }
    this.dashboardService.listadoUsuario()
    .snapshotChanges()
    .subscribe(Data => {
      Data.map(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if (x["Correo"] === localStorage.getItem("cliente")) {
          this.NickOnline = x["Nick"];
          this.dashboardService.listadoNotificaciones(x["$key"])
          .snapshotChanges()
          .subscribe(data => {
          this.notificaciones =  0;

            data.forEach(elemento => {
              let y = elemento.payload.toJSON();
              y["$key"] = elemento.key;
              if(y["Visto"] === false){
                this.notificaciones++;
              }
            });            
          });
        }
      });
        this.dashboardService.listadoChats()
          .snapshotChanges()
          .subscribe(data => {
            this.Mensajes = 0;
            data.forEach(element => {
              let x = element.payload.toJSON();
              x["$key"] = element.key;
              if (x["Responsable1"] === this.NickOnline) {

                let aux = x["mensajes"];
                let mensajes = [];
                Object.keys(aux).map(element => {
                  mensajes.push(aux[element]);
                });

                x["mensajes"] = mensajes;
                x["ultimo"] = mensajes[mensajes.length - 1].mensaje;
                x["quien"] = mensajes[mensajes.length - 1].quien;
                if (x["quien"] !== this.NickOnline) {
                  x["view"] = mensajes[mensajes.length - 1].visto;
                  if(x["view"] === false){
                    this.Mensajes++;
                  };
                } else {
                  x["view"] = true;
                }

              }
              if (x["Responsable2"] === this.NickOnline) {
                let aux = x["mensajes"];
                let mensajes = [];
                Object.keys(aux).map(element => {
                  mensajes.push(aux[element]);
                });
                x["mensajes"] = mensajes;
                x["ultimo"] = mensajes[mensajes.length - 1].mensaje;
                x["quien"] = mensajes[mensajes.length - 1].quien;
                if (x["quien"] !== this.NickOnline) {
                  x["view"] = mensajes[mensajes.length - 1].visto;
                  if(x["view"] === false){
                    this.Mensajes++;
                  }
                } else {
                  x["view"] = true;
                }               
              }
            });
          });

      });
  }


}
