import { Component, OnInit } from '@angular/core';
import { SesionService } from '../services/sesion.service';
import { Usuario } from '../interfaces/usuario';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  url = "https://pbs.twimg.com/media/CpAyNN4WAAEknnf.jpg";
  key;
  listadoTodos: any[];
  usuario;
  cantidad;

  isNick: boolean;
  primeraVez;
  isNickError;
  quienSigo: any[];
  selected;
  listadoUsuario: any[];
  Listado: any[];
  carga;
  usuarioOnline: any;
  uno;
  dos;
  tres;
  cargax: number;
  listPerfil;

  constructor(
    private GlobalService: GlobalService,
    private sesionService: SesionService
  ) {
    this.cargax = 0;
    this.uno = true;
    this.dos = false;
    this.tres = false;
    this.usuarioOnline = null;
    this.isNickError = false;
    this.isNick = false;
    this.carga = false;
    this.usuario = {};
    this.Listado = [];
  }

  list() {
    this.cantidad = 0;
    let uno = true;
    this.sesionService.listadoUsuario()
      .snapshotChanges()
      .subscribe(data => {
        if (uno) {
        let myCapturas = [];
        let myPublicaciones = [];
        let myTotal = [];

        this.listadoUsuario = [];
        let Usuarios = [];
        this.Listado = [];
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
                this.isNick = true;
              } else {
                this.isNick = false;
              }
              this.key = element.key;
              let aux = x["quienSeguidos"];
              this.usuarioOnline = x;
              if (aux !== undefined) {
                Object.keys(aux).map(elements => {
                  arraySeguidores.push(aux[elements]);
                });
              }
              arraySeguidores.push(x["Nick"]);
            }
            Usuarios.push(x);
            this.listadoUsuario.push(x);
          });
          this.Listado = [];
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
                    this.Listado.push(z);
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
                    this.Listado.push(k);
                    y++;
                  });
                }
              }
            });
          });

          for (let j = 0; j < this.Listado.length; j++) {
            for (let c = 0; c < this.Listado.length - 1; c++) {
              let aux = this.Listado[c].fecha.split("-");
              let aux2 = this.Listado[c + 1].fecha.split("-");
              let fecha = aux[0].split("/");
              let fecha2 = aux2[0].split("/");

              if (aux[0] === aux2[0]) {
                if (aux[1] < aux2[1]) {
                  var temp = this.Listado[c];
                  this.Listado[c] = this.Listado[c + 1];
                  this.Listado[c + 1] = temp;
                }
              } else if (Number(fecha[2]) === Number(fecha2[2])) {
                if (Number(fecha[1]) === Number(fecha2[1])) {
                  if (Number(fecha[0]) < Number(fecha2[0])) {
                    var temp = this.Listado[c];
                    this.Listado[c] = this.Listado[c + 1];
                    this.Listado[c + 1] = temp;

                  }
                } else if (Number(fecha[1]) < Number(fecha[2])) {
                  var temp = this.Listado[c];
                  this.Listado[c] = this.Listado[c + 1];
                  this.Listado[c + 1] = temp;
                }
              } else if (Number(fecha[2]) < Number(fecha2[2])) {
                var temp = this.Listado[c];
                this.Listado[c] = this.Listado[c + 1];
                this.Listado[c + 1] = temp;
              }

            }
          }
          this.cantidad = this.Listado.length;
          this.carga = true;
          console.log(this.Listado);
          this.GlobalService.setUsuarioOnline(this.usuarioOnline);
          this.GlobalService.setListadoHome(this.Listado);
          this.GlobalService.setListadoMiPerfilTotal(myTotal);
          this.cargax++;
          uno = false;
        }
      });
  }


  ngOnInit() {
    this.Listado = [];
    this.primeraVez = localStorage.getItem("primeraVez");
    this.cargax = 0;
    this.listadoUsuario = [];
    this.cargarBusqueda();
  }

  compartir(x) {
    console.log(x);
    if (window.navigator && window.navigator['share']) {
      window.navigator['share']({
        title: 'Esta es una publicacion de SocialPesca',
        text: '¡Mirá esta publicación de SocialPesca!',
        url: 'https://www.socialpesca.com/publicacion/' + x.keypadre + "/" + x.key + "/" + ((x.forma === undefined) ? 'publicacion' : 'captura'),
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      alert('Tu navegador no permite compartir esta publicación');
    }
  }

  AgregarNick() {
    if (this.usuarioOnline.Nick !== "") {
      let aux = true;
      this.Listado.forEach(element => {
        if (element.Nick === undefined) {
          element.Nick = "";
        }
        if (element.Nick === this.usuarioOnline.Nick) {
          aux = false;
          this.isNickError = true;
        }
      });

      if (aux) {
        this.isNick = false;
        this.sesionService.listadoUsuario();
        this.sesionService.updateNick(this.usuarioOnline);
        location.reload();
      }
    }
  }

  meGusta(x) {

    if (x.quienLike === undefined) {
      x.likes = 1;
      x.quienLike = [];
      x.quienLike.push(localStorage.getItem("cliente"));
      this.sesionService.meGustaCap(x);
      this.usuario.publi = x.foto;
      this.usuario.Foto = this.usuarioOnline.Foto;
      this.usuario.$key = x.keypadre;
      this.usuario.url = '/publicacion/' + x.keypadre + '/' + x.$key + '/captura';

      if (this.key !== x.keypadre) {
        this.sesionService.nuevaNotificacion(this.usuario, null, this.usuarioOnline.Nick, x);
      }

    } else {

      var aux = false;
      var position;
      var array = [];
      Object.keys(x.quienLike).map(function (key) {
        array.push(x.quienLike[key]);
        if (x.quienLike[key] === localStorage.getItem("cliente")) {
          aux = true;
          position = key;
        }
      });
      if (aux) {
        x.likes = x.likes - 1;
        array = array.slice(1, position);
        x.quienLike = [];
        x.quienLike = array;
      } else {
        x.likes = x.likes + 1;
        array.push(localStorage.getItem("cliente"));
        x.quienLike = [];
        x.quienLike = array;
        this.usuario.publi = x.foto;
        this.usuario.Foto = this.usuarioOnline.Foto;
        this.usuario.$key = x.keypadre;
        this.usuario.url = '/publicacion/' + x.keypadre + '/' + x.$key + '/captura';
        if (this.key !== x.keypadre) {
          this.sesionService.nuevaNotificacion(this.usuario, null, this.usuarioOnline.Nick, x);
        }
      }
      this.sesionService.meGustaCap(x);

    }

  }

  Siguiente() {
    if (this.dos === false) {
      this.dos = true;
    } else {
      if (this.tres === false) {
        this.tres = true;
      } else {
        this.uno = false;
      }
    }
  }

  meGustaP(x) {

    if (x.quienLike === undefined) {
      x.likes = 1;
      x.quienLike = [];
      x.quienLike.push(localStorage.getItem("cliente"));
      this.sesionService.meGustaPub(x);
      this.usuario.publi = x.foto;
      this.usuario.Foto = this.usuarioOnline.Foto;
      this.usuario.$key = x.keypadre;
      this.usuario.url = '/publicacion/' + x.keypadre + '/' + x.$key + '/publicacion';
      if (this.key !== x.keypadre) {
        this.sesionService.nuevaNotificacion(this.usuario, null, this.usuarioOnline.Nick, x);
      }
    } else {

      var aux = false;
      var position;
      var array = [];
      Object.keys(x.quienLike).map(function (key) {
        array.push(x.quienLike[key]);
        if (x.quienLike[key] === localStorage.getItem("cliente")) {
          aux = true;
          position = key;
        }
      });
      if (aux) {
        x.likes = x.likes - 1;
        array = array.slice(1, position);
        x.quienLike = [];
        x.quienLike = array;
      } else {
        x.likes = x.likes + 1;
        array.push(localStorage.getItem("cliente"));
        x.quienLike = [];
        x.quienLike = array;
        this.usuario.publi = x.foto;
        this.usuario.Foto = this.usuarioOnline.Foto;
        this.usuario.$key = x.keypadre;
        this.usuario.url = '/publicacion/' + x.keypadre + '/' + x.$key + '/publicacion';
        if (this.key !== x.keypadre) {
          this.sesionService.nuevaNotificacion(this.usuario, null, this.usuarioOnline.Nick, x);
        }
      }
      this.sesionService.meGustaPub(x);
    }
  }

  isCarga : any;
  cargarBusqueda() {
    this.isCarga = this.GlobalService.getNick();
    if (localStorage.getItem("primeraVez") === null || this.isCarga === null ) {
      this.list();
      var primeraVez = true;
      this.sesionService.listadoUsuario()
        .snapshotChanges()
        .subscribe(Data => {
          if (primeraVez) {

            this.listadoTodos = [];
            Data.map(element => {
              let x = element.payload.toJSON();
              x["$key"] = element.key;
              if (x["Nick"] !== undefined) {
                this.listadoTodos.push(x);
              }
              if (x["Correo"] === localStorage.getItem("cliente")) {
                this.GlobalService.setNick(this.usuario);
              }
              if (x["Correo"] === localStorage.getItem("tienda")) {
                this.GlobalService.setNick(this.usuario);
              }
              if (x["Capturas"] !== undefined) {

                this.listPerfil = [];
                let aux = true;
                this.sesionService.listadoCaptuasLikes(x["$key"])
                  .snapshotChanges()
                  .subscribe(data => {
                    console.log("entrando");
                    if (aux) {
                      data.map(element => {
                        let z = element.payload.toJSON();
                        z["key"] = element.key;
                        z["fperfil"] = x["Foto"];
                        z["keypadre"] = x["$key"];
                        z["Correo"] = x["Correo"];
                        this.listPerfil.push(z);
                      });
                      this.listPerfil = this.listPerfil.sort(function () { return Math.random() - 0.5 });
                      this.GlobalService.setListadoBusqueda(this.listPerfil);
                      aux = false;
                    }
                  });
              }
            });


            this.listadoTodos = this.listadoTodos.sort(function () { return Math.random() - 0.5 });
            this.GlobalService.setListadoPerfilesBusqueda(this.listadoTodos);
            primeraVez = false;
            this.cargax++;

            localStorage.setItem("primeraVez", "true");
          }
        });

    } else {

      
        this.Listado = this.GlobalService.getListadoHome();
        this.usuarioOnline = this.GlobalService.getUsuarioOnline();
        this.carga = true;
      this.cargax++;
    }
  }

}
