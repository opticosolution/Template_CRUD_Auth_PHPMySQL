<?php
require_once '../auth/db.php';

$data = json_decode(file_get_contents("php://input"), true);

$mobile = $data['mobile'];
$password = $data['password'];

$sql = "SELECT * FROM users WHERE mobile = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $mobile);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        echo json_encode(["status" => "success", "message" => "Login successful"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid password"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Mobile number not found"]);
}

$conn->close();
?>
