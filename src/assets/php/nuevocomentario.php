<?php

$Nick = $_GET["Nick"];
$destinatario = $_GET["email"];

$asunto = 'SocialPesca - '.$Nick.': Un pescador ha comentado tu publicación.'; 
$cuerpo = ' 
<html> 
<head> 
   <title>¡Tu publicación le gustó a alguien! =)</title> 
</head> 
<body>  
<p> 
    ¡Felicitaciones! Tu publicación fue comentada por uno de nuestros pescadores. Seguí así y podrás tener un perfil mucho más profesional.

    <p>Hacé <a href="https://www.socialpesca.com/home">CLICK ACÁ</a> para ver tus notificaciones</p>
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