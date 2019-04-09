import { Component, OnInit } from '@angular/core';
import { SesionService } from '../services/sesion.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  isGrupo: boolean;
  isPerfil: boolean;
  isBusqueda: boolean;
  listadoTodos: any[];

  myNick;
  isMobile: boolean;
  listadoTodosView: any[];
  listPerfil: any[];
  listGrupos: any[];
  selected: any[];
  usuario;

  constructor(
    private dashboardService: SesionService
  ) {
    this.isBusqueda = false;
    this.isGrupo = false;
    this.isPerfil = false;
    this.isMobile = false;
  }

  ngOnInit() {
    if (window.innerWidth < 768) {
      this.isMobile = true;
    }
    let primeraVez = true;
    this.dashboardService.listadoUsuario()
      .snapshotChanges()
      .subscribe(Data => {
        if (primeraVez) {

          this.listadoTodos = [];
          Data.map(element => {
            let x = element.payload.toJSON();
            x["$key"] = element.key;
            this.listadoTodos.push(x);
            if (x["Correo"] === localStorage.getItem("cliente")) {
              this.usuario = x;
              this.myNick = x["Nick"];
            }
            if (x["Capturas"] !== undefined) {

              this.listPerfil = [];
              let aux = true;
              this.dashboardService.listadoCaptuasLikes(x["$key"])
                .snapshotChanges()
                .subscribe(data => {
                  if (aux) {
                    data.map(element => {
                      let z = element.payload.toJSON();
                      z["key"] = element.key;
                      z["fperfil"] = x["Foto"];
                      z["keypadre"] = x["$key"];
                      z["Correo"] = x["Correo"];
                      this.listPerfil.push(z);
                    });
                    aux = false;
                  }
                });
            }
          });
          this.listadoTodos = this.listadoTodos.sort(function () { return Math.random() - 0.5 });
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
      let obj = this.usuario;
      obj.$key = x.keypadre;
      if(x.Correo !== localStorage.getItem("cliente")){
        this.dashboardService.nuevaNotificacion(this.usuario);
      }
      this.dashboardService.meGustaCap(x);

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
      if(x.Correo !== localStorage.getItem("cliente")){
        this.dashboardService.nuevaNotificacion(this.usuario);
      }
      }
      this.dashboardService.meGustaCap(x);
    }

  }
  meGustaP(x) {
    if (x.quienLike === undefined) {
      x.likes = 1;
      x.quienLike = [];
      x.quienLike.push(localStorage.getItem("cliente"));
      this.usuario.publi = x.foto;
      let obj = this.usuario;
      obj.$key = x.keypadre;
      if(x.Correo !== localStorage.getItem("cliente")){
        this.dashboardService.nuevaNotificacion(this.usuario);
      }
      this.dashboardService.meGustaPub(x);
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
        if(x.Correo !== localStorage.getItem("cliente")){
          this.dashboardService.nuevaNotificacion(this.usuario);
        } 
      }
      this.dashboardService.meGustaPub(x);
    }
  }
  Escribiendo(value) {
    if (value.lenght === 0) {
      this.listadoTodosView = [];
    }
    this.listadoTodosView = [];
    this.listadoTodos.forEach(element => {
      if (element.Nick.match(value)) {
        let aux = {
          Nick: element.Nick,
          Foto: element.Foto,
          Seguidores: element.Seguidores,
          Seguidos: element.Seguidos
        }
        this.listadoTodosView.push(aux);
      }
    });

  }
}
