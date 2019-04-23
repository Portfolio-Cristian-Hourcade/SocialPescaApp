import { Component, OnInit } from '@angular/core';
import { SesionService } from '../services/sesion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-otroperfil',
  templateUrl: './otroperfil.component.html',
  styleUrls: ['./otroperfil.component.css']
})
export class OtroperfilComponent implements OnInit {
  listPublicaciones: any[];
  listCapturas: any[];
  listadoTodo: any[];
  isGrupo: boolean;
  isCaptura: boolean;
  isPublicacion: boolean;
  selected: any;
  selectedBorrar;
  usuario;
  key: string;
  Unfollow: boolean;
  aux;
  Nick;
  onlinex;
  isMobile: boolean;
  puntos;

  constructor(
    private usuarioService: SesionService,
    private activatedRoute: ActivatedRoute
  ) {
    this.puntos = 0;
    this.isGrupo = false;
    this.isCaptura = false;
    this.isPublicacion = false;
    this.Unfollow = false;
    this.usuario = {
      Portada: ""
    }
    this.isMobile = false;

  }
  url = "https://pbs.twimg.com/media/CpAyNN4WAAEknnf.jpg";

  ngOnInit() {
    if (window.innerWidth < 768) {
      this.isMobile = true;
    }
    let aux = true;
    let aux2 = true;
    let primeraVez = true;
    let todo = true;
    this.usuarioService.listadoUsuario()
      .snapshotChanges()
      .subscribe(Data => {
        if (todo) {
          this.listadoTodo = [];
          todo = false;
        }
        this.usuario = null;
        Data.map(element => {

          let x = element.payload.toJSON();
          if (x["Correo"] === localStorage.getItem("cliente")) {
            x["$key"] = element.key;
            this.onlinex = x;
          }
          if (x["Nick"] === this.activatedRoute.snapshot.paramMap.get("nick")) {


            x["$key"] = element.key;
            this.usuario = x;
            if (x["Puntos"] !== undefined) {
              Object.keys(this.usuario.Puntos).map(elemento => {
                this.puntos = this.usuario.Puntos[elemento].puntos + this.puntos;
              });
            } else {
              this.puntos = 0;
            }

            this.aux = this.usuario.quienSeguidores;
            this.key = element.key;
            let varFoto = x["Foto"]

            if (x["Publicacion"] !== undefined) {
              this.usuarioService.listadoPublicacion(element.key)
                .snapshotChanges()
                .subscribe(data => {
                  if (aux2) {
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
                    aux2 = false;
                  }

                });
            }
            if (x["Capturas"] !== undefined) {
              this.usuarioService.listadoCaptuas(element.key)
                .snapshotChanges()
                .subscribe(data => {
                  if (aux) {

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
                    aux = false;
                  }
                });
            }


          }

        });
        if (primeraVez) {
          if (this.onlinex.quienSeguidos === undefined) {
            this.onlinex.quienSeguidos = null;
          }
          if (this.usuario.quienSeguidores !== undefined) {

            Object.keys(this.usuario.quienSeguidores).map(element => {
              if (this.onlinex.Nick === this.usuario.quienSeguidores[element]) {
                this.Unfollow = true;
              }
            });
          }
          primeraVez = false;
        }

      });
  }

