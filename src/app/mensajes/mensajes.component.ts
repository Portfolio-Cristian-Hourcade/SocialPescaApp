import { Component, OnInit } from '@angular/core';
import { SesionService } from '../services/sesion.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  listadoUsuarios;
  listadoVista;
  cuerpoMensaje;
  mensaje;
  NickOnline;
  FotoNick;
  constructor(
    private dashboardService: SesionService
  ) {
  }
  numero;
  listadoMensajes;
  unicaVez : boolean;
  ngOnInit() {

    this.unicaVez = true;
    this.listado();
  }


  listado(){
    this.listadoVista = [];
    this.listadoMensajes = [];
    this.dashboardService.listadoUsuario()
      .snapshotChanges()
      .subscribe(Data => {
        this.listadoUsuarios = [];
        Data.map(element => {
            let x = element.payload.toJSON();
            x["$key"] = element.key;
            if (x["Correo"] === localStorage.getItem("cliente")) {
              this.NickOnline = x["Nick"];
              this.FotoNick = x["Foto"];
            }
            this.listadoUsuarios.push(x);
            this.unicaVez = false;
        });
        this.dashboardService.listadoChats()
          .snapshotChanges()
          .subscribe(data => {
            this.listadoMensajes = [];
            data.forEach(element => {
              let x = element.payload.toJSON();
              x["$key"] = element.key;
              if (this.mensaje !== undefined) {
               

                if ((x["Responsable1"] === this.mensaje.Responsable1 || x["Responsable2"] === this.mensaje.Responsable1) && (x["Responsable1"] === this.mensaje.Responsable2 || x["Responsable2"] === this.mensaje.Responsable2)) {
                  this.mensaje = x;
                  this.cuerpoMensaje = document.getElementById("mensajes");
                }

              }

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

                } else {
                  x["view"] = true;
                }
                if (this.mensaje !== undefined) {
                  x["view"] = true;
                }
                this.listadoMensajes.push(x);
                if(this.mensaje !== undefined){
                  console.log("entro");
                  this.cuerpoMensaje.scroll(0,20000);
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

                } else {
                  x["view"] = true;
                }
                if (this.mensaje !== undefined) {
                  x["view"] = true;
                }
                this.listadoMensajes.push(x);
                if(this.mensaje !== undefined){
                  this.cuerpoMensaje.scroll(0,20000);
                }
              }
            });
            
          });

        if (this.mensaje !== undefined) {
          this.listadoMensajes = [];
        }
      });

  }
  texto;

  NuevoMensaje(obj) {
    this.listadoVista.length = 0;
    let aux = true;
    this.listadoMensajes.map(element => {
      if (element.Responsable1 === this.NickOnline && element.Responsable2 === obj.Nick) {
        this.mensaje = element;
        this.cuerpoMensaje.scroll(0, -20000);
        aux = false;
      } else if (element.Responsable1 === obj.Nick && element.Responsable2 === this.NickOnline) {
        this.mensaje = element;        
        this.cuerpoMensaje.scroll(0, -20000);
        aux = false;
      }
    });
    if (aux) {
      this.mensaje = {
        Responsable1Foto: this.FotoNick,
        Responsable1: this.NickOnline,
        Responsable2: obj.Nick,
        Responsable2Foto: obj.Foto,
      }
    }
  }

  enviar() {
    if (this.texto !== "") {

      if (this.mensaje.$key === undefined) {
        this.mensaje.mensaje = this.texto;
        this.texto = "";
        this.mensaje.quien = this.NickOnline;
        this.mensaje.para = (this.mensaje.Responsable1 === this.NickOnline) ? this.mensaje.Responsable2 : this.mensaje.Responsable1;
        this.mensaje.visto = false;
        this.dashboardService.nuevoChat(this.mensaje);
      } else {

        let aux = this.mensaje.mensajes;
        let mensajes = [];
        Object.keys(aux).map(element => {
          mensajes.push(aux[element]);
        });
        mensajes.push({
          mensaje: this.texto,
          quien: this.NickOnline,
          para: (this.mensaje.Responsable1 === this.NickOnline) ? this.mensaje.Responsable2 : this.mensaje.Responsable1,
          visto: false
        });
        this.mensaje.mensajes = mensajes;
        this.texto = "";
        this.dashboardService.UpdateChat(this.mensaje);
        aux = false;

      }
    }
  }


  filtro(value) {
    if (value !== undefined) {
      if (value.length < 1) {
        this.listadoVista.length = 0;
      } else {
        this.listadoVista = [];
        this.listadoUsuarios.forEach(element => {
          if (element.Nick.toUpperCase().match(value.toUpperCase())) {
            this.listadoVista.push(element);
          }
        });
      }
    }
  }

  aux;
  abrir(x) {
    
    this.mensaje = x;
    this.listado();
    if (x.view === false) {
      let aux = this.mensaje.mensajes;
      let mensajes = [];
      Object.keys(aux).map(element => {
        mensajes.push(aux[element]);
      });
      mensajes[mensajes.length - 1].visto = true;
      this.mensaje.mensajes = mensajes;
      this.cuerpoMensaje = document.getElementById("mensajes");
      if(this.cuerpoMensaje){
        console.log("entro");
        this.cuerpoMensaje.scroll(0,1000000000);
      }
      console.log(this.mensaje);
      console.log(document.getElementById("mensajes"));
      this.dashboardService.UpdateChat(this.mensaje);
    }
  }
}
