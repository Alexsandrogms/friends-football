const isHeaderLine = (line: string): boolean => {
  return line.toLowerCase().startsWith('lista')
}

const isGoalkeeperSection = (line: string): boolean => {
  return line.toLowerCase().startsWith('goleiros')
}

const cleanLine = (line: string): string => {
  return line.replace(/^\d+\s*/, '').trim()
}

export function extractPlayers(text: string): string[] {
  const lines = text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)

  const players: string[] = []
  let isReadingPlayers = false

  for (const line of lines) {
    if (isHeaderLine(line)) {
      isReadingPlayers = true
      continue
    }

    if (isGoalkeeperSection(line)) {
      break
    }

    if (isReadingPlayers) {
      const playerName = cleanLine(line)
      if (playerName) {
        players.push(playerName)
      }
    }
  }

  return players
}
