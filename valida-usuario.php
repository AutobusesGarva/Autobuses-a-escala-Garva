<?php
session_start();

include('conexion.php');

if (isset($_POST['usuario']) && isset($_POST['contraseña'])) {
  $usuario = mysqli_real_escape_string($conexion, $_POST['usuario']);
  $contraseña = mysqli_real_escape_string($conexion, $_POST['contraseña']);

 
  $stmt = $conexion->prepare("SELECT * FROM inicio WHERE usuario = ? AND contraseña = ?");
  $stmt->bind_param("ss", $usuario, $contraseña);
  $stmt->execute();
  $result = $stmt->get_result();


  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $_SESSION['usuario'] = $row['usuario']; 

    header("Location: index.html");
    exit();
  } else {
    
    echo "Usuario o contraseña incorrectos.";
  }
  
  $stmt->close();
}
?>