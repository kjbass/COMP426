team_to_teamID = {
    'Houston' : 1,
    'Atlanta' : 2,
    'Dallas' : 3,
    'Cleveland' : 4,
    'Seattle' : 5,
    'NewEngland' : 6,
    'Oakland' : 7,
    'GreenBay' : 8,
    'Carolina' : 9,
    'Miami' : 10,
    'Chicago' : 11,
    'Washington' : 12
}

def get_unique_game_info(filename):
    game_list = []
    with open(filename) as f:
        last_line = []
        for line in f:
            split = line.split(" ")
            if not last_line:
                game_list.append(tuple(split[2:5]))
            else:
                if (last_line[2] != split[2] and last_line[3] != split[2]) or last_line[4] != split[4]:
                    game_list.append(tuple(split[2:5]))
            last_line = split
    return game_list

def create_SQL(game_list):
    for line in game_list:
        print('''INSERT INTO games(team1ID, team2ID, date) VALUES''' + '(' + 
        str(team_to_teamID[line[0]]) + ", " + str(team_to_teamID[line[1]]) + ', "' + line[2] +'")' + ';')




create_SQL(get_unique_game_info("input.txt"))