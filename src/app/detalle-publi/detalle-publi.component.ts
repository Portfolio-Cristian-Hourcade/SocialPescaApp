import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SesionService } from '../services/sesion.service';
import { S_IXGRP } from 'constants';

@Component({
  selector: 'app-detalle-publi',
  templateUrl: './detalle-publi.component.html',
  styleUrls: ['./detalle-publi.component.css']
})
export class DetallePubliComponent implements OnInit {

  variable: any;
  usuarioOnline: any;
  comentario: any;
  comentarios: any[];
  seguir: boolean;

  cargando: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private usuarioService: SesionService

  ) {
    this.cargando = true;
    this.seguir = true;
    this.variable =
      {
        Nick: null
      };
    this.usuarioOnline = {
      Nick: null
    };;
  }

  duenio;
  correo;

  ngOnInit() {
    this.variable.Nick = "";
    this.usuarioOnline.Nick = "";
    const keypadre = this.activatedRoute.snapshot.paramMap.get("keypadre");
    const key = this.activatedRoute.snapshot.paramMap.get("key");
    const tipo = this.activatedRoute.snapshot.paramMap.get("tipo");


    this.usuarioService.listadoUsuario()
      .snapshotChanges()
      .subscribe(data => {
        data.map(element => {
          let x = element.payload.toJSON();
          if (keypadre === element.key) {
            this.correo = x["Correo"];
            this.duenio = x;
          }
          if (x["Correo"] === localStorage.getItem("tienda")) {
            this.usuarioOnline = x;
            if (keypadre === element.key) {
              this.seguir = false;
            } else {
              if (x["quienSeguidos"] !== undefined) {
                let aux = x["quienSeguidos"];
                Object.keys(aux).map(element => {
                  console.log(aux[element]);
                  if (this.usuarioOnline === aux[element]) {
                    this.seguir = false;
                  }
                });
              }
            }
          }
          if (x["Correo"] === localStorage.getItem("cliente")) {
            this.usuarioOnline = x;
            if (keypadre === element.key) {
              this.seguir = false;
            } else {
              if (x["quienSeguidos"] !== undefined) {
                let aux = x["quienSeguidos"];
                Object.keys(aux).map(element => {
                  console.log(aux[element]);
                  if (this.usuarioOnline === aux[element]) {
                    this.seguir = false;
                  }
                });
              }
            }
          }
        });

      });

    if (tipo === 'publicacion') {
      this.listadoPublicacion(keypadre, key);
    } else {
      this.listadoCaptura(keypadre, key);
    }
  }

  meGustaP(x) {

    if (x.quienLike === undefined || x.quienLike.length === 0) {
      // x.likes = 1;
      x.quienLike = [];
      x.quienLike.push(localStorage.getItem("cliente"));
      this.variable.Foto = this.usuarioOnline.Foto;
      this.variable.publi = x.foto;
      this.variable.url = '/publicacion/' + x.keypadre + '/' + x.$key + '/publicacion';
      if (x.Correo !== localStorage.getItem("cliente")) {
        this.usuarioService.nuevaNotificacion(this.variable, undefined, this.usuarioOnline.Nick, this.duenio);
        Notification.requestPermission(function(permission){
          var notification = new Notification("Hola Mundo");
          });
      }
      this.usuarioService.modificarGeneralPublicacion(x);
      this.listadoPublicacion(this.variable.keypadre, this.variable.$key);

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
        // x.likes = x.likes - 1;
        array = array.slice(1, position);
        x.quienLike = [];
        x.quienLike = array;
      } else {
        // x.likes = x.likes + 1;
        array.push(localStorage.getItem("cliente"));
        x.quienLike = [];
        x.quienLike = array;
        this.variable.publi = x.foto;
        this.variable.Foto = this.usuarioOnline.Foto;
        this.variable.url = '/publicacion/' + x.keypadre + '/' + x.$key + '/publicacion';

        if (this.usuarioOnline.Correo !== localStorage.getItem("cliente")) {
          this.usuarioService.nuevaNotificacion(this.variable, undefined, this.usuarioOnline.Nick, this.duenio);
          Notification.requestPermission(function(permission){
            var notification = new Notification("Hola Mundo");
            });
        }
      }
      this.usuarioService.modificarGeneralPublicacion(x);
      this.listadoPublicacion(this.variable.keypadre, this.variable.$key);

    }
  }

  meGusta(x) {
    if (x.quienLike === undefined) {
      // x.likes = 1;
      x.quienLike = [];
      x.quienLike.push(localStorage.getItem("cliente"));
      this.variable.publi = x.foto;
      this.variable.Foto = this.usuarioOnline.Foto;
      this.variable.url = '/publicacion/' + x.keypadre + '/' + x.$key + '/captura';

      if (this.correo !== localStorage.getItem("cliente")) {
        this.usuarioService.nuevaNotificacion(this.variable, undefined, this.usuarioOnline.Nick, this.duenio);
        Notification.requestPermission(function(permission){
          var notification = new Notification("Hola Mundo");
          });
      }
      this.usuarioService.meGustaCap(x);
      this.listadoCaptura(this.variable.keypadre, this.variable.$key);

    } else {
      var aux = false;
      var position;
      var array = [];
      Object.keys(x.quienLike).map(function (key) {
        if (x.quienLike[key] === localStorage.getItem("cliente")) {
          aux = true;
          position = key;
        } else {
          array.push(x.quienLike[key]);
        }
      });
      if (aux) {
        // x.likes = x.likes - 1;
        x.quienLike = array;
      } else {
        // x.likes = x.likes + 1;
        array.push(localStorage.getItem("cliente"));
        x.quienLike = [];
        x.quienLike = array;
        this.variable.publi = x.foto;
        this.variable.Foto = this.usuarioOnline.Foto;
        this.variable.url = '/publicacion/' + x.keypadre + '/' + x.$key + '/captura';

        if (this.variable.Correo !== localStorage.getItem("cliente")) {

          // this.duenio.Nick = this.usuarioOnline.Nick;
          this.usuarioService.nuevaNotificacion(this.variable, undefined, this.usuarioOnline.Nick, this.duenio);
          Notification.requestPermission(function(permission){
            var notification = new Notification("Hola Mundo");
            });
        }
      }

      this.usuarioService.meGustaCap(x);
      this.listadoCaptura(this.variable.keypadre, this.variable.$key);
    }

  }

  listadoPublicacion(keypadre, key) {
    let primeraVez = true;
    this.usuarioService.listadoPublicacion(keypadre)
      .snapshotChanges()
      .subscribe(data => {
        this.variable = null;
        data.map(element => {
          let x = element.payload.toJSON();
          if (element.key === key) {
            x["$key"] = key;
            if (x["comentarios"] !== undefined) {
              let aux = x["comentarios"];
              this.comentarios = [];
              Object.keys(aux).map(element => {
                this.comentarios.push(aux[element]);
              });
            }
            if (x["quienLike"] !== undefined) {
              var y = [];
              Object.keys(x["quienLike"]).map(element => {
                y.push(x["quienLike"][element]);
              });
              x["likes"] = y.length;
            } else {
              x["likes"] = 0;
            }

            if (x["quienSeguidos"] !== undefined) {
              let aux = x["quienSeguidos"];
              Object.keys(aux).map(element => {
                console.log(aux[element]);
                if (this.usuarioOnline === aux[element]) {
                  this.seguir = false;
                }
              });
            }
            this.variable = x;
            this.variable.keypadre = keypadre;
            console.log(this.variable);
          };
        });


        this.cargando = false;
        primeraVez = false;
      });
  }

  listadoCaptura(keypadre, key) {
    let primeraVez = true;
    this.usuarioService.listadoCaptuas(keypadre)
      .snapshotChanges()
      .subscribe(data => {
        this.variable = null;

        data.map(element => {
          let x = element.payload.toJSON();
          if (element.key === key) {
            x["$key"] = key;
            x["keypadre"] = keypadre;
            if (x["comentarios"] !== undefined) {
              let aux = x["comentarios"];
              this.comentarios = [];
              Object.keys(aux).map(element => {
                this.comentarios.push(aux[element]);
              });
            }
            if (x["quienLike"] !== undefined) {
              var y = [];
              Object.keys(x["quienLike"]).map(element => {
                y.push(x["quienLike"][element]);
              });
              x["likes"] = y.length;
            } else {
              x["likes"] = 0;
            }
            this.variable = x;
            // let a  = document.getElementsByTagName("BODY") as HTMLCollectionOf<HTMLElement>;
            // a[0].style.zoom='0.0';
            document.body.style.zoom = '100%';

          };
        });

        this.cargando = false;
      });
  }

  borrar() {
    let confirmar = confirm("¿Estas seguro de querer borrar esta publicación? No se podrá recuperar");
    if (confirmar) {
      const tipo = this.activatedRoute.snapshot.paramMap.get("tipo");

      if (tipo === 'publicacion') {
        this.usuarioService.borrarPubli(this.variable.$key, this.variable.keypadre);
      } else {
        this.usuarioService.borrarCaptura(this.variable.$key, this.variable.keypadre);
      }
    }

  }
  editarPublicacion
  comentar() {
    if (this.comentario !== "") {

      let array = [];
      if (this.comentario !== "") {

        let x = this.variable.comentarios;
        if (x !== undefined) {
          Object.keys(x).map(function (key) {
            array.push(x[key]);
          });
        }

        var aux =
        {
          comentario: this.comentario,
          Nick: this.usuarioOnline.Nick,
          foto: this.usuarioOnline.Foto
        }
      } else {
        var aux =
        {
          comentario: this.comentario,
          Nick: this.usuarioOnline.Nick,
          foto: this.usuarioOnline.Foto
        }
      }

      array.push(aux);

      let publi = this.variable;
      publi.comentarios = array;



      if (this.variable.keypadre === undefined) {

        if (this.variable.forma === undefined) {
          this.usuarioService.modificarGeneralPublicacion(publi)
        } else {
          this.usuarioService.modificarGeneralCaptura(publi)
        }
      } else {
        let auxd = {
          Accion: "comento una publicacion",
          Foto: this.usuarioOnline.Foto,
          Nick: this.usuarioOnline.Nick,
          publi: this.variable.foto,
          $key: publi.keypadre,
          url: '/publicacion/' + publi.keypadre + '/' + this.variable.$key + '/' + ((this.variable.forma === undefined) ? 'publicacion' : 'captura')
        }
        if (this.variable.Nick !== this.usuarioOnline.Nick) {
          this.usuarioService.nuevaNotificacion(auxd, true, undefined, this.duenio);
          Notification.requestPermission(function(permission){
            var notification = new Notification("Hola Mundo");
            });
        }
        console.log(publi);
        if (this.variable.forma === undefined) {
          this.usuarioService.comentarPubli(publi)
        } else {
          this.usuarioService.comentarCaptu(publi)
        }
      }

      this.comentario = "";
    }
  }
  compartir() {
    if (window.navigator && window.navigator['share']) {


      window.navigator['share']({
        title: 'Esta es una publicacion de SocialPesca',
        text: '¡Mirá esta publicación de SocialPesca!',
        url: window.location.href,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      alert('Tu navegador no permite compartir esta publicación');
    }
  }
  meGustaProducto(x) {
    if (x.quienLike === undefined) {
      // x.likes = 1;
      x.quienLike = [];
      x.quienLike.push(localStorage.getItem("tienda"));
      this.variable.publi = x.foto;
      this.variable.Foto = this.usuarioOnline.Foto;
      this.variable.url = '/publicacion/' + x.keypadre + '/' + x.$key + '/captura';

      if (this.correo !== localStorage.getItem("cliente")) {
        // this.usuarioService.nuevaNotificacion(this.variable, undefined, this.usuarioOnline.Nick, this.duenio);
      }
      this.usuarioService.meGustaProducto(x);
      this.listadoCaptura(this.variable.keypadre, this.variable.$key);

    } else {
      var aux = false;
      var position;
      var array = [];
      Object.keys(x.quienLike).map(function (key) {
        if (x.quienLike[key] === localStorage.getItem("tienda")) {
          aux = true;
          position = key;
        } else {
          array.push(x.quienLike[key]);
        }
      });
      if (aux) {
        // x.likes = x.likes - 1;
        x.quienLike = array;
      } else {
        // x.likes = x.likes + 1;
        array.push(localStorage.getItem("tienda"));
        x.quienLike = [];
        x.quienLike = array;
        this.variable.publi = x.foto;
        this.variable.Foto = this.usuarioOnline.Foto;
        this.variable.url = '/publicacion/' + x.keypadre + '/' + x.$key + '/captura';

        if (this.variable.Correo !== localStorage.getItem("cliente")) {

        }
      }

      this.usuarioService.meGustaProducto(x);
      this.listadoCaptura(this.variable.keypadre, this.variable.$key);
    }

  }
}

