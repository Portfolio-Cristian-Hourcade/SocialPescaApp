import { Component, OnInit } from '@angular/core';
import { SesionService } from '../services/sesion.service';
import { GlobalService } from '../global.service';
import { _CdkTextareaAutosize } from '@angular/material';

// Declaramos las variables para jQuery
declare var jQuery: any;
declare var $: any;

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

  cargo: boolean;
  myNick;
  isMobile: boolean;
  listadoTodosView: any[];
  listPerfil: any[];
  listGrupos: any[];
  selected: any[];
  top: string;
  usuario;
  isDataAvailable: boolean = false;
  private NumberItem: number;
  isBlock: boolean;

  usoInterno : boolean;

  constructor(
    private GlobalService: GlobalService,
    private dashboardService: SesionService
  ) {
    this.top = "auto";
    const offset = 125;
    this.NumberItem = 12;
    this.isBlock = false;
    this.usoInterno = false;
    var _x = this;
    $(window).scroll(function () {
      if ($(window).scrollTop() + $(window).height() > $(document).height() - offset) {
        _x.NumberItem = _x.NumberItem + 12;
        if (_x.NumberItem > _x.listPerfil.length) {
          const y = _x.listPerfil;
          y.map(element => {
            _x.listPerfil.push(element);
          });
        }
      }
      
      _x.top = "2vh";
      if ($(window).scrollTop() < 290 && _x.usoInterno == true) {
        _x.usoInterno = false;
        $('.actualizar').animate({ opacity: 0 }, 800);
        
      }else if( $(window).scrollTop() > 290 && _x.usoInterno == false){
        _x.usoInterno = true;
        $('.actualizar').animate({ opacity: 1 }, 800);
      }
    });

    this.cargo = false;
    this.isBusqueda = false;
    this.isGrupo = false;
    this.isPerfil = false;
    this.isMobile = false;
  }
  ttt;
  ngOnInit() {

    var x = this.GlobalService.getListadoPerfilesBusqueda();
    if (x.length !== 0) {
      this.cargo = true;
      this.isMobile = true;
      this.isPerfil = true;

      this.listPerfil = this.GlobalService.getListadoBusqueda();
      this.listadoTodos = x;
      const usuario = this.GlobalService.getUsuarioOnline();;
      this.myNick = usuario.Nick;
    } else {

      this.isPerfil = true;
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
              if (x["Nick"] !== undefined) {
                this.listadoTodos.push(x);
              }
              if (x["Correo"] === localStorage.getItem("cliente")) {
                this.usuario = x;
                this.GlobalService.setNick(this.usuario);
                this.myNick = x["Nick"];
              }
              if (x["Correo"] === localStorage.getItem("tienda")) {
                this.usuario = x;
                this.GlobalService.setNick(this.usuario);

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

            this.listPerfil = this.listPerfil.sort(function () { return Math.random() - 0.5 });
            this.listadoTodos = this.listadoTodos.sort(function () { return Math.random() - 0.5 });
            this.GlobalService.setListadoBusqueda(this.listPerfil);
            this.GlobalService.setListadoPerfilesBusqueda(this.listadoTodos);
            this.cargo = true;
            primeraVez = false;
          }
        });
    }

  }

  meGusta(x) {
    if (x.quienLike === undefined) {
      x.likes = 1;
      x.quienLike = [];
      x.quienLike.push(localStorage.getItem("cliente"));
      this.usuario.publi = x.foto;
      let obj = this.usuario;
      obj.$key = x.keypadre;
      if (x.Correo !== localStorage.getItem("cliente")) {
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
        if (x.Correo !== localStorage.getItem("cliente")) {
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
      if (x.Correo !== localStorage.getItem("cliente")) {
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
        if (x.Correo !== localStorage.getItem("cliente")) {
          this.dashboardService.nuevaNotificacion(this.usuario);
        }
      }
      this.dashboardService.meGustaPub(x);
    }
  }
  Escribiendo(value) {
    if (value.lenght < 1) {
      this.listadoTodosView = this.listadoTodos;
    }
    this.listadoTodosView = [];
    this.listadoTodos.forEach(element => {
      console.log(element.Nick);
      if (element.Nick !== undefined) {
        if (element.Nick.toUpperCase().match(value.toUpperCase())) {
          let aux = {
            Nick: element.Nick,
            Foto: element.Foto,
            Seguidores: element.Seguidores,
            Seguidos: element.Seguidos
          }
          this.listadoTodosView.push(aux);
        }
      }
    });
  }

  actualizar() {
    $('html, body').animate({ scrollTop: 0 }, 800);
    $('.actualizar').animate({ opacity: 0 }, 800);
    this.usoInterno = false;
    this.listPerfil  = [];
    let primeraVez = true;
    this.dashboardService.listadoUsuario()
      .snapshotChanges()
      .subscribe(Data => {
        if (primeraVez) {
          Data.map(element => {
            let x = element.payload.toJSON();
            x["$key"] = element.key;
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
                  this.listPerfil = this.listPerfil.sort(function () { return Math.random() - 0.5 });
                });
              }
            });
            
          this.GlobalService.setListadoBusqueda(this.listPerfil);
          primeraVez = false;
        }
      });
  }
}

