<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

// Include DB connection
require_once("../auth/db.php");

// Get JSON data
$data = json_decode(file_get_contents("php://input"), true);

// Check if data is received
if (!$data) {
    echo json_encode(["status" => "error", "message" => "No data received"]);
    exit;
}

// Extract and sanitize input
$full_name = $data["name"]; 
$email     = $data["email"];
$mobile    = $data["mobile"];
$password  = $data["password"];
$address   = $data["address"];

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

try {
    // Prepare and execute the query
    $stmt = $conn->prepare("INSERT INTO users (full_name, email, mobile, password, address) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$full_name, $email, $mobile, $hashedPassword, $address]);

    echo json_encode(["status" => "success", "message" => "User registered successfully"]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
}
?>
