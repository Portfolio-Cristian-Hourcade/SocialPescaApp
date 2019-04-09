import { Component, OnInit } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { SesionService } from '../services/sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit {

  /** Variables para crear cuenta **/
  CrearCuenta: boolean;
  nuevoUsuario: Usuario;

  /** Variables para Iniciar Sesion**/
  IniciarSesion: boolean;

  Correo: string;
  Contrasena: string;

  /** Validacion login **/
  isUsuario: boolean;

  /** Variables de validacion lg **/
  isNombre: boolean;
  isApellido: boolean;
  isContrasena: boolean;
  isCorreo: boolean;
  isPais: boolean;

  ListadoCorreo: any[];
  ListadoUsuarios: Usuario[];
  constructor(
    private Router: Router,
    private sesionService: SesionService,
  ) {
    this.nuevoUsuario = {};
    this.Contrasena = "";
    this.Correo = "";
    this.isUsuario = false;
    this.CrearCuenta = false;
    this.IniciarSesion = false;
  }

  ngOnInit() {
    localStorage.clear();
    this.sesionService.listadoUsuario()
      .snapshotChanges()
      .subscribe(data => {
        this.ListadoUsuarios = [];
        this.ListadoCorreo = [];
        this.ListadoCorreo = data.map(result => {
          let x = result.payload.toJSON()
          if (localStorage.getItem("cliente") !== null) {
            if (localStorage.getItem("cliente") === x["Correo"]) {
              this.Router.navigateByUrl("/home");
            }
          }
          this.ListadoUsuarios.push(x);
          return x["Correo"];
        });
      })
  }

  nombreValidateLg() {
    this.isNombre = (this.nuevoUsuario.Nombre === "") ? true : false;
  }

  apellidoValidateLg() {
    this.isApellido = (this.nuevoUsuario.Apellido === "") ? true : false;
  }
  contrasenaValidateLg() {
    this.isContrasena = (this.nuevoUsuario.Contrasena === "") ? true : false;
  }
  correoValidateLg() {
    if (this.nuevoUsuario.Correo !== "") {
      let validacion = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      this.isCorreo = validacion.test(this.nuevoUsuario.Correo) ? false : true;
      if (!this.isCorreo) {
        this.ListadoCorreo.forEach(element => {
          if (this.nuevoUsuario.Correo === element) {
            this.isCorreo = true;
          } else {
            this.isCorreo = false;
          }
        });
      }
    } else {
      this.isCorreo = true;
    }
  }
  paisValidateLg() {
    this.isPais = (this.nuevoUsuario.Pais === "") ? true : false;
  }

  registro() {
    if (!this.isNombre && !this.isApellido && !this.isContrasena && !this.isCorreo && !this.isPais) {
      this.nuevoUsuario.Foto = "/assets/usuario.png";
      this.nuevoUsuario.Portada = "/assets/1.jpg";

      this.sesionService.nuevoUsuario(this.nuevoUsuario);
      localStorage.setItem("cliente", this.nuevoUsuario.Correo);
    }
  }

  iniciarSesion() {
    if (this.Correo === "" || this.Contrasena === "") {
      this.isUsuario = true;
    } else {
      let x = true;
      this.ListadoUsuarios.forEach(element => {
        if (element.Correo === this.Correo && element.Contrasena === this.Contrasena) {
          x = false;
          localStorage.setItem("cliente", this.Correo);
          this.Router.navigateByUrl("/home");
        }
      });
      if (x) {
        this.isUsuario = true;
      }
    }
  }
}
