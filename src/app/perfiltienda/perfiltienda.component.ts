import { Component, OnInit } from '@angular/core';
import { Imgupload } from '../interfaces/imgupload';
import { SesionService } from '../services/sesion.service';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-perfiltienda',
  templateUrl: './perfiltienda.component.html',
  styleUrls: ['./perfiltienda.component.css']
})
export class PerfiltiendaComponent implements OnInit {
  currentFileUpload: Imgupload;
  listPublicaciones: any[];
  listCapturas: any[];
  listadoTodo: any[];
  isGrupo: boolean;
  isCaptura: boolean;
  isPublicacion: boolean;
  isGrupos: boolean;
  isMobile: boolean;
  selected: any;
  selectedBorrar;
  usuario;
  key: string;
  puntos;
  constructor(
    private usuarioService: SesionService,
    private ng2ImgMax: Ng2ImgMaxService,
  ) {
    this.isGrupo = false;
    this.isCaptura = false;
    this.isPublicacion = false;
    this.usuario = {
      Portada: ""
    }
    this.puntos = 0;
    this.isMobile = false;
  }
  url = "https://pbs.twimg.com/media/CpAyNN4WAAEknnf.jpg";

  ngOnInit() {
    if(window.innerWidth < 768){
      this.isMobile = true;
    }
    let aux = true;
    let aux2 = true;
    let aux3 = true;
    this.usuarioService.listadoUsuario()
      .snapshotChanges()
      .subscribe(Data => {
        this.puntos = 0;
        Data.map(element => {
          let x = element.payload.toJSON();
          if (x["Correo"] === localStorage.getItem("tienda")) {
            if (aux3) {

              this.listadoTodo = [];
              aux3 = false;
            }

            x["$key"] = element.key;
            this.usuario = x;
            console.log(this.usuario);
            if(x["Puntos"]!== undefined){
              Object.keys(this.usuario.Puntos).map(elemento => {
                this.puntos = this.usuario.Puntos[elemento].puntos + this.puntos;
              });
            }else{
              this.puntos = 0;
            }

            this.key = element.key;
            let varFoto = x["Foto"];
            if (x["Publicacion"] !== undefined) {
              this.usuarioService.listadoPublicacion(element.key)
                .snapshotChanges()
                .subscribe(data => {
                  if (aux) {

                    this.listPublicaciones = [];

                    data.map(element => {
                      let x = element.payload.toJSON();
                      x["$key"] = element.key;
                      x["fperfil"] = varFoto;
                      this.listPublicaciones.push(x);
                      this.listadoTodo.push(x);
                      var n, i, k, aux;
                      n = this.listadoTodo.length;
                      for (k = 1; k < n; k++) {
                        for (i = 0; i < (n - k); i++) {
                          if (this.listadoTodo[i].fecha > this.listadoTodo[i + 1].fecha) {
                            aux = this.listadoTodo[i];
                            this.listadoTodo[i] = this.listadoTodo[i + 1];
                            this.listadoTodo[i + 1] = aux;
                          }
                        }
                      }
                    });
                    aux = false;
                  }

                });
            }
            if (x["Capturas"] !== undefined) {
              this.usuarioService.listadoCaptuas(element.key)
                .snapshotChanges()
                .subscribe(data => {
                  if (aux2) {

                    this.listCapturas = [];
                    data.map(element => {
                      let x = element.payload.toJSON();
                      x["$key"] = element.key;
                      x["fperfil"] = varFoto;

                      this.listCapturas.push(x);
                      this.listadoTodo.push(x);
                      var n, i, k, aux;
                      n = this.listadoTodo.length;
                      for (k = 1; k < n; k++) {
                        for (i = 0; i < (n - k); i++) {
                          var j = this.listadoTodo[i].fecha.split("-");
                          if (this.listadoTodo[i].fecha < this.listadoTodo[i + 1].fecha) {
                            aux = this.listadoTodo[i];
                            this.listadoTodo[i] = this.listadoTodo[i + 1];
                            this.listadoTodo[i + 1] = aux;
                          }
                        }
                      }
                    });
                    aux2 = false;
                  }

                });
            }
          }
        });
      });
  }

  meGusta(x) {
    if (x.quienLike === undefined) {
      x.likes = 1;
      x.quienLike = [];
      x.quienLike.push(localStorage.getItem("tienda"));
      this.usuarioService.modificarGeneralCaptura(x);

    } else {
      var aux = false;
      var position;
      var array = [];
      Object.keys(x.quienLike).map(function (key) {
        array.push(x.quienLike[key]);
        if (x.quienLike[key] === localStorage.getItem("tienda")) {
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
        array.push(localStorage.getItem("tienda"));
        x.quienLike = [];
        x.quienLike = array;
      }
      this.usuarioService.modificarGeneralCaptura(x);
    }

  }
  meGustaP(x) {
    if (x.quienLike === undefined) {
      x.likes = 1;
      x.quienLike = [];
      x.quienLike.push(localStorage.getItem("tienda"));
      this.usuarioService.modificarGeneralPublicacion(x);
    } else {
      var aux = false;
      var position;
      var array = [];
      Object.keys(x.quienLike).map(function (key) {
        array.push(x.quienLike[key]);
        if (x.quienLike[key] === localStorage.getItem("tienda")) {
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
        array.push(localStorage.getItem("tienda"));
        x.quienLike = [];
        x.quienLike = array;
      }
      this.usuarioService.modificarGeneralPublicacion(x);
    }
  }
  CambiarFoto() {
    var input = document.createElement('input');
    input.type = 'file';
    input.click();

    input.onchange = e => {
      var file = (<HTMLInputElement>e.target).files[0];
      let image = file;
      this.ng2ImgMax.resizeImage(image, 800, 600).subscribe(
        result => {
          var files = result; // FileList object
          image = result;
          
            this.currentFileUpload = new Imgupload(image);
            this.currentFileUpload.$key = Math.random();
            this.usuarioService.CambiarPerfil(this.currentFileUpload, this.usuario);
          console.log("Se supone que termino");
        },
        error => {
          alert('¡La foto que estas intentando subir no es un formato permitido 😢!');
        }
      );
    }

  }
  CambiarPortada() {
  
    var input = document.createElement('input');
    input.type = 'file';
    input.click();

    input.onchange = e => {
      var file = (<HTMLInputElement>e.target).files[0];
      let image = file;
      this.ng2ImgMax.resizeImage(image, 800, 600).subscribe(
        result => {
          var files = result; // FileList object
          image = result;
            this.currentFileUpload = new Imgupload(image);
            this.currentFileUpload.$key = Math.random();
            this.usuarioService.CambiarPortada(this.currentFileUpload, this.usuario);
        },
        error => {
          alert('¡La foto que estas intentando subir no es un formato permitido 😢!');
        }
      );
    }
  }
}
