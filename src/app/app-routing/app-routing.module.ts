import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { EntradaComponent } from '../entrada/entrada.component';
import { NuevaPublicacionComponent } from '../nueva-publicacion/nueva-publicacion.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { OtroperfilComponent } from '../otroperfil/otroperfil.component';
import { BusquedaComponent } from '../busqueda/busqueda.component';
import { MensajesComponent } from '../mensajes/mensajes.component';
import { NuevogrupoComponent } from '../nuevogrupo/nuevogrupo.component';
import { TravelComponent } from '../travel/travel.component';
import { LugaresComponent } from '../lugares/lugares.component';
import { LugaresItemComponent } from '../lugares-item/lugares-item.component';
import { DetallePubliComponent } from '../detalle-publi/detalle-publi.component';
import { NegociosComponent } from '../negocios/negocios.component';
import { InvitaramigoComponent } from '../invitaramigo/invitaramigo.component';
import { TablaComponent } from '../tabla/tabla.component';
import { LogintiendasComponent } from '../logintiendas/logintiendas.component';
import { PerfiltiendaComponent } from '../perfiltienda/perfiltienda.component';
import { NuevoproductoComponent } from '../nuevoproducto/nuevoproducto.component';
import { OtroperfiltiendaComponent } from '../otroperfiltienda/otroperfiltienda.component';
import { MisSeguidoresComponent } from '../mis-seguidores/mis-seguidores.component';
import { MisSeguidosComponent } from '../mis-seguidos/mis-seguidos.component';


const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full'},
  { path: 'inicio', component: EntradaComponent  },
  { path: 'inicio/:key', component: EntradaComponent  },
  { path: 'home', component: HomeComponent  },
  { path: 'perfil', component: PerfilComponent  },
  { path: 'publicacion/:keypadre/:key/:tipo', component: DetallePubliComponent  },
  { path: 'perfil/:nick', component: OtroperfilComponent  },
  { path: 'mitienda', component: PerfiltiendaComponent   },
  { path: 'mensajes', component: MensajesComponent  },
  { path: 'nueva-publicacion', component: NuevaPublicacionComponent  },
  { path: 'nuevo-producto', component: NuevoproductoComponent  },
  { path: 'nuevo-grupo', component: NuevogrupoComponent  },
  { path: 'explorar', component: BusquedaComponent  },
  { path: 'novedad', component: TravelComponent  },
  { path: 'negocios', component: NegociosComponent  },
  { path: 'ranking', component: TablaComponent },  
  { path: 'lugares', component: LugaresComponent  },
  { path: 'lugares/:lugar', component: LugaresItemComponent  },
  { path: 'mitienda/login', component: LogintiendasComponent  },
  { path: 'tienda/:nick', component: OtroperfiltiendaComponent  },
  { path: 'seguidores/:nick', component: MisSeguidoresComponent  },
  { path: 'seguidos/:nick', component: MisSeguidosComponent  },


];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
],
  declarations: []
})

export class AppRoutingModule {}