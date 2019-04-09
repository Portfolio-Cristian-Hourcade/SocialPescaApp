import { Component, OnInit } from '@angular/core';
import { SesionService } from '../services/sesion.service';
import { Usuario } from '../interfaces/usuario';

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
  isNick: boolean;
  thisNick;
  quienSigo: any[];
  selected;

  constructor(
    private sesionService: SesionService
  ) {
    this.isNick = false;
    this.usuario = {};
  }

  ngOnInit() {
    this.listadoTodos = [];
    let primeraVez = true;
    let primeraVez2 = true;

    this.sesionService.listadoUsuario()
      .snapshotChanges()
      .subscribe(data => {
        if (primeraVez) {

          data.map(element => {
            let x = element.payload.toJSON();
            if (x["Correo"] === localStorage.getItem("cliente")) {
              x["$key"] = element.key;
              this.thisNick = x["Nick"];
              this.key = x["$key"]
              if (x["Nick"] === undefined || x["Nick"] === null || x["Nick"] === "") {
                this.isNick = true;
                x["Nick"] = "";
              }
              this.usuario = x;
              if (this.usuario.quienSeguidos !== undefined) {
                let aux = this.usuario.quienSeguidos;
                this.quienSigo = [];
                Object.keys(aux).map(key => {
                  this.quienSigo.push(aux[key]);
                });
              }
            }
          });
          let aux3 = true;

          this.sesionService.listadoPublicacion(this.key)
            .snapshotChanges()
            .subscribe(data => {
              if (aux3) {

                data.forEach(element => {
                  let z = element.payload.toJSON();
                  z["$key"] = element.key;
                  z["keypadre"] = this.key;
                  z["fperfil"] = this.usuario.Foto;
                  let auxilar = z["etiqueta"];
                  // z["etiqueta"] = auxilar.replace(/,/g, " ");
                  this.listadoTodos.push(z);
                  var n, i, k, aux;
                  n = this.listadoTodos.length;
                  for (k = 1; k < n; k++) {
                    for (i = 0; i < (n - k); i++) {
                      var j = this.listadoTodos[i].fecha.split("-");
                      if (this.listadoTodos[i].fecha < this.listadoTodos[i + 1].fecha) {
                        aux = this.listadoTodos[i];
                        this.listadoTodos[i] = this.listadoTodos[i + 1];
                        this.listadoTodos[i + 1] = aux;
                      }
                    }
                  }
                });
                aux3 = false;
              }
            });
          let aux4 = true;

          this.sesionService.listadoCaptuas(this.key)
            .snapshotChanges()
            .subscribe(data => {
              if (aux4) {

                data.forEach(element => {
                  let z = element.payload.toJSON();
                  z["$key"] = element.key;
                  z["keypadre"] = this.key;
                  z["fperfil"] = this.usuario.Foto;
                  this.listadoTodos.push(z);
                  var n, i, k, aux;
                  n = this.listadoTodos.length;
                  for (k = 1; k < n; k++) {
                    for (i = 0; i < (n - k); i++) {
                      var j = this.listadoTodos[i].fecha.split("-");
                      if (this.listadoTodos[i].fecha < this.listadoTodos[i + 1].fecha) {
                        aux = this.listadoTodos[i];
                        this.listadoTodos[i] = this.listadoTodos[i + 1];
                        this.listadoTodos[i + 1] = aux;
                      }
                    }
                  }
                });
                aux4 = false;
              }
            });
          primeraVez = false;
        }


        this.sesionService.listadoUsuario()
          .snapshotChanges()
          .subscribe(data => {
            if (primeraVez2) {

              data.forEach(element => {

                let y = element.payload.toJSON();
                y["$key"] = element.key;
                if (this.quienSigo !== undefined)

                  this.quienSigo.map(element => {
                    if (element === y["Nick"]) {
                      let aux = true;
                      this.sesionService.listadoCaptuas(y["$key"])
                        .snapshotChanges()
                        .subscribe(data => {
                          if (aux) {

                            data.forEach(element => {
                              let z = element.payload.toJSON();
                              z["$key"] = element.key;
                              z["keypadre"] = y["$key"];
                              z["fperfil"] = y["Foto"];
                              this.listadoTodos.push(z);
                              var n, i, k, aux;
                              n = this.listadoTodos.length;
                              for (k = 1; k < n; k++) {
                                for (i = 0; i < (n - k); i++) {
                                  var j = this.listadoTodos[i].fecha.split("-");
                                  if (this.listadoTodos[i].fecha < this.listadoTodos[i + 1].fecha) {
                                    aux = this.listadoTodos[i];
                                    this.listadoTodos[i] = this.listadoTodos[i + 1];
                                    this.listadoTodos[i + 1] = aux;
                                  }
                                }
                              }
                            });
                            aux = false;
                          }
                        });
                      let aux2 = true;

                      this.sesionService.listadoPublicacion(y["$key"])
                        .snapshotChanges()
                        .subscribe(data => {
                          if (aux2) {

                            data.forEach(element => {
                              let z = element.payload.toJSON();
                              z["$key"] = element.key;
                              z["keypadre"] = y["$key"];
                              z["fperfil"] = y["Foto"];
                              this.listadoTodos.push(z);
                              var n, i, k, aux;
                              n = this.listadoTodos.length;
                              for (k = 1; k < n; k++) {
                                for (i = 0; i < (n - k); i++) {
                                  var j = this.listadoTodos[i].fecha.split("-");
                                  if (this.listadoTodos[i].fecha < this.listadoTodos[i + 1].fecha) {
                                    aux = this.listadoTodos[i];
                                    this.listadoTodos[i] = this.listadoTodos[i + 1];
                                    this.listadoTodos[i + 1] = aux;
                                  }
                                }
                              }
                            });
                            aux2 = false;
                          }
                        });
                    }
                  });
              });
              primeraVez2 = false;
              var n, i, k, aux;
              n = this.listadoTodos.length;
              for (k = 1; k < n; k++) {
                for (i = 0; i < (n - k); i++) {
                  var j = this.listadoTodos[i].fecha.split("-");
                  if (this.listadoTodos[i].fecha < this.listadoTodos[i + 1].fecha) {
                    aux = this.listadoTodos[i];
                    this.listadoTodos[i] = this.listadoTodos[i + 1];
                    this.listadoTodos[i + 1] = aux;
                  }
                }
              }
            }

          });
      });
  }

  AgregarNick() {
    if (this.usuario.Nick !== "") {
      this.isNick = false;
      this.sesionService.updateNick(this.usuario);
      location.reload();
    }
  }

  meGusta(x) {

    if (x.quienLike === undefined) {
      x.likes = 1;
      x.quienLike = [];
      x.quienLike.push(localStorage.getItem("cliente"));
      this.sesionService.meGustaCap(x);
      this.usuario.publi = x.foto;
      let obj = this.usuario;
      obj.$key = x.keypadre;
      if (this.key !== x.keypadre) {
        this.sesionService.nuevaNotificacion(this.usuario);
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
        let obj = this.usuario;
        obj.$key = x.keypadre;
        if (this.key !== x.keypadre) {
          this.sesionService.nuevaNotificacion(obj);
        }
      }
      this.sesionService.meGustaCap(x);
    }

  }
  meGustaP(x) {

    if (x.quienLike === undefined) {
      x.likes = 1;
      x.quienLike = [];
      x.quienLike.push(localStorage.getItem("cliente"));
      this.sesionService.meGustaPub(x);
      this.usuario.publi = x.foto;
      let obj = this.usuario;
      obj.$key = x.keypadre;
      if(this.key !== x.keypadre){
        this.sesionService.nuevaNotificacion(this.usuario);
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
        let obj = this.usuario;
        obj.$key = x.keypadre;
        if (this.key !== x.keypadre) {
          this.sesionService.nuevaNotificacion(this.usuario);
        }
      }
      this.sesionService.meGustaPub(x);
    }
  }
}
