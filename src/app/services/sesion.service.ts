import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Usuario } from '../interfaces/usuario';
import { Imgupload } from '../interfaces/imgupload';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { NuevaPublicacionComponent } from '../nueva-publicacion/nueva-publicacion.component';
import { GlobalService } from '../global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    private Router: Router,
    private fireBase: AngularFireDatabase,
    private auth: AngularFireAuth,
    private location: Router,
    private GlobalService: GlobalService,
    private Http : HttpClient
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

  exampleFunction(any) : any {
    // var headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json',Authorization: key=SERVER_KEY);


    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    headers_object.append("Authorization", "key=AAAA89hk5Do:APA91bGtEQIEdanTZE2xTYf7-JyQHVrpC_HWzaDPuWzyvMD-yS2oc6wVwwWN1-HCcW6yOX-Sz3IUd_NtpLWP73Lg1qnt38rTzN2ZSGK7CzI56CuLV2Foq5kn-TDd4RZO8YD7FTB1R2Qt");
    var notification = {
      "notification": {
          "title": "Notificaicon de SocialPesca",
          "body": "¡Alguien a likeado tu foto!",
          "click_action": "https://google.com",
          "icon": "https://st2.depositphotos.com/8696740/11950/v/950/depositphotos_119504790-stock-illustration-danger-warning-attention-sign-icon.jpg"
      },
      "to": any
  };
  console.log(notification);
  console.log(headers_object);
    return this.Http.post('https://fcm.googleapis.com/fcm/send', notification, {headers: headers_object});
  };

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

  updateNick(usuario: any) {
    // if (usuario.Capturas === undefined) {
    //   usuario.Capturas = null;
    // }
    // if (usuario.Publicacion === undefined) {
    //   usuario.Publicacion = null;
    // }
    if (usuario.Grupos === undefined) {
      usuario.Grupos = null;
    }
    if (usuario.quienSeguidos === undefined) {
      usuario.quienSeguidos = null;
    }
    if (usuario.quienSeguidores === undefined) {
      usuario.quienSeguidores = null;
    }
    if (usuario.Puntos === undefined) {
      usuario.Puntos = null;
    }
    console.log(usuario.Capturas);
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
      Puntos: usuario.Puntos,
      Foto: usuario.Foto,
      Portada: usuario.Portada,
      // Capturas: usuario.Capturas,
      // Publicacion: usuario.Publicacion,
      Grupos: usuario.Grupos
    });

    let aux = true;
    this.listadoUsuario()
      .snapshotChanges()
      .subscribe(Data => {
        if (aux) {
          Data.map(element => {
            let x = element.payload.toJSON();
            if (x["Correo"] === localStorage.getItem("cliente")) {
              x["$key"] = element.key;
              this.GlobalService.setUsuarioOnline(x);
            }
          });
          aux = false;
        }
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
        alert(error);
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
    this.fireBase.list('usuario/').update(cliente.$key, {
      Puntos: cliente.Puntos
    })
    this.setNewCapturaOrPublication();

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
    this.Referido(cliente.Puntos, cliente.$key);

    this.setNewCapturaOrPublication();
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
      envio: cliente.Capturas.envio
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
    this.setNewCapturaOrPublication('perfil');

  }
  borrarPubli(key, keytwo) {
    this.fireBase.list("/usuario/" + keytwo + "/Publicacion")
      .remove(key);
    this.setNewCapturaOrPublication('perfil');
  }



  meGustaCap(captura, like?) {
    let entrada = true;

    if (captura.comentarios === undefined) {
      captura.comentarios = null;
    }
    if (captura.quienLike === undefined) {
      captura.quienLike = null;
    }
    if (captura.$key == undefined) {
      captura.$key = captura.key;
    }
    this.fireBase.list("/usuario/" + captura.keypadre + "/Capturas")
      .snapshotChanges()
      .subscribe(data => {
        if (entrada) {
          let arrayLikes = [];
          data.map(element => {
            if (element.key === captura.$key) {
              let x = element.payload.toJSON();
              if (x["quienLike"] !== undefined) {
                let aux = x["quienLike"]
                Object.keys(aux).map(elementoTwo => {
                  arrayLikes.push(aux[elementoTwo]);
                });
              }
              if (!like) {
                let aux = [];
                arrayLikes.forEach(element => {
                  if(element !== captura.email){
                    aux.push(element);
                  }
                });
                arrayLikes = aux;
              } else {
                arrayLikes.push(captura.quienLike[captura.quienLike.length - 1]);
              }
            }
          });
          entrada = false;
          this.fireBase.list("usuario/" + captura.keypadre + "/Capturas").update(captura.$key, {
            foto: captura.foto,
            descripcion: captura.descripcion,
            pescado: captura.pescado,
            peso: captura.peso,
            forma: captura.forma,
            donde: captura.donde,
            fecha: captura.fecha,
            Nick: captura.Nick,
            likes: 0,
            quienLike: arrayLikes,
            comentarios: captura.comentarios,
          });
        }
      });
  }

  meGustaPub(captura, like?) {
    let entrada = true;
    if (captura.comentarios === undefined) {
      captura.comentarios = null;
    }
    if (captura.quienLike === undefined) {
      captura.quienLike = null;
    }

    this.fireBase.list("/usuario/" + captura.keypadre + "/Publicacion")
      .snapshotChanges()
      .subscribe(data => {
        if (entrada) {
          let arrayLikes = [];
          data.map(element => {
            console.log(element.key === captura.$key);
            if (element.key === captura.$key) {
              let x = element.payload.toJSON();
              if (x["quienLike"] !== undefined) {
                let aux = x["quienLike"];
                Object.keys(aux).map(elementoTwo => {
                  arrayLikes.push(aux[elementoTwo]);
                });
                console.log(arrayLikes);
              }
              if (!like) {
                let aux = [];
                arrayLikes.forEach(element => {
                  if(element !== captura.email){
                    aux.push(element);
                  }
                });
                arrayLikes = aux;                
              } else {
                arrayLikes.push(captura.quienLike[captura.quienLike.length - 1]);
              }
            }
          });
          this.fireBase.list("/usuario/" + captura.keypadre + "/Publicacion").update(captura.$key, {
            foto: captura.foto,
            descripcion: captura.descripcion,
            likes: 0,
            Nick: captura.Nick,
            fecha: captura.fecha,
            quienLike: arrayLikes,
            comentarios: captura.comentarios,
            etiqueta: captura.etiqueta,
          });
          entrada = false;
        }
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

  Referido(puntos, key) {
    this.fireBase.list('usuario/' + key + "/Puntos").push({
      puntos: puntos.puntos,
      fecha: puntos.fecha
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
      link: captura.link,
      precio: captura.precio,
      envio: captura.envio,
      forma: captura.forma,
      Nick: captura.Nick,
      likes: captura.likes,
      quienLike: captura.quienLike,
    });
  }

  setNewCapturaOrPublication(url?) {
    let aux = true;
    let user;
    this.listadoUsuario()
      .snapshotChanges()
      .subscribe(data => {
        if (aux) {

          let myCapturas = [];
          let myPublicaciones = [];
          let myTotal = [];
          let Usuarios = [];
          let Listado = [];
          let arraySeguidores = [];
          data.map(element => {
            let x = element.payload.toJSON();
            x["$key"] = element.key;
            if (x["Correo"] === localStorage.getItem("cliente") || x["Correo"] === localStorage.getItem("tienda")) {
              if (localStorage.getItem("tienda") !== null) {
                user = false;
              } else {
                user = true;
              }
              this.GlobalService.setUsuarioOnline(x);

              if (x["Capturas"] !== undefined) {
                let a = 0;
                Object.keys(x["Capturas"]).map(item => {
                  x["Capturas"][item]["$key"] = Object.keys(x["Capturas"])[a];
                  myCapturas.push(x["Capturas"][item]);
                  myTotal.push(x["Capturas"][item]);
                });
                this.GlobalService.setListadoMiPerfilCapturas(myCapturas);
              }
              if (x["Publicacion"] !== undefined) {
                let a = 0;
                Object.keys(x["Publicacion"]).map(item => {
                  x["Publicacion"][item]["$key"] = Object.keys(x["Publicacion"])[a];
                  myPublicaciones.push(x["Publicacion"][item]);
                  myTotal.push(x["Publicacion"][item]);
                });
                this.GlobalService.setListadoMiPerfilPublicaciones(myPublicaciones);
              }
              let aux = x["quienSeguidos"];

              if (aux !== undefined) {
                Object.keys(aux).map(elements => {
                  arraySeguidores.push(aux[elements]);
                });
              }
              arraySeguidores.push(x["Nick"]);
            }
            Usuarios.push(x);
          });

          Listado = [];

          Usuarios.map(elemento => {
            arraySeguidores.forEach(padre => {
              if (padre === elemento.Nick) {
                if (elemento.Capturas !== undefined) {
                  let y = 0;
                  Object.keys(elemento.Capturas).map(key => {
                    let z = elemento.Capturas[key];
                    z.$key = Object.keys(elemento.Capturas)[y];
                    z.keypadre = elemento.$key;
                    z.fperfil = elemento.Foto;
                    z.Correo = elemento.Correo;
                    Listado.push(z);
                    y++;
                  });
                }
                if (elemento.Publicacion !== undefined) {
                  let y = 0;
                  Object.keys(elemento.Publicacion).map(key => {
                    let k = elemento.Publicacion[key];
                    k.$key = Object.keys(elemento.Publicacion)[y];
                    k.keypadre = elemento.$key;
                    k.fperfil = elemento.Foto;
                    k.Correo = elemento.Correo;
                    Listado.push(k);
                    y++;
                  });
                }
              }
            });
          });

          for (let j = 0; j < Listado.length; j++) {
            for (let c = 0; c < Listado.length - 1; c++) {
              let aux = Listado[c].fecha.split("-");
              let aux2 = Listado[c + 1].fecha.split("-");

              let hora1 = Number(aux[1].split(":")[0]);
              let hora2 = Number(aux2[1].split(":")[0]);
              let minuto1 = Number(aux[1].split(":")[1]);
              let minuto2 = Number(aux2[1].split(":")[1]);
              let segundo1 = Number(aux[1].split(":")[2]);
              let segundo2 = Number(aux2[1].split(":")[2]);

              let fecha = aux[0].split("/");
              let fecha2 = aux2[0].split("/");

              if (aux[0] === aux2[0]) {
      
                if (hora1 < hora2) {
                  var temp = Listado[c];
                  Listado[c] = Listado[c + 1];
                  Listado[c + 1] = temp;
                } else if (hora1 === hora2) {
                  if (minuto1 < minuto2) {
                    var temp = Listado[c];
                    Listado[c] = Listado[c + 1];
                    Listado[c + 1] = temp;
                  } else if (minuto1 === minuto2) {
                    if (segundo1 < segundo2) {
                      var temp = Listado[c];
                      Listado[c] = Listado[c + 1];
                      Listado[c + 1] = temp;
                    }
                  }
                }
              } else if (Number(fecha[2]) === Number(fecha2[2])) {
                if (Number(fecha[1]) === Number(fecha2[1])) {
                  if (Number(fecha[0]) < Number(fecha2[0])) {
                    var temp = Listado[c];
                    Listado[c] = Listado[c + 1];
                    Listado[c + 1] = temp;

                  }
                } else if (Number(fecha[1]) < Number(fecha[2])) {
                  var temp = Listado[c];
                  Listado[c] = Listado[c + 1];
                  Listado[c + 1] = temp;
                }
              } else if (Number(fecha[2]) < Number(fecha2[2])) {
                var temp = Listado[c];
                Listado[c] = Listado[c + 1];
                Listado[c + 1] = temp;
              }

            }
          }
          this.GlobalService.setListadoHome(Listado);
          this.GlobalService.setListadoMiPerfilTotal(myTotal);
          if (url === undefined) {
            url = '/home';
          } else {
            if (user) {
              url = '/perfil'
            } else {
              url = "/mitienda";
            }
          }
          this.Router.navigateByUrl(url);
        }

      });
  }
}


