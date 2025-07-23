<?php
header("Content-Type: application/json");
error_reporting(0); 

include("../auth/db.php");

// Fetch data
$sql = "SELECT id, name, emp_code FROM employees";
$result = $conn->query($sql);

$data = [];

if ($result && $result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
  echo json_encode(["status" => "success", "data" => $data]);
} else {
  echo json_encode(["status" => "success", "data" => []]); // No rows, but still success
}

$conn->close();
?>
