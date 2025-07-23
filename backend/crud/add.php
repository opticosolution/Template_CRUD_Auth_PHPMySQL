<?php
header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set("display_errors", 1);

include("../auth/db.php");  

$data = json_decode(file_get_contents("php://input"), true);

$name = $data["name"] ?? '';
$code = $data["code"] ?? '';

if ($name !== '' && $code !== '') {
    try {
        $stmt = $conn->prepare("INSERT INTO employees (name, emp_code) VALUES (:name, :code)");
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':code', $code);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Employee added"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Database insert failed"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input: Name or Code missing"]);
}

$conn = null;
?>
