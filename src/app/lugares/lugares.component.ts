import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css']
})
export class LugaresComponent implements OnInit {

  JsonLugares: any[]
  JsonFiltro : any[]
  constructor() {
    this.JsonLugares = [
      {Nombre:"Mar Del Túyu",Portada:"/assets/md1.jpg",Slug:"muelle-mdt",Opinion:"Medio",Peces:["Corvina","Raya","Chucho","Burriqueta","Brotola","Bagre","Lenguado"]},
      {Nombre:"Esquina, Corrientes",Portada:"/assets/es1.jpg",Slug:"esquinacr",Opinion:"Excelente",Peces:["Dorado","Surubí","Boga","Pacú","Variada"]},
    ];
  this.JsonFiltro = [];
  }



  ngOnInit() {
  }

  filtro(value){
    this.JsonFiltro = [];
    if(value.length > 1){
      this.JsonLugares.forEach(element => {
        element.Peces.forEach(elemento => {
          if(elemento.toUpperCase().match(value.toUpperCase())){
            console.log("HOLA2");

            this.JsonFiltro.push(element);
          }
        });
      });
    }
  }

}
