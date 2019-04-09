import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { SesionService } from '../services/sesion.service';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-borrarpubli',
  templateUrl: './borrarpubli.component.html',
  styleUrls: ['./borrarpubli.component.css']
})
export class BorrarpubliComponent implements OnInit {

  @Input() variable;
  @Input() variable2;
  @Output() var2 = new EventEmitter();

  constructor(
    private usuarioService : SesionService
  ) { }

  ngOnInit() {}

  cerrar(){
    this.variable = undefined;
    this.var2.emit();
  }

  borrar(){
    if(this.variable.forma === undefined){
      this.usuarioService.borrarPubli(this.variable.$key,this.variable2)
    }else{
      this.usuarioService.borrarCaptura(this.variable.$key,this.variable2)
    }    
    this.var2.emit();
  }

}