  meGusta(x) {
    if (x.quienLike === undefined) {
      x.likes = 1;
      x.quienLike = [];
      x.quienLike.push(localStorage.getItem("cliente"));
      this.usuario.publi = x.foto;
      if (this.key !== x.keypadre) {
        this.usuarioService.nuevaNotificacion(this.usuario);
      }
      this.usuarioService.modificarGeneralCaptura(x);

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
        let auxUsuario = this.usuario;
        auxUsuario.Nick = this.onlinex.Nick;
        if (this.key !== x.keypadre) {
          this.usuarioService.nuevaNotificacion(auxUsuario);
        }
      }
      this.usuarioService.modificarGeneralCaptura(x);

    }

  }
  meGustaP(x) {

    if (x.quienLike === undefined || x.quienLike.length === 0) {
      x.likes = 1;
      x.quienLike = [];
      x.quienLike.push(localStorage.getItem("cliente"));
      this.usuario.publi = x.foto;
      if (this.key !== x.keypadre) {
        this.usuarioService.nuevaNotificacion(this.usuario);
      }
      this.usuarioService.modificarGeneralPublicacion(x);
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
        if (this.key !== x.keypadre) {
          this.usuarioService.nuevaNotificacion(this.usuario);
        }
      }
      this.usuarioService.modificarGeneralPublicacion(x);
    }

  }

  Seguir() {

    if (this.usuario.quienSeguidos === undefined) {
      this.usuario.quienSeguidos = null
    }



    let array = [];
    if (this.usuario.quienSeguidores === undefined) {


      /** Si los seguidores de la cuenta es 0 **/
      this.usuario.quienSeguidores = [this.onlinex.Nick];
      this.usuario.Seguidores = this.usuario.Seguidores + 1;


      console.log(this.onlinex);
      /**  Si los usuarios que sigue el usuario online es igual a 0**/
      if (this.onlinex.quienSeguidos === undefined || this.onlinex.quienSeguidos === null) {
        this.onlinex.quienSeguidos = [this.usuario.Nick];
        this.onlinex.Seguidos = 1;


        /** Si los usuaros que sigue el usuario es diferente a 0**/
      } else {
        var arrayAux = []
        var aux = this.onlinex.quienSeguidos;
        if (aux !== undefined) {
          Object.keys(aux).map(key => {
            arrayAux.push(aux[key]);
          });
        }
        arrayAux.push(this.usuario.Nick);
        this.onlinex.quienSeguidos = arrayAux;
        this.onlinex.Seguidos = this.onlinex.Seguidos + 1;
      }
      /*************************************************************/

      this.usuarioService.updateNick(this.onlinex);




      /** Si los seguidores de la cuenta es diferente a 0 */
    } else {

      let aux = this.usuario.quienSeguidores;
      let boolean = true;

      /** Buscamos si el usuario online esta en la lista de seguidores **/
      Object.keys(aux).map(element => {
        // console.log(aux[element]);
        // console.log(this.onlinex.Nick)
        if (aux[element] === this.onlinex.Nick) {
          boolean = false;
        } else {
          array.push(aux[element]);
        }
      });

      /** Si no está en la lista **/
      if (boolean) {
        if (this.onlinex.quienSeguidos === undefined || this.onlinex.quienSeguidos === null) {
          this.onlinex.quienSeguidos = [this.usuario.Nick];
          array.push(this.onlinex.Nick);

          this.onlinex.Seguidos = 1;
        } else {
          console.log("este usuario online tiene seguidos")
          var arrayAux = []
          var aux2 = this.onlinex.quienSeguidos;
          console.log(aux2);
          if (aux2 !== undefined) {
            Object.keys(aux2).map(key => {
              arrayAux.push(aux2[key]);
            });
            arrayAux.push(this.usuario.Nick);

          } else {
            arrayAux = [];
            arrayAux.push(this.usuario.Nick);

          }
          this.onlinex.quienSeguidos = arrayAux;
          this.onlinex.Seguidos = this.onlinex.Seguidos + 1;
          array.push(this.onlinex.Nick);

        }
        this.usuario.Seguidores = this.usuario.Seguidores + 1;
        /** Si esta en la lista **/
      } else {
        var arrayAux = []
        var aux2 = this.onlinex.quienSeguidos;
        Object.keys(aux2).map(key => {
          console.log(aux2[key]);
          if (aux2[key] !== this.usuario.Nick) {
            arrayAux.push(aux2[key]);
          }
        });
        if (arrayAux[0] === undefined) {
          arrayAux = null;
        }
        this.onlinex.quienSeguidos = arrayAux;
        this.onlinex.Seguidos = this.onlinex.Seguidos - 1;
        this.usuario.Seguidores = this.usuario.Seguidores - 1;
      }
      console.log(array);
      this.usuarioService.updateNick(this.onlinex);
      this.usuario.quienSeguidores = array;
      // console.log(this.usuario);
    }
    this.usuarioService.updateNick(this.usuario);



    // COLOR BOTON
    if (this.usuario.quienSeguidores !== undefined) {
      if (this.onlinex !== undefined) {
        let boolean = false;
        var auxArr = this.usuario.quienSeguidores;
        Object.keys(auxArr).map(key => {
          if (auxArr[key] === this.onlinex.Nick) {
            boolean = true;
          }
        });
        if (boolean) {
          this.Unfollow = true;
        } else {
          this.Unfollow = false;
        }
      }
    }
  }
}
