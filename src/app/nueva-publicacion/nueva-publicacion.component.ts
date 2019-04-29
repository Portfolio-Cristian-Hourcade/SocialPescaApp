import { Component, OnInit } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { SesionService } from '../services/sesion.service';
import { Imgupload } from '../interfaces/imgupload';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { delay } from 'q';


@Component({
  selector: 'app-nueva-publicacion',
  templateUrl: './nueva-publicacion.component.html',
  styleUrls: ['./nueva-publicacion.component.css']
})
export class NuevaPublicacionComponent implements OnInit {
  selectedFiles;
  isCaptura: boolean;
  isPublicacion: boolean;
  isFoto: boolean;
  ErrorImg: boolean;
  currentFileUpload: Imgupload;


  isMobile: boolean;
  isProblema: boolean;
  isCarga: boolean;

  cliente: Usuario;
  listNick;
  etiqueta1: boolean;
  etiqueta2: boolean;
  constructor(
    private usuarioService: SesionService,
    private GlobalService: GlobalService,
    private ng2ImgMax: Ng2ImgMaxService,
    private Router : Router
  ) {
    this.etiqueta1 = false;
    this.etiqueta2 = false;
    this.isMobile = false;
    this.isCarga = false;
    this.isFoto = false;
    this.isCaptura = false;
    this.isPublicacion = false;
    this.ErrorImg = false;
    this.isProblema = false;
    this.cliente = {
      Capturas: {
        forma: "",
        descripcion: "",
        pescado: "",
        peso: "",
        donde: "",
        foto: ""
      }
    };
  }

  ngOnInit() {
    if (window.innerWidth < 768) {
      this.isMobile = true;
    }
    this.usuarioService.listadoUsuario()
      .snapshotChanges()
      .subscribe(data => {
        this.listNick = [];
        data.map(element => {
          let x = element.payload.toJSON();
          if (x["Correo"] === localStorage.getItem("cliente")) {
            x["$key"] = element.key;
            this.cliente = x;
            this.cliente.Publicacion = {
              descripcion: "",
              etiqueta: "",
              fecha: "",
              Nick: x["Nick"],
              likes: 0
            }
            this.cliente.Capturas = {
              Nick: x["Nick"],
              forma: "",
              descripcion: "",
              pescado: "",
              peso: "",
              donde: "",
              foto: "",
              fecha: "",
              likes: 0
            };
          } else {
            this.listNick.push(x);
          }
        });
      });
    this.imagen = [];
  }


  subiendo: boolean = false;
  seleccionarFoto(event) {
    this.subiendo = true;
    let image = event.target.files[0];
    this.ng2ImgMax.resizeImage(image, 800, 600).subscribe(
      result => {
        this.selectedFiles = result;
        console.log(result)
        var files = result; // FileList object
        if (result.size > 2000000 && (result.type !== "image/jpg" && result.type !== "image/jpeg" && result.type !== "image/png")) {
          this.subiendo = false;
          this.selectedFiles = null;
          this.ErrorImg = true;
        } else {

          this.isFoto = true;
          var reader = new FileReader();

          reader.onload = (function (theFile) {
            return function (e) {
              // Creamos la imagen.
              document.getElementById("img").innerHTML =
                ['<img class="thumb" id="thumb" style="width:100%;height:100%;" src="', e.target.result, '" title="', '"/>'].join('');
            };
          })(files);

          reader.readAsDataURL(files);
          this.subiendo = false;
          this.imagen.push(files);
        }
      },
      error => {
        console.log('😢 Oh no!', error);
      }
    );

  }
  imagen;
  BorrarImagen() {
    this.isFoto = false;
    let imagen = document.getElementById("thumb")
    let padre = imagen.parentNode;
    padre.removeChild(imagen);

  }

