import { Component, OnInit } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { SesionService } from '../services/sesion.service';
import { Imgupload } from '../interfaces/imgupload';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-nuevoproducto',
  templateUrl: './nuevoproducto.component.html',
  styleUrls: ['./nuevoproducto.component.css']
})
export class NuevoproductoComponent implements OnInit {
  selectedFiles;
  isCaptura: boolean;
  isPublicacion: boolean;
  isFoto: boolean;
  ErrorImg: boolean;
  currentFileUpload: Imgupload;


  isMobile: boolean;
  isProblema: boolean;
  isCarga: boolean;

  cliente;
  listNick;
  etiqueta1: boolean;
  etiqueta2: boolean;
  constructor(
    private usuarioService: SesionService,
    private ng2ImgMax: Ng2ImgMaxService,

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
        link: "",
        precio: 0,
        envio: "",
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
          if (x["Correo"] === localStorage.getItem("tienda")) {
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

  seleccionarFoto(event) {
    this.selectedFiles = event.target.files;
    let image = event.target.files[0];
    this.ng2ImgMax.resizeImage(image, 800, 600).subscribe(
      result => {
        this.selectedFiles = result;
        console.log(result)
        var files = result; // FileList object
        if (result.size > 2000000 && (result.type !== "image/jpg" && result.type !== "image/jpeg" && result.type !== "image/png")) {
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
          this.imagen.push(files);
        }
      },
      error => {
        console.log('😢 Oh no!', error);
      }
    );
    // reader.readAsDataURL(f);
  }

imagen;
BorrarImagen() {
  this.isFoto = false;
  let imagen = document.getElementById("thumb")
  let padre = imagen.parentNode;
  padre.removeChild(imagen);

}

agregarPublicacion() {
  if (this.imagen === undefined || this.imagen === null || this.imagen.length === 0 || this.cliente.Capturas.forma === "" || this.cliente.Capturas.envio === "" || this.cliente.Capturas.descripcion === "" || this.cliente.Capturas.link === "" || this.cliente.Capturas.precio === "") {
    this.isProblema = true;
  } else {
    this.isCarga = true;
    const file = this.imagen;
    this.currentFileUpload = new Imgupload(file[0]);
    this.currentFileUpload.$key = Math.random();

    this.usuarioService.nuevoProducto(this.currentFileUpload, this.cliente);
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

}
