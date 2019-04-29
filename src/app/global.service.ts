import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  listadoBusqueda: any[];
  listadoPerfilesBusqueda: any[];
  listadoHome : any[];
  NickOnline : any;
  UsuarioOnline : any;
  listMiPerfilTotal : any[];
  listMiPerfilCapturas : any[];
  listMiPerfilPublicaciones : any[];

  constructor() {
    this.listadoHome = [];
    this.listadoBusqueda = [];
    this.listadoPerfilesBusqueda = [];
    this.NickOnline = null;
  }



  /****************** PATH EXPLORAR ***************/
  getListadoBusqueda(){
    return this.listadoBusqueda;
  }
  setListadoBusqueda(value : any[]){
    this.listadoBusqueda = value;
  }


  /****************** PATH ALL ***************/
  getNick(){
    return this.NickOnline;
  }
  setNick(value : any[]){
    this.NickOnline = value;
  }

  /****************** PATH EXPLORAR ***************/
  getListadoPerfilesBusqueda(){
    return this.listadoPerfilesBusqueda;
  }
  setListadoPerfilesBusqueda(value : any[]){
    this.listadoPerfilesBusqueda = value;
  }
  

  /****************** PATH HOME *******************/ 
  getListadoHome(){
    return this.listadoHome;
  }
  setListadoHome(value){
    this.listadoHome = value;
  }


  /****************** PATH ALL ********************/
  getUsuarioOnline(){
    return this.UsuarioOnline;
  }
  setUsuarioOnline(value){
    this.UsuarioOnline = value;
  }

  
  /****************** PATH MIPERFIL ***************/
  getListadoMiPerfilTotal(){
    return this.listMiPerfilTotal;
  }
  setListadoMiPerfilTotal(value){
    this.listMiPerfilTotal = value;
  }

  getListadoMiPerfilCapturas(){
    return this.listMiPerfilCapturas;
  }
  setListadoMiPerfilCapturas(value){
    this.listMiPerfilCapturas = value;
  }

  getListadoMiPerfilPublicaciones(){
    return this.listMiPerfilPublicaciones;
  }
  setListadoMiPerfilPublicaciones(value){
    this.listMiPerfilPublicaciones = value;
  }
  
  

}
