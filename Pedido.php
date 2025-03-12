<?php
include('conexion.php');

// Recibir datos del formulario
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$correo = $_POST['correo'];
$telefono = $_POST['telefono'];
$modelo = $_POST['modelo'];
$color = $_POST['color'];
$detalles = $_POST['detalles'];

// Preparar la consulta SQL
$stmt = $conexion->prepare("INSERT INTO pedidos (Nombres, Apellidos, Correo, Numero, Modelo, Color, Detalles) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $nombre, $apellido, $correo, $telefono, $modelo, $color, $detalles);

// Ejecutar la consulta
if ($stmt->execute()) {
    $ticket_id = $conexion->insert_id; // Obtener el ID del ticket generado automáticamente

    // Enviar correo electrónico
    $to = "autobusesgarva@gmail.com"; // Reemplaza con tu dirección de correo electrónico
    $subject = "Nuevo pedido de autobús a escala";
    $message = "Se ha recibido un nuevo pedido:\n\n";
    $message .= "Nombre: " . $nombre . " " . $apellido . "\n";
    $message .= "Correo: " . $correo . "\n";
    $message .= "Teléfono: " . $telefono . "\n";
    $message .= "Modelo: " . $modelo . "\n";
    $message .= "Color: " . $color . "\n";
    $message .= "Detalles: " . $detalles;
    $headers = "From: autobusesgarva@gmail.com"; // Reemplaza con tu dirección de correo electrónico

    if (mail($to, $subject, $message, $headers)) {
        echo "Correo electrónico enviado correctamente.";
    } else {
        echo "Error al enviar el correo electrónico.";
    }

    header("Location: Crear-pedido.html?ticket=" . $ticket_id);
    exit();
} else {
    header("Location: Crear-pedido.html?error=" . urlencode($stmt->error)); // Redirigir con el error
    exit();
}

// Cerrar conexión
$stmt->close();
$conexion->close();
?>