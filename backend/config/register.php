<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

// DB connection file include
include("../auth/db.php");

// JSON data get karo
$data = json_decode(file_get_contents("php://input"), true);

// Input validate
if (!$data) {
  echo json_encode(["status" => "error", "message" => "No data received"]);
  exit;
}

// Form fields
$name     = $data["name"];
$email    = $data["email"];
$mobile   = $data["mobile"];
$password = $data["password"];
$address  = $data["address"];

// Insert query
$sql = "INSERT INTO users (name, email, mobile, psw, address) 
        VALUES ('$name', '$email', '$mobile', '$password', '$address')";

// Run query
if (mysqli_query($conn, $sql)) {
  echo json_encode(["status" => "success", "message" => "User registered"]);
} else {
  echo json_encode(["status" => "error", "message" => mysqli_error($conn)]);
}
?>
