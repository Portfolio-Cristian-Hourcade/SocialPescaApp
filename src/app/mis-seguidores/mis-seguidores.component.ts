import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SesionService } from '../services/sesion.service';

@Component({
  selector: 'app-mis-seguidores',
  templateUrl: './mis-seguidores.component.html',
  styleUrls: ['./mis-seguidores.component.css']
})
export class MisSeguidoresComponent implements OnInit {

  constructor(
    private GlobalService: GlobalService,
    private Router: Router,
    private activatedRoute: ActivatedRoute,
    private sesionService: SesionService
  ) {
    this.Nick = "";
  }

  Nick;
  listSeguidores: any;

  ngOnInit() {
    let aux = this.GlobalService.getUsuarioOnline()
    if (aux === null) {
      this.Router.navigateByUrl("/home");
    }
    const nick = this.activatedRoute.snapshot.paramMap.get("nick");
    this.Nick = nick;
    this.sesionService.listadoUsuario()
    .snapshotChanges()
    .subscribe(data => {
      let usuarios = [];
      let seguidos = [];
      this.listSeguidores = [];
        data.map(element => {
          let x = element.payload.toJSON();
          if (x["Nick"] === nick) {
            seguidos = x["quienSeguidores"];
          }
          if (x["Nick"] !== undefined) {
            usuarios.push(x);
          }
        });

        Object.keys(seguidos).map(key => {
          usuarios.map(element => {
            if (seguidos[key] === element.Nick) {
              this.listSeguidores.push({ Foto: element.Foto, Nick: element.Nick });
            }
          });
        })
      });
  }

}
