import { Component, OnInit } from '@angular/core';
import { SesionService } from '../services/sesion.service';
import { PushNotificationsService } from 'ng-push';

@Component({
  selector: 'app-nav-top',
  templateUrl: './nav-top.component.html',
  styleUrls: ['./nav-top.component.css']
})
export class NavTopComponent implements OnInit {

  isMobile: boolean;
  notificacion: boolean;
  menu: boolean;
  constructor(
    private dashboardService: SesionService,
    private pushNotifications : PushNotificationsService
  ) {
    this.menu = false;
    this.isMobile = false;
    this.notificacion = false;
  }
  Mensajes: number;
  NickOnline;
  key;
  notificaciones: number;
  ngOnInit() {
    this.notificaciones = 0;
    this.Mensajes = 0;
    if (window.innerWidth < 768) {
      this.isMobile = true;
    }
    this.dashboardService.listadoUsuario()
      .snapshotChanges()
      .subscribe(Data => {
        Data.map(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          if (x["Correo"] === localStorage.getItem("cliente")) {
            this.key = x["$key"];
            this.NickOnline = x["Nick"];
            this.dashboardService.listadoNotificaciones(x["$key"])
              .snapshotChanges()
              .subscribe(data => {
                this.notificaciones = 0;

                data.forEach(elemento => {
                  let y = elemento.payload.toJSON();
                  y["$key"] = elemento.key;
                  if (y["Visto"] === false) {
                    this.notificaciones++;
                  }
                });
                if (this.notificaciones > 0) {
                //   let options = { //set options
                //     body: "The truth is, I'am Iron Man!",
                //     icon: "assets/images/ironman.png" //adding an icon
                //   }
                //   this.pushNotifications.create('Iron Man', options).subscribe( //creates a notification
                //     res => console.log(res),
                //     err => console.log(err)
                //   );
                }
              });
          }
        });
        this.dashboardService.listadoChats()
          .snapshotChanges()
          .subscribe(data => {
            this.Mensajes = 0;
            data.forEach(element => {
              let x = element.payload.toJSON();
              x["$key"] = element.key;
              if (x["Responsable1"] === this.NickOnline) {

                let aux = x["mensajes"];
                let mensajes = [];
                Object.keys(aux).map(element => {
                  mensajes.push(aux[element]);
                });

                x["mensajes"] = mensajes;
                x["ultimo"] = mensajes[mensajes.length - 1].mensaje;
                x["quien"] = mensajes[mensajes.length - 1].quien;
                if (x["quien"] !== this.NickOnline) {
                  x["view"] = mensajes[mensajes.length - 1].visto;
                  if (x["view"] === false) {
                    this.Mensajes++;
                  };
                } else {
                  x["view"] = true;
                }

              }
              if (x["Responsable2"] === this.NickOnline) {
                let aux = x["mensajes"];
                let mensajes = [];
                Object.keys(aux).map(element => {
                  mensajes.push(aux[element]);
                });
                x["mensajes"] = mensajes;
                x["ultimo"] = mensajes[mensajes.length - 1].mensaje;
                x["quien"] = mensajes[mensajes.length - 1].quien;
                if (x["quien"] !== this.NickOnline) {
                  x["view"] = mensajes[mensajes.length - 1].visto;
                  if (x["view"] === false) {
                    this.Mensajes++;
                  }
                } else {
                  x["view"] = true;
                }
              }
            });
          });

      });
  }

  cerrar() {
    localStorage.clear();
    location.href = "/inicio";
  }
  compartir() {
    if (window.navigator && window.navigator['share']) {


      window.navigator['share']({
        title: 'Este es el codigo de referido para tu amigo para SocialPesca',
        text: '¡Registraté en SocialPesca y unite a una hermosa comunidad de pesca latinoamericana!',
        url: "https://www.socialpesca.com/inicio/" + this.key
      })
        .then(() => console.log('¡Se comapartio con exito!'))
        .catch((error) => console.log('Hubo un error en comapartir', error));
    } else {
      alert("Tu navegador no permite compartir esta publicación :'(");
    }
  }
}
