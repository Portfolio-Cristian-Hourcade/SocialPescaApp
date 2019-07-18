import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-abrir-app',
  templateUrl: './abrir-app.component.html',
  styleUrls: ['./abrir-app.component.css']
})
export class AbrirAppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    location.href="intent:#Intent;action=com.appopenfromweb.sp;category=android.intent.category.DEFAULT;category=android.intent.category.BROWSABLE;S.msg_from_browser=Launched%20from%20Browser;end"
  }

}
