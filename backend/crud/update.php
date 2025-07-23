<?php
header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set("display_errors", 1);
include("../auth/db.php");

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate input
$id   = $data["id"] ?? '';
$name = $data["name"] ?? '';
$code = $data["code"] ?? '';

if ($id !== '' && $name !== '' && $code !== '') {
    try {
        // Prepare and execute update
        $stmt = $conn->prepare("UPDATE employees SET name = ?, emp_code = ? WHERE id = ?");
        $stmt->bind_param("ssi", $name, $code, $id);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Employee updated"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to update employee"]);
        }

        $stmt->close();
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
}

$conn->close();
?>
