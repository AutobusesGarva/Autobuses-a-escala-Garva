<?php
include('conexion.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre']; // Usar 'nombre' en lugar de 'usuario'
    $contraseña = $_POST['contraseña'];
    $apellido = $_POST['apellido'];
    $correo = $_POST['correo'];
    $número = $_POST['número'];

    $stmt = $conexion->prepare("INSERT INTO registros (Nombre, Apellido, Correo, Número, Contraseña) VALUES (?, ?, ?, ?, ?)"); // Usar 'Nombre'
    $stmt->bind_param("sssss", $nombre, $apellido, $correo, $número, $contraseña); // "sssss" porque todas son cadenas

    if ($stmt->execute()) {
        header("Location: index.html?mensaje=Registro agregado correctamente.");
        exit();
    } else {
        header("Location: index.html?mensaje=Error al agregar el registro: " . $stmt->error);
        exit();
    }

    $stmt->close();
    $conexion->close();
}
?>