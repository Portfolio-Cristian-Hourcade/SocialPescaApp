import { Component, OnInit } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { SesionService } from '../services/sesion.service';
import { Imgupload } from '../interfaces/imgupload';

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
  constructor(
    private usuarioService: SesionService
  ) {
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

  seleccionarFoto(event) {
    this.selectedFiles = event.target.files;
    var files = event.target.files; // FileList object
    if (this.selectedFiles[0].size > 2000000 && (this.selectedFiles[0].type !== "image/jpg" && this.selectedFiles[0].type !== "image/jpeg" && this.selectedFiles[0].type !== "image/png")) {
      this.selectedFiles = null;
      this.ErrorImg = true;
    } else {
      this.isFoto = true;
      //Obtenemos la imagen del campo "file". 
      for (var i = 0, f; f = files[i]; i++) {
        //Solo admitimos imágenes.
        if (!f.type.match('image.*')) {
          continue;
        }

        var reader = new FileReader();

        reader.onload = (function (theFile) {
          return function (e) {
            // Creamos la imagen.
            document.getElementById("img").innerHTML =
              ['<img class="thumb" id="thumb" style="width:100%;height:100%;" src="', e.target.result, '" title="', '"/>'].join('');
          };
        })(f);

        reader.readAsDataURL(f);

        this.imagen.push(f);
      }

      // reader.readAsDataURL(f);
    }
  }
  imagen;
  BorrarImagen() {
    this.isFoto = false;
    let imagen = document.getElementById("thumb")
    let padre = imagen.parentNode;
    padre.removeChild(imagen);

  }

  agregar() {
    if (this.imagen === undefined || this.imagen === null || this.imagen.length === 0 || this.cliente.Publicacion.descripcion === "" || this.cliente.Publicacion.etiqueta === "") {
      this.isProblema = true;
    } else {
      this.isCarga = true;
      const file = this.imagen;
      this.currentFileUpload = new Imgupload(file[0]);
      this.currentFileUpload.$key = Math.random();
      this.usuarioService.pushFileToStorageB(this.currentFileUpload, this.cliente);
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
      this.usuarioService.pushFileToStorage(this.currentFileUpload, this.cliente);
    }
  }

  
  listadoFiltrado;
  filtrar(value) {
    let aux;
    if (value.indexOf(",") !== -1) {
      aux = value.split(",");
      value = aux[aux.length-1];
    }
      this.listadoFiltrado = [];
      this.listNick.forEach(element => {
        if (element.Nick.toUpperCase().match(value.toUpperCase())) {
          this.listadoFiltrado.push(element);
        }
      });
    
  }
  agregarEtiqueta(x){
    let aux = <HTMLInputElement> document.getElementById("etiqueta1");
    if(this.cliente.Publicacion.etiqueta.indexOf(",") !== -1){
      let aux3 = this.cliente.Publicacion.etiqueta.split(",");
      let value = ","+aux3[aux3.length-1];
      console.log(value);

      this.cliente.Publicacion.etiqueta = this.cliente.Publicacion.etiqueta.replace(value,",");
      this.cliente.Publicacion.etiqueta = this.cliente.Publicacion.etiqueta + x.Nick + ","
    }else{
      this.cliente.Publicacion.etiqueta = "";
      this.cliente.Publicacion.etiqueta = x.Nick+',';
    }
    this.listadoFiltrado.length=0
  }
}

