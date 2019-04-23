import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Usuario } from '../interfaces/usuario';
import { Imgupload } from '../interfaces/imgupload';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  listadoUsuarios: AngularFireList<Usuario>;
  listadoPublicaciones: AngularFireList<any>;
  listadoCapturas: AngularFireList<any>;
  listNotif: AngularFireList<any>;
  listChat: AngularFireList<any>;
  listadoNotif: AngularFireList<any>;

  constructor(
    private fireBase: AngularFireDatabase,
    private auth: AngularFireAuth,
    private location: Router
  ) { }

  private basePath = '/uploads';
  /**
   * @param usuario Objeto de tipo Usuario en el registro
   */

  nuevo() {
    firebase.auth().signInAnonymously().catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  nuevoUsuario(usuario: Usuario) {
    this.listadoUsuarios = this.fireBase.list('usuario');
    this.listadoUsuarios.push({
      Nombre: usuario.Nombre,
      Apellido: usuario.Apellido,
      Foto: usuario.Foto,
      Portada: usuario.Portada,
      Contrasena: usuario.Contrasena,
      Seguidores: 0,
      Seguidos: 0,
      Correo: usuario.Correo,
      Pais: usuario.Pais
    });
  }

  listadoUsuario() {
    return this.listadoUsuarios = this.fireBase.list('usuario');
  }

  listadoChats() {
    return this.listChat = this.fireBase.list('Chats');
  }

  nuevoChat(obj) {
    this.listChat.push({
      Responsable1: obj.Responsable1,
      Responsable1Foto: obj.Responsable1Foto,
      Responsable2Foto: obj.Responsable2Foto,
      Responsable2: obj.Responsable2,
      mensajes: [{ mensaje: obj.mensaje, quien: obj.quien, para: obj.para, visto: obj.visto, }]
    });
  }

  UpdateChat(obj) {
    this.listChat.update(obj.$key, {
      Responsable1: obj.Responsable1,
      Responsable2: obj.Responsable2,
      Responsable1Foto: obj.Responsable1Foto,
      Responsable2Foto: obj.Responsable2Foto,
      mensajes: obj.mensajes
    });

  }

  listadoNotificaciones(key) {
    return this.listNotif = this.fireBase.list('usuario/' + key + '/Notificacion');
  }

  updateNick(usuario: Usuario) {
    if (usuario.Capturas === undefined) {
      usuario.Capturas = null;
    }
    if (usuario.Publicacion === undefined) {
      usuario.Publicacion = null;
    }
    if (usuario.Grupos === undefined) {
      usuario.Grupos = null;
    }
    if (usuario.quienSeguidos === undefined) {
      usuario.quienSeguidos = null;
    }
    if (usuario.quienSeguidores === undefined) {
      usuario.quienSeguidores = null;
    }
    if(usuario.Puntos === undefined){
      usuario.Puntos = null;
    }
    this.listadoUsuarios.update(usuario.$key, {
      Nombre: usuario.Nombre,
      Apellido: usuario.Apellido,
      Contrasena: usuario.Contrasena,
      Correo: usuario.Correo,
      Seguidores: usuario.Seguidores,
      quienSeguidores: usuario.quienSeguidores,
      quienSeguidos: usuario.quienSeguidos,
      Seguidos: usuario.Seguidos,
      Pais: usuario.Pais,
      Nick: usuario.Nick,
      Puntos:usuario.Puntos,
      Foto: usuario.Foto,
      Portada: usuario.Portada,
      Capturas: usuario.Capturas,
      Publicacion: usuario.Publicacion,
      Grupos: usuario.Grupos
    });
  }

  pushFileToStorage(fileUpload: Imgupload, cliente?) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.$key}`).put(fileUpload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          cliente.Capturas.foto = downloadURL;
          var f = new Date();
          cliente.Capturas.fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + "-" + f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds();
          this.agregarCaptura(cliente);
          this.location.navigateByUrl("/home");

        });
      }
    );
  }

  nuevoProducto(fileUpload: Imgupload, cliente?) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.$key}`).put(fileUpload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          cliente.Capturas.foto = downloadURL;
          var f = new Date();
          cliente.Capturas.fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + "-" + f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds();
          this.agregarProducto(cliente);
          this.location.navigateByUrl("/mitienda");

        });
      }
    );
  }



  pushFileToStorageB(fileUpload: Imgupload, cliente?) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.$key}`).put(fileUpload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          cliente.Publicacion.foto = downloadURL;
          var f = new Date();
          cliente.Publicacion.fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + "-" + f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds();
          this.agregarPublicacion(cliente);
          this.location.navigateByUrl("/home");

        });
      }
    );
  }

  CambiarPortada(fileUpload: Imgupload, usuario?) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.$key}`).put(fileUpload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          usuario.Portada = downloadURL;
          this.updateNick(usuario);
        });
      }
    );
  }
  CambiarPerfil(fileUpload: Imgupload, usuario?) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.$key}`).put(fileUpload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          usuario.Foto = downloadURL;
          console.log(usuario);
          this.updateNick(usuario);
        });
      }
    );
  }





  listadoPublicacion(key) {
    return this.listadoPublicaciones = this.fireBase.list('usuario/' + key + "/Publicacion")
  }
  listadoCaptuas(key) {
    return this.listadoCapturas = this.fireBase.list('usuario/' + key + "/Capturas");
  }
  listadoCaptuasLikes(key) {
    return this.listadoCapturas = this.fireBase.list('usuario/' + key + "/Capturas", ref => ref.orderByChild('like'));
  }

  agregarPublicacion(cliente: Usuario) {
    this.fireBase.list('usuario/' + cliente.$key + "/Publicacion").push({
      foto: cliente.Publicacion.foto,
      descripcion: cliente.Publicacion.descripcion,
      etiqueta: cliente.Publicacion.etiqueta,
      Nick: cliente.Publicacion.Nick,
      likes: 0,
      fecha: cliente.Publicacion.fecha
    });
    this.fireBase.list('usuario/').update(cliente.$key,{
      Puntos:cliente.Puntos
    })
  }

  agregarCaptura(cliente: Usuario) {
    this.fireBase.list('usuario/' + cliente.$key + "/Capturas").push({
      foto: cliente.Capturas.foto,
      descripcion: cliente.Capturas.descripcion,
      pescado: cliente.Capturas.pescado,
      peso: cliente.Capturas.peso,
      forma: cliente.Capturas.forma,
      Nick: cliente.Capturas.Nick,
      likes: 0,
      fecha: cliente.Capturas.fecha,
      donde: cliente.Capturas.donde
    });
    this.Referido(cliente.Puntos,cliente.$key);
  }


  agregarProducto(cliente: any) {
    this.fireBase.list('usuario/' + cliente.$key + "/Capturas").push({
      foto: cliente.Capturas.foto,
      descripcion: cliente.Capturas.descripcion,
      forma: cliente.Capturas.forma,
      Nick: cliente.Capturas.Nick,
      likes: 0,
      precio: cliente.Capturas.precio,
      link: cliente.Capturas.link,
      envio:cliente.Capturas.envio
    });
  }



  nuevaNotificacion(obj, isComentario?, Nickobj?, duenio?) {


    let key = null;
    let Nick = null;
    if (isComentario !== undefined) {
      key = obj.$key;
    } else {
      key = obj.keypadre;
    }
    if (Nickobj !== undefined) {
      Nick = Nickobj;
    } else {
      Nick = obj.Nick;
    }
    if (obj.Accion !== 'comento una publicacion' || obj.Accion === undefined) {
      console.log("me gusta");
      obj.Accion = 'le gusto tu publicacion';
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
        }
      };
      xmlhttp.open("GET", "/assets/php/nuevomegusta.php?Nick=" + duenio.Nick + "&email=" + duenio.Correo, true);
      xmlhttp.send();
      console.log("me gusta al afue");

    } else {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
        }
      };
      xmlhttp.open("GET", "/assets/php/nuevocomentario.php?Nick=" + duenio.Nick + "&email=" + duenio.Correo, true);
      xmlhttp.send();
    }
    this.fireBase.list('usuario/' + key + '/Notificacion').push({
      Foto: obj.Foto,
      Nick: Nick,
      Accion: obj.Accion,
      Publicacion: obj.publi,
      url: obj.url,
      Visto: false
    });
  }

  ModificarNotif(obj) {
    if (obj.Accion !== 'comento una publicacion' || obj.Accion === undefined) {
      obj.Accion = 'le gusto tu publicacion';
    }
    this.listNotif.update(obj.$key, {
      Foto: obj.Foto,
      Nick: obj.Nick,
      Accion: obj.Accion,
      Publicacion: obj.Publicacion,
      Visto: obj.Visto
    });
  }

  modificarGeneralCaptura(captura) {
    if (captura.comentarios === undefined) {
      captura.comentarios = null;
    }
    if (captura.quienLike === undefined) {
      captura.quienLike = null;
    }
    this.listadoCapturas.update(captura.$key, {
      foto: captura.foto,
      descripcion: captura.descripcion,
      pescado: captura.pescado,
      peso: captura.peso,
      forma: captura.forma,
      donde: captura.donde,
      fecha: captura.fecha,
      Nick: captura.Nick,
      likes: captura.likes,
      quienLike: captura.quienLike,
      comentarios: captura.comentarios,
    });
  }

  modificarGeneralPublicacion(captura) {
    if (captura.comentarios === undefined) {
      captura.comentarios = null;
    }
    if (captura.quienLike === undefined) {
      captura.quienLike = null;
    }

    this.listadoPublicaciones.update(captura.$key, {
      foto: captura.foto,
      descripcion: captura.descripcion,
      likes: captura.likes,
      Nick: captura.Nick,
      fecha: captura.fecha,
      quienLike: captura.quienLike,
      comentarios: captura.comentarios,
      etiqueta: captura.etiqueta,
    });
  }

  borrarCaptura(key, keytwo) {
    this.fireBase.list("/usuario/" + keytwo + "/Capturas")
      .remove(key);
  }
  borrarPubli(key, keytwo) {
    this.fireBase.list("/usuario/" + keytwo + "/Publicacion")
      .remove(key);
  }



  meGustaCap(captura) {
    if (captura.comentarios === undefined) {
      captura.comentarios = null;
    }
    if (captura.quienLike === undefined) {
      captura.quienLike = null;
    }
    if (captura.$key == undefined) {
      captura.$key = captura.key;
    }
    console.log(captura);
    this.fireBase.list("usuario/" + captura.keypadre + "/Capturas").update(captura.$key, {
      foto: captura.foto,
      descripcion: captura.descripcion,
      pescado: captura.pescado,
      peso: captura.peso,
      forma: captura.forma,
      donde: captura.donde,
      fecha: captura.fecha,
      Nick: captura.Nick,
      likes: captura.likes,
      quienLike: captura.quienLike,
      comentarios: captura.comentarios,
    });
  }

  meGustaPub(captura) {
    if (captura.comentarios === undefined) {
      captura.comentarios = null;
    }
    if (captura.quienLike === undefined) {
      captura.quienLike = null;
    }

    this.fireBase.list("/usuario/" + captura.keypadre + "/Publicacion").update(captura.$key, {
      foto: captura.foto,
      descripcion: captura.descripcion,
      likes: captura.likes,
      Nick: captura.Nick,
      fecha: captura.fecha,
      quienLike: captura.quienLike,
      comentarios: captura.comentarios,
      etiqueta: captura.etiqueta,
    });
  }

  comentarPubli(captura) {
    if (captura.comentarios === undefined) {
      captura.comentarios = null;
    }
    if (captura.quienLike === undefined) {
      captura.quienLike = null;
    }

    this.fireBase.list("usuario/" + captura.keypadre + "/Publicacion").update(captura.$key, {
      foto: captura.foto,
      descripcion: captura.descripcion,
      likes: captura.likes,
      Nick: captura.Nick,
      fecha: captura.fecha,
      quienLike: captura.quienLike,
      comentarios: captura.comentarios,
      etiqueta: captura.etiqueta,
    });
  }

  comentarCaptu(captura) {
    if (captura.comentarios === undefined) {
      captura.comentarios = null;
    }
    if (captura.quienLike === undefined) {
      captura.quienLike = null;
    }
    this.fireBase.list("usuario/" + captura.keypadre + "/Capturas").update(captura.$key, {
      foto: captura.foto,
      descripcion: captura.descripcion,
      pescado: captura.pescado,
      peso: captura.peso,
      forma: captura.forma,
      donde: captura.donde,
      fecha: captura.fecha,
      Nick: captura.Nick,
      likes: captura.likes,
      quienLike: captura.quienLike,
      comentarios: captura.comentarios,
    });
  }

  Referido(puntos,key){
    this.fireBase.list('usuario/'+key+"/Puntos").push({
      puntos:puntos.puntos,
      fecha:puntos.fecha
    });
  }

  meGustaProducto(captura) {
    if (captura.comentarios === undefined) {
      captura.comentarios = null;
    }
    if (captura.quienLike === undefined) {
      captura.quienLike = null;
    }
    if (captura.$key == undefined) {
      captura.$key = captura.key;
    }
    this.fireBase.list("usuario/" + captura.keypadre + "/Capturas").update(captura.$key, {
      foto: captura.foto,
      descripcion: captura.descripcion,
      link:captura.link,
      precio:captura.precio,
      envio:captura.envio,
      forma: captura.forma,
      Nick: captura.Nick,
      likes: captura.likes,
      quienLike: captura.quienLike,
    });
  }
}


