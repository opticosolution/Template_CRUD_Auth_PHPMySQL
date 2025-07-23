<?php
require_once '../auth/db.php';
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Check input
if (!$data || !isset($data['mobile']) || !isset($data['password'])) {
    echo json_encode(["status" => "error", "message" => "Missing mobile or password"]);
    exit;
}

$mobile = $data['mobile'];
$password = $data['password'];

try {
    // Prepare query using PDO
    $stmt = $conn->prepare("SELECT * FROM users WHERE mobile = ?");
    $stmt->execute([$mobile]);

    if ($stmt->rowCount() === 1) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (password_verify($password, $user['password'])) {
            echo json_encode(["status" => "success", "message" => "Login successful"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid password"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Mobile number not found"]);
    }
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "DB error: " . $e->getMessage()]);
}
?>
