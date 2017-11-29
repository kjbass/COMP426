<?php
$conn = new mysqli("classroom.cs.unc.edu", "kjbass", $_GET['pass'], "kjbassdb");
$conn->query("DROP TABLE test_table;");
$result = $conn->query("SHOW TABLES;");
echo $result->fetch_row();
?>

