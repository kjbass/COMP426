<?php
$conn = new mysqli("classroom.cs.unc.edu", "kjbass", $_GET['pass'], "kjbassdb");
$conn->query("
    CREATE TABLE IF NOT EXISTS teams(
        teamID INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(40),
        PRIMARY KEY (teamID)
    );
");

$conn->query("
    CREATE TABLE IF NOT EXISTS games(
        gameID INT NOT NULL AUTO_INCREMENT,
        team1ID INT NOT NULL,
        team2ID INT NOT NULL,
        date DATE NOT NULL,
        FOREIGN KEY(team1ID) REFERENCES teams(teamID),
        FOREIGN KEY(team2ID) REFERENCES teams(teamID),
        PRIMARY KEY (gameID)
    );
");

$conn->query("
    CREATE TABLE IF NOT EXISTS players(
        playerID INT NOT NULL AUTO_INCREMENT,
        firstName VARCHAR(40) NOT NULL,
        lastName VARCHAR(40) NOT NULL,
        teamID INT NOT NULL,
        FOREIGN KEY(teamID) REFERENCES teams(teamID),
        PRIMARY KEY (playerID)
    );
");
$conn->query("
    CREATE TABLE IF NOT EXISTS events(
        eventID INT NOT NULL AUTO_INCREMENT,
        event_type VARCHAR(10) NOT NULL,
        scoringPlayerID INT NOT NULL,
        quarterBackID INT,
        gameID INT NOT NULL,
        FOREIGN KEY(scoringPlayerID) REFERENCES players(playerID),
        FOREIGN KEY(quarterBackID) REFERENCES players(playerID),
        FOREIGN KEY(gameID) REFERENCES games(gameID),
        PRIMARY KEY (eventID)
    );
");




$result = $conn->query("SHOW TABLES;");
echo $result->fetch_row();
?>