  agregar() {
    if (this.imagen === undefined || this.imagen === null || this.imagen.length === 0 || this.cliente.Publicacion.descripcion === "") {
      this.isProblema = true;
    } else {
      if (this.cliente.Publicacion.etiqueta === "") {
        this.cliente.Publicacion.etiqueta = "nadie";
      }

      let f = new Date();
      if (this.cliente.Puntos === undefined) {
        this.cliente.Puntos = {
          puntos: 10,
          fecha: f.getMonth() + 1 + "/" + f.getFullYear()
        }
      } else {
        let puntos = 0;
        Object.keys(this.cliente.Puntos).map(key => {
          puntos = puntos + this.cliente.Puntos[key].puntos;
        });
        this.cliente.Puntos = {
          puntos: puntos + 10,
          fecha: f.getMonth() + 1 + "/" + f.getFullYear()
        }
      }

      this.isCarga = true;
      const file = this.imagen;
      this.currentFileUpload = new Imgupload(file[0]);
      this.currentFileUpload.$key = Math.random();
      this.usuarioService.pushFileToStorageB(this.currentFileUpload, this.cliente);
      this.listadoHome();
    
    }
  }
  agregarPublicacion() {
    if (this.imagen === undefined || this.imagen === null || this.imagen.length === 0 || this.cliente.Capturas.donde === "" || this.cliente.Capturas.forma === "" || this.cliente.Capturas.descripcion === "" || this.cliente.Capturas.pescado === "" || this.cliente.Capturas.peso === "") {
      this.isProblema = true;
    } else {
      this.isCarga = true;
      const file = this.imagen;
      this.currentFileUpload = new Imgupload(file[0]);
      this.currentFileUpload.$key = Math.random();
      let f = new Date();
      if (this.cliente.Puntos === undefined) {
        this.cliente.Puntos = {
          puntos: 10,
          fecha: f.getMonth() + 1 + "/" + f.getFullYear()
        }
        
      } else {
        let puntos = 0;
        Object.keys(this.cliente.Puntos).map(key => {
          puntos = puntos + this.cliente.Puntos[key].puntos;
        });
        this.cliente.Puntos = {
          puntos: puntos + 10,
          fecha: f.getMonth() + 1 + "/" + f.getFullYear()
        }
      }
      this.usuarioService.pushFileToStorage(this.currentFileUpload, this.cliente);
      
      this.listadoHome()

    }
  }


  listadoFiltrado;
  filtrar(value) {
    let aux;
    if (value.indexOf(",") !== -1) {
      aux = value.split(",");
      value = aux[aux.length - 1];
    }
    this.listadoFiltrado = [];
    this.listNick.forEach(element => {
      if (element.Nick.toUpperCase().match(value.toUpperCase())) {
        this.listadoFiltrado.push(element);
      }
    });

  }
  agregarEtiqueta(x) {
    let aux = <HTMLInputElement>document.getElementById("etiqueta1");
    if (this.cliente.Publicacion.etiqueta.indexOf(",") !== -1) {
      let aux3 = this.cliente.Publicacion.etiqueta.split(",");
      let value = "," + aux3[aux3.length - 1];

      this.cliente.Publicacion.etiqueta = this.cliente.Publicacion.etiqueta.replace(value, ",");
      this.cliente.Publicacion.etiqueta = this.cliente.Publicacion.etiqueta + x.Nick + ","
    } else {
      this.cliente.Publicacion.etiqueta = "";
      this.cliente.Publicacion.etiqueta = x.Nick + ',';
    }
    this.listadoFiltrado.length = 0
  }

  listadoHome() {
    this.usuarioService.listadoUsuario()
      .snapshotChanges()
      .subscribe(data => {
        let myCapturas = [];
        let myPublicaciones = [];
        let myTotal = [];
        let Usuarios = [];
        let Listado = [];
        let arraySeguidores = [];
        data.map(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          if (x["Correo"] === localStorage.getItem("cliente")) {
            this.GlobalService.setUsuarioOnline(x);
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
            let aux = x["quienSeguidos"];

            if (aux !== undefined) {
              Object.keys(aux).map(elements => {
                arraySeguidores.push(aux[elements]);
              });
            }
            arraySeguidores.push(x["Nick"]);
          }
          Usuarios.push(x);
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
        this.GlobalService.setListadoHome(Listado);
        this.GlobalService.setListadoMiPerfilTotal(myTotal);
        setTimeout(()=>{ this.Router.navigateByUrl("/home") }, 4000)
        
      });
    }

}

