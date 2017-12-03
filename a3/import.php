<?php
    $handle = fopen("input.txt", "r");
    $conn = new mysqli("classroom.cs.unc.edu", "kjbass", "426password!", "kjbassdb");
    if ($handle) {
        while (($line = fgets($handle)) !== false) {
            //FirstName LastName team1 team2 Date EVENTTYPE (FirstName LastName)?
            $line = explode(" ", $line);

            $result = $conn->query("
            SELECT g.gameID
            FROM games g
            WHERE g.date='".$line[4]."'
            AND (
                g.team1ID = (
                    SELECT t.teamID 
                    FROM teams t
                    WHERE t.name='".$line[2]."'
                )
                OR
                g.team1ID = (
                    SELECT t.teamID 
                    FROM teams t
                    WHERE t.name='".$line[3]."'
                )
            )
        ");
        }
        echo $result->fetch_row();
        fclose($handle);
    } else {
        // error opening the file.
    }
   
?>