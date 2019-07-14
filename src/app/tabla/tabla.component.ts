import { Component, OnInit } from '@angular/core';
import { SesionService } from '../services/sesion.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  usuarioOnline;
  numeroRank;
  Ranking: any[]
  constructor(
    private DashboardService: SesionService
  ) {
    this.numeroRank = 1;
    this.Ranking = [];
  }


  ngOnInit() {
    this.DashboardService.listadoUsuario()
      .snapshotChanges()
      .subscribe(data => {
        let auxL = [];
        this.Ranking = [];
        data.map(element => {

          let x = element.payload.toJSON();
          x["$key"] = element.key;
          if (x["Correo"] === localStorage.getItem("cliente")) {
            this.usuarioOnline = x;
          }


          let cantidadPuntos = 0;
          let conjuntoPuntos = [];
          let f = new Date();


          if (x["Puntos"] !== undefined) {
            Object.keys(x["Puntos"]).map(key => {
              if (x["Puntos"][key].fecha === f.getMonth() + 1 + "/" + f.getFullYear()) {
                conjuntoPuntos.push(x["Puntos"])
                cantidadPuntos = x["Puntos"][key].puntos + cantidadPuntos;
              }
            });
          }
          if (cantidadPuntos !== 0) {
            x["cPuntos"] = cantidadPuntos;

            auxL.push(x);
          }
        });

        let aux = [];
        auxL.map(element => {
          if(element.Pais === this.usuarioOnline.Pais){
            aux.push(element);
          }
        });

        for (let j = 0; j < aux.length; j++) {
          for (let c = 0; c < aux.length - 1; c++) {
            if (j + 1 < aux.length) {
              if (aux[c].cPuntos < aux[c + 1].cPuntos) {
                var temp = aux[c + 1];
                aux[c + 1] = aux[c];
                aux[c] = temp;
              }
            }
          }

        }


        this.Ranking = aux;
        let index = 1;
        let entra = false;
        this.Ranking.map(elemental => {
          if (elemental.Nick === this.usuarioOnline.Nick) {
            this.numeroRank = index;
            entra = true;
          }
          index++
        });
        if (!entra) {
          this.numeroRank = 0
        }
      });
  }

}
