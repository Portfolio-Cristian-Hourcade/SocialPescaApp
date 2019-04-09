import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges } from '@angular/core';
import { variable } from '@angular/compiler/src/output/output_ast';
import { SesionService } from '../services/sesion.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnChanges {

  @Input() variable;
  @Input() usuario;
  @Input() on;
  @Output() var = new EventEmitter();

  comentario;

  constructor(
    private sesionService: SesionService
  ) {
    this.variable = undefined;
    this.comentario = "";
    this.isMobile = false;
  }

  editarPublicacion;
  isMobile;

  ngOnChanges(changes: SimpleChanges) {

    if (changes.variable === undefined) {

    } else {
      if (changes.variable.currentValue != undefined) {

        this.variable = changes.variable.currentValue;



        let x = this.variable.comentarios;
        console.log(x);
        let array = [];
        if (x !== undefined) {
          Object.keys(x).map(function (key) {
            array.push(x[key]);
          });
          this.variable.comentarios = array;
        } else {
          this.variable.comentario = undefined;
        }
      }
    }
  }



  comentar() {
    if (this.comentario !== "") {


      this.editarPublicacion = this.variable
      let x = this.variable.comentarios;
      let array = [];
      if (x !== undefined) {
        Object.keys(x).map(function (key) {
          array.push(x[key]);
        });
      }
      console.log(this.on);
      if (this.on === undefined) {

        var aux =
        {
          comentario: this.comentario,
          Nick: this.usuario.Nick,
          foto: this.usuario.Foto
        }
      } else {
        var aux =
        {
          comentario: this.comentario,
          Nick: this.on.Nick,
          foto: this.on.Foto
        }
      }

      array.push(aux);
      
    
      this.editarPublicacion.comentarios = array;

      if (this.variable.keypadre === undefined) {

        if (this.variable.forma === undefined) {
          this.sesionService.modificarGeneralPublicacion(this.editarPublicacion)
        } else {
          this.sesionService.modificarGeneralCaptura(this.editarPublicacion)
        }
      } else {
        let auxd = {
          Accion: "comento una publicacion",
          Foto: this.usuario.Foto,
          Nick: this.usuario.Nick,
          publi: this.variable.foto,
          $key:this.variable.keypadre
        }
        this.sesionService.nuevaNotificacion(auxd);
        if (this.variable.forma === undefined) {
          this.sesionService.comentarPubli(this.editarPublicacion)
        } else {
          this.sesionService.comentarCaptu(this.editarPublicacion)
        }
      }
      
      this.comentario = "";
    }
  }

  cerrar() {
    this.variable = undefined;
    this.var.emit();
  }

  ngOnInit() {
    this.on = undefined;
    if (window.innerWidth < 768) {
      this.isMobile = true;
    }
  }


}
