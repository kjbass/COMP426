-- 2) How rushing touchdowns has Marshawn Lynch scored in October?

SELECT count(*)
FROM players p, events e, games g
WHERE p.playerID=e.scoringPlayerID
AND g.gameID=e.gameID
AND p.firstName = 'Marshawn'
AND p.lastName = 'Lynch'
AND e.event_type = 'rushing'
AND g.date LIKE '%-10-%'

