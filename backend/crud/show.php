<?php
header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set("display_errors", 1);

include("../auth/db.php");

try {
    $stmt = $conn->prepare("SELECT id, name, emp_code FROM employees");
    $stmt->execute();
    $employees = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($employees && count($employees) > 0) {
        echo json_encode(["status" => "success", "data" => $employees]);
    } else {
        echo json_encode(["status" => "success", "data" => [], "message" => "No records found"]);
    }
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
