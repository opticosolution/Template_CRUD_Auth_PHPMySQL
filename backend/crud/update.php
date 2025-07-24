<?php
header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set("display_errors", 1);

include("../auth/db.php"); // $conn should be PDO object

$data = json_decode(file_get_contents("php://input"), true);

$id   = $data["id"] ?? '';
$name = $data["name"] ?? '';
$code = $data["code"] ?? '';

if ($id !== '' && $name !== '' && $code !== '') {
    try {
        $stmt = $conn->prepare("UPDATE employees SET name = :name, emp_code = :code WHERE id = :id");
        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":code", $code);
        $stmt->bindParam(":id", $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Employee updated"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to update employee"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
}
?>
