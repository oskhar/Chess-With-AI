<?php
// Membuat koneksi ke database SQL
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "database_name";

$conn = new mysqli($servername, $username, $password, $dbname);

// Menerima data BLOB dari permintaan HTTP
$blob = file_get_contents("php://input");

// Menyimpan data BLOB ke database SQL
$sql = "INSERT INTO table_name (tensor_blob) VALUES (?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("b", $blob);

if ($stmt->execute() === TRUE) {
  echo "Data tensor berhasil disimpan dalam BLOB";
} else {
  echo "Terjadi kesalahan saat menyimpan data tensor: " . $conn->error;
}

// Menutup koneksi database
$stmt->close();
$conn->close();
?>