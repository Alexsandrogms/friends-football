const shuffle = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5)
}

export function shuffleTeams(players: string[]) {
  const playerPerTeams = 5
  const teams = []

  const shufflePlayers = shuffle(players)

  for (let i = 0; i < shufflePlayers.length; i += playerPerTeams) {
    teams.push(shufflePlayers.slice(i, i + playerPerTeams))
  }

  return teams
}
