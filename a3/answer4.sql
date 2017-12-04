-- 4) Who won the game between Dallas and Washington on Thanksgiving Day 2016?
--  5) List all the games (date and opposing team) that Dallas won in 2016 in chronological order

SELECT name FROM (
SELECT SUM(points) as score, name
FROM
(
SELECT t.name, COUNT(*)*7 as points
FROM games g, events e, players p, teams t
WHERE e.gameID=g.gameID
AND p.playerID=e.scoringPlayerID
AND p.teamID=t.teamID
AND date LIKE '%2016-11-24%'
AND event_type!='fieldgoal'
GROUP BY t.name

UNION

SELECT t.name, COUNT(*)*3 as points
FROM games g, events e, players p, teams t
WHERE e.gameID=g.gameID
AND p.playerID=e.scoringPlayerID
AND p.teamID=t.teamID
AND date LIKE '%2016-11-24%'
AND event_type='fieldgoal'
GROUP BY t.name
) as pointTable
GROUP BY pointTable.name
ORDER BY score DESC
LIMIT 1) as winner







