<?php
$conn = new mysqli("classroom.cs.unc.edu", "kjbass", $_GET['pass'], "kjbassdb");
$conn->query("
    CREATE TABLE game(
        gameID INT NOT NULL AUTOINCREMENT,
        team1ID INT NOT NULL,
        team2ID INT NOT NULL,
        date DATE NOT NULL,
        PRIMARY KEY (gameID)
    );
");
$result = $conn->query("SHOW TABLES;");
echo $result->fetch_row();
?>

