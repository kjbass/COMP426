<?php
$conn = new mysqli("classroom.cs.unc.edu", "kjbass", $_GET['pass'], "kjbassdb");
$conn->query("CREATE TABLE test_table(test VARCHAR(20));");
$result = $conn->query("SHOW TABLES;");
echo $result->fetch_row();
?>

