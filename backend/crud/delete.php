<?php
header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set("display_errors", 1);

include("../auth/db.php"); // $conn should be PDO object

$data = json_decode(file_get_contents("php://input"), true);
$id   = $data["id"] ?? '';

if ($id !== '') {
    try {
        $stmt = $conn->prepare("DELETE FROM employees WHERE id = :id");
        $stmt->bindParam(":id", $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Employee deleted"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to delete employee"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid ID"]);
}
?>
