SELECT COUNT(*)
FROM events e, games g
WHERE  e.gameID=g.gameID
AND (
    g.team1ID = (
        SELECT t.teamID 
        FROM teams t
        WHERE t.name='Atlanta'
    )
    OR
    g.team2ID = (
        SELECT t.teamID 
        FROM teams t
        WHERE t.name='Atlanta'
    )
)
AND (
    	e.quarterBackID=(
    	SELECT p.playerID
    	FROM players p
    	WHERE p.firstName='Cam'
    	AND p.lastName='Newton'
	)
    OR
    	e.scoringPlayerID=(
    	SELECT p.playerID
    	FROM players p
    	WHERE p.firstName='Cam'
    	AND p.lastName='Newton'
	)
) 
    
