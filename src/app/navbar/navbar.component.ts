import { Component, OnInit, Input } from '@angular/core';
import { SesionService } from '../services/sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() foto: string;
  isMobile: boolean;
  fotografia;
  modal;

  constructor(
    private usuarioService: SesionService,
    private Router : Router
    ) {
    this.isMobile = false;
    this.lightBox = false;
    this.modal = false;
    this.tienda = false;
  }
  url;
  tienda : boolean;
  lightBox: boolean;

  ngOnInit() {
    if(localStorage.getItem("primeraVez") === null && (localStorage.getItem("tienda") !== null || localStorage.getItem("cliente") !== null)){
      this.Router.navigateByUrl("/home");
    }
    this.url = window.location.href;
    if (localStorage.getItem("tienda") === null) {
      if (localStorage.getItem("cliente") === null) {
        if (window.location.href.indexOf('/publicacion') !== -1 || window.location.href.indexOf('/tienda') !== -1) {
          this.fotografia = "/assets/usuario.png";
          this.lightBox = true;
          this.modal = false;
        } else {
          location.href = "/inicio";
        }
      }
    }else{
      
      this.tienda = true;
    }
    this.usuarioService.nuevo();

    window.scrollTo(0, 0)

    if (window.innerWidth < 768) {
      this.isMobile = true;
    }

    this.usuarioService.listadoUsuario()
      .snapshotChanges()
      .subscribe(data => {
        data.map(element => {
          let x = element.payload.toJSON();
          if (x["Correo"] === localStorage.getItem("cliente") || x["Correo"] === localStorage.getItem("tienda")) {
            this.fotografia = x["Foto"];
          }
        });
      });
  }

  registro() {
    this.modal = (this.modal) ? false : true;
  }
}
