import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Angular material

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatFormFieldModule,
} from '@angular/material';


// FireBase Configuration

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';


//Assets
import { PushNotificationsModule } from 'ng-push'; //import the module

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { EntradaComponent } from './entrada/entrada.component';
import { SesionService } from './services/sesion.service';
import { NavbarComponent } from './navbar/navbar.component';
import { NuevaPublicacionComponent } from './nueva-publicacion/nueva-publicacion.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LikePipe } from './like.pipe';
import { ViewComponent } from './view/view.component';
import { BorrarpubliComponent } from './borrarpubli/borrarpubli.component';
import { OtroperfilComponent } from './otroperfil/otroperfil.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { NavTopComponent } from './nav-top/nav-top.component';
import { EtiquetasPipe } from './etiquetas.pipe';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { MensajesPipe } from './mensajes.pipe';
import { NuevogrupoComponent } from './nuevogrupo/nuevogrupo.component';
import { TravelComponent } from './travel/travel.component';
import { LugaresComponent } from './lugares/lugares.component';
import { LugaresItemComponent } from './lugares-item/lugares-item.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { DetallePubliComponent } from './detalle-publi/detalle-publi.component';
import { NegociosComponent } from './negocios/negocios.component';
import { InvitaramigoComponent } from './invitaramigo/invitaramigo.component';
import { TablaComponent } from './tabla/tabla.component';
import { LogintiendasComponent } from './logintiendas/logintiendas.component';
import { PerfiltiendaComponent } from './perfiltienda/perfiltienda.component';
import { NuevoproductoComponent } from './nuevoproducto/nuevoproducto.component';
import { OtroperfiltiendaComponent } from './otroperfiltienda/otroperfiltienda.component';
import { GlobalService } from './global.service';
import { ImageCompressService,ResizeOptions,ImageUtilityService } from 'ng2-image-compress';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { MessagingService } from './services/messaging.service';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { MisSeguidoresComponent } from './mis-seguidores/mis-seguidores.component';
import { MisSeguidosComponent } from './mis-seguidos/mis-seguidos.component';
import { RecortPipe } from './pipes/recort.pipe';
import { AbrirAppComponent } from './abrir-app/abrir-app.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EntradaComponent,
    NavbarComponent,
    NuevaPublicacionComponent,
    PerfilComponent,
    LikePipe,
    ViewComponent,
    BorrarpubliComponent,
    OtroperfilComponent,
    BusquedaComponent,
    NavTopComponent,
    EtiquetasPipe,
    NotificacionesComponent,
    MensajesComponent,
    MensajesPipe,
    NuevogrupoComponent,
    TravelComponent,
    LugaresComponent,
    LugaresItemComponent,
    DetallePubliComponent,
    NegociosComponent,
    InvitaramigoComponent,
    TablaComponent,
    LogintiendasComponent,
    PerfiltiendaComponent,
    NuevoproductoComponent,
    OtroperfiltiendaComponent,
    MisSeguidoresComponent,
    MisSeguidosComponent,
    RecortPipe,
    AbrirAppComponent,
  ],
  imports: [
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    Ng2ImgMaxModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatFormFieldModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    PushNotificationsModule,
    AngularFireMessagingModule,
    HttpClientModule,
  ],
  providers: [SesionService,GlobalService,ImageCompressService,ResizeOptions,MessagingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
