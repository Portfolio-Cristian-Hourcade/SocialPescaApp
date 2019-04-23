import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lugares-item',
  templateUrl: './lugares-item.component.html',
  styleUrls: ['./lugares-item.component.css']
})
export class LugaresItemComponent implements OnInit {



  item : any;
  Position : number;
  Portada;
  JsonLugares : any[]
  constructor(private ActivateRoute: ActivatedRoute) {
    this.JsonLugares = [
      { Nombre: "Mar Del Túyu", Portada: "/assets/mue.jpg",Guia:[{url:"http://www.pescadoresenlared.com.ar/2010/10/embarcado-en-santa-teresita/",nombre:"Pescados En La Red"}], Alojamiento:[{nombre:"Hotel el muelle",url:"https://www.google.com/maps/dir//El+Muelle,+Calle+76+162,+B7108+Mar+del+Tuy%C3%BA,+Buenos+Aires/@-35.602856,-57.7507124,8z/data=!4m7!4m6!1m1!4e2!1m2!1m1!1s0x959c6cd39ced6859:0x37eb8a378b7e747a!3e0"}], Carnada:["Camaron","Pollo","Almeja","Anchoa"], TemporadaAlta:"Octubre a Abril",TemporadaBaja:"Abril a Octubre", Fotos:["/assets/mue.jpg","/assets/2.jpeg"], Slug: "muelle-mdt", Opinion: "Excelente", Peces: ["Corvina", "Raya", "Chucho", "Burriqueta", "Brotola", "Vagre", "Lenguado"],Ubicacion:"https://www.google.com/maps/dir//Muelle+de+Mar+del+Tuy%C3%BA,+entre+calles+74+y+76,+Av.+Costanera,+Buenos+Aires/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x959c6cd25ff6c90f:0x5fa8090de2f040fb?sa=X&ved=2ahUKEwjh4Ijv_MLhAhXDH7kGHfjHASsQ48ADMAB6BAgIEBg" },
    ];
    this.item = null;
    this.Position = 0;
    this.Portada = null;
  }

  ngOnInit() {
    const lugar = this.ActivateRoute.snapshot.paramMap.get("lugar");
    this.JsonLugares.forEach(element => {
      if(element.Slug === lugar){
          this.item = element;
      }
    });
    this.Portada = this.item.Portada;

  }

}
