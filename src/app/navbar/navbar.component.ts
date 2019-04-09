import { Component, OnInit, Input } from '@angular/core';
import { SesionService } from '../services/sesion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() foto:string;
  isMobile :boolean;
  fotografia;
  constructor(
    private usuarioService : SesionService
  ) {
    this.isMobile = false;
   }

  ngOnInit() {
    window.scrollTo(0, 0)

    if(window.innerWidth < 768){
      this.isMobile = true;
    }
    this.usuarioService.listadoUsuario()
    .snapshotChanges()
    .subscribe(data => {
      data.map(element => {
        let x = element.payload.toJSON();
        if(x["Correo"] === localStorage.getItem("cliente")){
          this.fotografia = x["Foto"];
        }
      });
    })
  }

}
