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


const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full'},
  { path: 'inicio', component: EntradaComponent  },
  { path: 'home', component: HomeComponent  },
  { path: 'perfil', component: PerfilComponent  },
  { path: 'perfil/:nick', component: OtroperfilComponent  },
  { path: 'mensajes', component: MensajesComponent  },
  { path: 'nueva-publicacion', component: NuevaPublicacionComponent  },
  { path: 'nuevo-grupo', component: NuevogrupoComponent  },
  { path: 'explorar', component: BusquedaComponent  },
  { path: 'novedad', component: TravelComponent  },
  { path: 'lugares', component: LugaresComponent  },
  { path: 'lugares/:lugar', component: LugaresItemComponent  },

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