export interface Usuario {
    $key?: string;
    Nombre?: string;
    Apellido?: string;
    Contrasena?: string;
    Correo?: string;
    Puntos?:{
        puntos:number,
        fecha:string;
    };
    Notificacion?:{
        Foto?:string;
        Nick?:string;
        Accion?:string;
        Publicacion?:string;
    }
    Pais?: string;
    Foto?: string;
    Seguidores?:number;
    Seguidos?:number;
    quienSeguidores?:any[];
    quienSeguidos?:any[];
    Portada?: string;
    Nick?: string;
    Capturas?: {
        $key?: string;
        foto?: string;
        Nick?: string;
        descripcion?: string;
        pescado?: string;
        peso?: string;
        forma?: string;
        donde?: string;
        fecha?: string;
        likes?: number;
        quienLike?: string[];
        comentarios?: {
            Nick?: string,
            foto?: string,
            comentario?: string;
        }
    },
    Publicacion?: {
        $key?: string;
        foto?: string;
        Nick?: string;
        descripcion?: string;
        etiqueta?: string;
        fecha?: string;
        likes?: number;
        quienLike?: string[];
        comentarios?: {
            Nick?: string,
            foto?: string;
            comentario?: string;
        }
    }
    Grupos?: {
        nombre?: string;
    }
}
