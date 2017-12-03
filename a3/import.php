<?php
  $file_handle = fopen("input.txt", "r");
  $conn = new mysqli("classroom.cs.unc.edu", "kjbass", "426password!", "kjbassdb");
  $count = 0;
  while (!feof($file_handle))
  {
    $line = fgets($file_handle);
    if ($line != NULL)
    {
        echo $line;
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
        $game_id = $result->fetch_row()[0];
        $result = $conn->query("
            SELECT p.playerID 
            FROM players p
            WHERE p.firstName='".$line[0]."'
            AND p.lastName='".$line[1]."'
        ");
        $player_id = $result->fetch_row()[0];
        if($line[5] == "passing"){
            $result = $conn->query("
                SELECT p.playerID 
                FROM players p
                WHERE p.firstName='".$line[6]."'
                AND p.lastName='".$line[7]."'
            ");
            $qb_id = $result->fetch_row()[0];
            $conn->query("
                INSERT INTO events(event_type, scoringPlayerID, quarterBackID, gameID)
                VALUES('".$line[5]."', ".$player_id.", ".$qb_id.", ".$game_id.");
            ");
            $count++;
        } else {
            $conn->query("
            INSERT INTO events(event_type, scoringPlayerID, gameID)
            VALUES('".$line[5]."', ".$player_id.", ".$game_id.");
        ");
        }
    }
    
  }
  print $count;
  echo $count;
?>



