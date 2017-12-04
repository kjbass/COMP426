def get_unique_teams(filename):
    name_set = set()
    name_to_team = {}
    data_list = []
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
    with open(filename) as f:
        for line in f:
            split = line.split(" ")
            name = split[0] + ' ' + split[1]
            if name not in name_set:
                name_to_team[name] = split[2]
            name_set.add(name)
        for name in name_set:
            split_name = name.split(" ")
            data_list.append((split_name[0], split_name[1], team_to_teamID[name_to_team[name]]))
        list_to_SQL(data_list)
    
def list_to_SQL(tuple_list):
    for el in tuple_list:
    #   print("INSERT INTO players(firstName, lastName, teamID) VALUES" + str(el) + ';')
        print("UPDATE players SET teamID="+str(el[2])+" WHERE firstName='"+el[0]+"' AND lastName='"+el[1]+"';")


get_unique_teams("input.txt")

