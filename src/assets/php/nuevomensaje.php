<?php

$Nick = $_GET["Nick"];
$destinatario = $_GET["email"];

$asunto = 'SocialPesca : '.$Nick.' te ha enviado un mensaje'; 
$cuerpo = ' 
<html> 
<head> 
   <title>¡Te han enviado un mensaje por MD! (/*-*)/</title> 
</head> 
<body>  
<p> 
    Revisá tu casilla de mensajes para ver cual fue el mensaje que te envio '.$Nick.'. Hacé <a href="https://www.socialpesca.com/mensajes">CLICK ACÁ</a> para ver tus mensajes.
    <p><b><small>Nuestro objetivo es fomentar la pesca como un deporte y que todos puedan disfrutarla</small><b></p>
    <p><b>Atentamente, El equipo de SocialPesca.</p>
</p> 
</body> 
</html> 
'; 

//para el envío en formato HTML 
$headers = "MIME-Version: 1.0\r\n"; 
$headers .= "Content-type: text/html; charset=iso-8859-1\r\n"; 

//dirección del remitente 
$headers .= "From: Notificaciones SocialPesca <notificaciones@socialpesca.com>\r\n"; 

//ruta del mensaje desde origen a destino 
$headers .= "Return-path: notificaciones@socialpesca.com\r\n"; 

if(mail($destinatario,$asunto,$cuerpo,$headers)){
	echo "Enviado";
}else{
	echo "Error";
}

?>