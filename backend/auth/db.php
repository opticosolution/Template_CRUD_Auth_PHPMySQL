<?php
// $host = 'localhost';
$host = 'http://208.91.199.11:3306/';
$dbname = 'panditg_db'; 
$username = 'test_phpmysql';
$password = 'Test@Intern123'; 

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>