import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lugares-item',
  templateUrl: './lugares-item.component.html',
  styleUrls: ['./lugares-item.component.css']
})
export class LugaresItemComponent implements OnInit {



  item: any;
  Position: number;
  Portada;
  JsonLugares: any[]
  constructor(private ActivateRoute: ActivatedRoute) {
    this.JsonLugares = [
      {
        Nombre: "Mar Del Túyu",
        Portada: "/assets/md1.jpg",
        Guia: [{ url: "http://www.pescadoresenlared.com.ar/2010/10/embarcado-en-santa-teresita/", nombre: "Pescados En La Red" }],
        Alojamiento: [
          { nombre: "Hotel el muelle", url: "https://www.google.com/maps/dir//El+Muelle,+Calle+76+162,+B7108+Mar+del+Tuy%C3%BA,+Buenos+Aires/@-35.602856,-57.7507124,8z/data=!4m7!4m6!1m1!4e2!1m2!1m1!1s0x959c6cd39ced6859:0x37eb8a378b7e747a!3e0" }
        ],
        Carnada: ["Camaron", "Pollo", "Almeja", "Anchoa"],
        TemporadaAlta: "Octubre a Abril",
        TemporadaBaja: "Abril a Octubre",
        Fotos: ["/assets/md1.jpg", "/assets/md2.jpg", "/assets/md3.jpg", "/assets/md4.jpg"],
        Slug: "muelle-mdt",
        Opinion: "Excelente",
        Peces: ["Corvina", "Raya", "Chucho", "Burriqueta", "Brotola", "Vagre", "Lenguado"],
        Ubicacion: "https://www.google.com/maps/dir//Muelle+de+Mar+del+Tuy%C3%BA,+entre+calles+74+y+76,+Av.+Costanera,+Buenos+Aires/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x959c6cd25ff6c90f:0x5fa8090de2f040fb?sa=X&ved=2ahUKEwjh4Ijv_MLhAhXDH7kGHfjHASsQ48ADMAB6BAgIEBg"
      },
      {
        Nombre: "Esquina, Corrientes",
        Guia: [{ url: "https://wa.me/5493777416255", nombre: "Diego Guia Esquina" }],
        Alojamiento: [
          { nombre: "Luna Apart & Hotel", url: "http://www.corrientes.com.ar/lunaapart/" },
          { nombre: "Irupé Plaza Hotel", url: "http://www.corrientes.com.ar/irupe/" },
          { nombre: "Hotel Aleman - Booking", url: "https://www.booking.com/searchresults.es-ar.html?aid=337131;label=portalarturismo-link-hotelsar-hotel-3699049;sid=2f94788c8000f2e2166fbecf1d991a1f;city=-988885;expand_sb=1;highlighted_hotels=3699049;hlrd=no_dates;keep_landing=1;redirected=1;source=hotel&utm_campaign=ar&utm_medium=hotels&utm_source=portalarturismo&utm_term=hotel-3699049&" },
        ],
        TemporadaAlta: "Setiembre a Mayo",
        TemporadaBaja: "Junio a Agosto",
        Portada: "/assets/es1.jpg",
        Slug: "esquinacr",
        Opinion: "Excelente",
        Peces: ["Dorado", "Surubí", "Boga", "Pacú", "Variada"],
        Fotos: ["/assets/es1.jpg", "/assets/es3.jpg", "/assets/es2.jpg", "/assets/es4.jpg", "/assets/es5.jpg"],
        Carnada: ["No registramos información exacta. Mucha variedad de carnandas para esta zona."],
        Ubicacion: "https://www.google.com/maps/dir//Esquina,+Corrientes/@-30.0184651,-59.6016204,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x944e84847a67c7cf:0x2b8652841af21b3a!2m2!1d-59.5314088!2d-30.0184837"
      },

    ];
    this.item = null;
    this.Position = 0;
    this.Portada = null;
  }

  ngOnInit() {
    const lugar = this.ActivateRoute.snapshot.paramMap.get("lugar");
    this.JsonLugares.forEach(element => {
      if (element.Slug === lugar) {
        this.item = element;
      }
    });
    this.Portada = this.item.Portada;

  }

}
