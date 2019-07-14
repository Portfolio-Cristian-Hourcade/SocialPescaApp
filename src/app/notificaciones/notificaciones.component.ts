import { Component, OnInit, OnChanges, SimpleChanges, Input, EventEmitter, Output } from '@angular/core';
import { SesionService } from '../services/sesion.service';
import { MessagingService } from '../services/messaging.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit, OnChanges {

  notificaciones;

  @Input() variable;

  @Output() var = new EventEmitter();

  constructor(
    private dashboardService: SesionService,
  ) {
    this.notificaciones = false;
  }
  abierto;
  listadoNotif;
  key;
  message;
  ngOnInit() {
    
   
    let aux = true;
    this.dashboardService.listadoUsuario().snapshotChanges()
      .subscribe(Data => {
        if (aux) {

          Data.map(element => {
            let x = element.payload.toJSON();
            if (x["Correo"] === localStorage.getItem("cliente")) {
              this.key = element.key;

            }
          });
          aux = false;
        }

      });

  }

  noti() {
    this.var.emit();
  }
  ngOnChanges(changes: SimpleChanges) {

    if (changes.variable === undefined) {

    } else {
      if (changes.variable.currentValue != undefined) {
        this.abierto = true;
        this.notificaciones = changes.variable.currentValue;
        this.dashboardService.listadoNotificaciones(this.key)
          .snapshotChanges()
          .subscribe(data => {
            if (this.abierto) {

              this.listadoNotif = [];
              data.forEach(elemento => {
                let x = elemento.payload.toJSON();
                x["$key"] = elemento.key;
                this.listadoNotif.push(x);
              });
              this.listadoNotif.forEach(element => {
                if (element.Visto === false) {
                  element.Visto = true;
                  this.dashboardService.ModificarNotif(element);
                }
              });
            this.abierto = false;
            }
           this.listadoNotif.reverse();
          });
      }
    }
  }

}