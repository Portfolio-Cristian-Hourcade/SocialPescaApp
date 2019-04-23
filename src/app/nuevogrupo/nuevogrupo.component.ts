import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuevogrupo',
  templateUrl: './nuevogrupo.component.html',
  styleUrls: ['./nuevogrupo.component.css']
})
export class NuevogrupoComponent implements OnInit {


  isFoto: boolean;

  constructor() {
    this.isFoto = false;
  }

  ngOnInit() {
    
  }

}
