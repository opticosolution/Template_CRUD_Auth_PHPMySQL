<?php
$host = 'localhost';
$dbname = 'crud_app'; 
$username = 'root';
$password = 'TigerDB@Nayan77'; 

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>