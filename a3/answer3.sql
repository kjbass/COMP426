-- Which players scored more points in 2016 than in 2015?
-- 4) Who won the game between Dallas and Washington on Thanksgiving Day 2016?
--  5) List all the games (date and opposing team) that Dallas won in 2016 in chronological order




SELECT firstName, lastName
FROM
(
(SELECT fg2015.playerID, fg2015.firstName, fg2015.lastName, Points2015, Points2016
FROM
(SELECT playerID, firstName, lastName, COUNT(*)*3 as Points2015
FROM players p, events e, games g
WHERE e.scoringPlayerID = p.playerID
AND e.event_type = 'fieldgoal'
AND g.gameID=e.gameID
AND g.date LIKE '%2015%'
GROUP BY playerID, firstName, lastName) as fg2015,

(SELECT playerID, firstName, lastName, COUNT(*)*3 as Points2016
FROM players p, events e, games g
WHERE e.scoringPlayerID = p.playerID
AND e.event_type = 'fieldgoal'
AND g.gameID=e.gameID
AND g.date LIKE '%2016%'
GROUP BY playerID, firstName, lastName) as fg2016
WHERE fg2015.playerID=fg2016.playerID
)
UNION
(SELECT other2016.playerID, other2016.firstName, other2016.lastName, Points2015, Points2016
FROM
	(SELECT playerID, firstName, lastName, COUNT(*)*7 as Points2016
	FROM players p, events e, games g
	WHERE e.scoringPlayerID = p.playerID
	AND e.event_type != 'fieldgoal'
	AND g.gameID=e.gameID
	AND g.date LIKE '%2016%'
	GROUP BY playerID, firstName, lastName) as other2016,
	
	(SELECT playerID, firstName, lastName, COUNT(*)*7 as Points2015
	FROM players p, events e, games g
	WHERE e.scoringPlayerID = p.playerID
	AND e.event_type != 'fieldgoal'
	AND g.gameID=e.gameID
	AND g.date LIKE '%2015%'
	GROUP BY playerID, firstName, lastName) as other2015
	
	WHERE other2015.playerID=other2016.playerID
	
) 
) as points
WHERE Points2016>Points2015



