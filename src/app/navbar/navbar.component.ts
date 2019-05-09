import { Component, OnInit, Input } from '@angular/core';
import { SesionService } from '../services/sesion.service';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

// Declaramos las variables para jQuery
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() foto: string;
  isMobile: boolean;
  fotografia;
  modal;

  constructor(
    private usuarioService: SesionService,
    private Router: Router,
    private GlobalService : GlobalService
  ) {
    this.isMobile = false;
    this.lightBox = false;
    this.modal = false;
    this.tienda = false;
  }
  url;
  tienda: boolean;
  lightBox: boolean;

  ngOnInit() {
    
    this.url = window.location.href;
    if (localStorage.getItem("tienda") === null) {
      if (localStorage.getItem("cliente") === null) {
        if (window.location.href.indexOf('/publicacion') !== -1 || window.location.href.indexOf('/tienda') !== -1) {
          this.fotografia = "/assets/usuario.png";
          this.lightBox = true;
          this.modal = false;
        } else {
          if (localStorage.getItem("primeraVez") === null && (localStorage.getItem("tienda") !== null || localStorage.getItem("cliente") !== null)) {
            this.Router.navigateByUrl("/home");
          }
          location.href = "/inicio";
        }
      } else {
        if ((window.location.href.indexOf('/publicacion') === -1 || window.location.href.indexOf('/tienda') !== -1) && localStorage.getItem("primeraVez") === null) {
          this.Router.navigateByUrl("/home");
        }
      }
    } else {
      if ((window.location.href.indexOf('/publicacion') === -1 || window.location.href.indexOf('/tienda') !== -1) && localStorage.getItem("primeraVez") === null) {
        this.Router.navigateByUrl("/home");
      }
      this.tienda = true;
    }
    this.usuarioService.nuevo();

    window.scrollTo(0, 0)

    if (window.innerWidth < 768) {
      this.isMobile = true;
    }

    this.usuarioService.listadoUsuario()
      .snapshotChanges()
      .subscribe(data => {
        data.map(element => {
          let x = element.payload.toJSON();
          if (x["Correo"] === localStorage.getItem("cliente") || x["Correo"] === localStorage.getItem("tienda")) {
            this.fotografia = x["Foto"];
          }
        });
      });
  }

  registro() {
    this.modal = (this.modal) ? false : true;
  }

  scrollTop() {
    // this.cantidad = 0;
    var listadoUsuario = []
    var Listado = [];
    var isNick;
    var key;
    var usuarioOnline;
    let uno = true;
    this.usuarioService.listadoUsuario()
      .snapshotChanges()
      .subscribe(data => {
        if (uno) {
        let myCapturas = [];
        let myPublicaciones = [];
        let myTotal = [];

        listadoUsuario = [];
        let Usuarios = [];
        Listado = [];
        let arraySeguidores = [];

          data.map(element => {
            let x = element.payload.toJSON();
            x["$key"] = element.key;
            if (x["Correo"] === localStorage.getItem("cliente")) {
              if (x["Capturas"] !== undefined) {
                let a = 0;
                Object.keys(x["Capturas"]).map(item => {
                  x["Capturas"][item]["$key"] = Object.keys(x["Capturas"])[a];
                  myCapturas.push(x["Capturas"][item]);
                  myTotal.push(x["Capturas"][item]);
                });
                this.GlobalService.setListadoMiPerfilCapturas(myCapturas);
              }
              if (x["Publicacion"] !== undefined) {
                let a = 0;
                Object.keys(x["Publicacion"]).map(item => {
                  x["Publicacion"][item]["$key"] = Object.keys(x["Publicacion"])[a];
                  myPublicaciones.push(x["Publicacion"][item]);
                  myTotal.push(x["Publicacion"][item]);
                });
                this.GlobalService.setListadoMiPerfilPublicaciones(myPublicaciones);
              }

              if (x["Nick"] === undefined) {
                isNick = true;
              } else {
                isNick = false;
              }

              key = element.key;
              let aux = x["quienSeguidos"];
              usuarioOnline = x;
              if (aux !== undefined) {
                Object.keys(aux).map(elements => {
                  arraySeguidores.push(aux[elements]);
                });
              }
              arraySeguidores.push(x["Nick"]);
            }
            Usuarios.push(x);
            listadoUsuario.push(x);
          });
          Listado = [];
          Usuarios.map(elemento => {
            arraySeguidores.forEach(padre => {
              if (padre === elemento.Nick) {
                if (elemento.Capturas !== undefined) {
                  let y = 0;
                  Object.keys(elemento.Capturas).map(key => {
                    let z = elemento.Capturas[key];
                    z.$key = Object.keys(elemento.Capturas)[y];
                    z.keypadre = elemento.$key;
                    z.fperfil = elemento.Foto;
                    z.Correo = elemento.Correo;
                    Listado.push(z);
                    y++;
                  });
                }
                if (elemento.Publicacion !== undefined) {
                  let y = 0;
                  Object.keys(elemento.Publicacion).map(key => {
                    let k = elemento.Publicacion[key];
                    k.$key = Object.keys(elemento.Publicacion)[y];
                    k.keypadre = elemento.$key;
                    k.fperfil = elemento.Foto;
                    k.Correo = elemento.Correo;
                    Listado.push(k);
                    y++;
                  });
                }
              }
            });
          });

          for (let j = 0; j < Listado.length; j++) {
            for (let c = 0; c < Listado.length - 1; c++) {
              let aux = Listado[c].fecha.split("-");
              let aux2 = Listado[c + 1].fecha.split("-");
              let fecha = aux[0].split("/");
              let fecha2 = aux2[0].split("/");

              if (aux[0] === aux2[0]) {
                if (aux[1] < aux2[1]) {
                  var temp = Listado[c];
                  Listado[c] = Listado[c + 1];
                  Listado[c + 1] = temp;
                }
              } else if (Number(fecha[2]) === Number(fecha2[2])) {
                if (Number(fecha[1]) === Number(fecha2[1])) {
                  if (Number(fecha[0]) < Number(fecha2[0])) {
                    var temp = Listado[c];
                    Listado[c] = Listado[c + 1];
                    Listado[c + 1] = temp;

                  }
                } else if (Number(fecha[1]) < Number(fecha[2])) {
                  var temp = Listado[c];
                  Listado[c] = Listado[c + 1];
                  Listado[c + 1] = temp;
                }
              } else if (Number(fecha[2]) < Number(fecha2[2])) {
                var temp = Listado[c];
                Listado[c] = Listado[c + 1];
                Listado[c + 1] = temp;
              }

            }
          }
          this.GlobalService.setUsuarioOnline(usuarioOnline);
          this.GlobalService.setListadoHome(Listado);
          this.GlobalService.setListadoMiPerfilTotal(myTotal);
        }
      });
    if (window.location.href.indexOf("/home") !== -1) {
      $('html, body').animate({ scrollTop: 0 }, 800);
    }
  }
}
