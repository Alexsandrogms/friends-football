import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface TeamItemProps {
  teamNumber: number
  players: string[]
}

export function TeamItem({ teamNumber, players }: TeamItemProps) {
  return (
    <Card
      className={cn('p-0 overflow-hidden', {
        'border-blue-500': teamNumber % 2 === 0,
        'border-orange-500': teamNumber % 2 !== 0,
      })}
    >
      <CardHeader
        className={cn('text-center mx-0 py-3', {
          'bg-blue-500': teamNumber % 2 === 0,
          'bg-orange-500': teamNumber % 2 !== 0,
        })}
      >
        <CardTitle>Time {teamNumber + 1}</CardTitle>
      </CardHeader>

      <CardContent className="pb-6 pt-4">
        <ul className="list-none">
          {players.map(player => (
            <div key={player}>
              <li className="font-normal text-lg">{player}</li>
              {players[players.length - 1] !== player && (
                <Separator
                  className={cn('my-1.5', {
                    'bg-blue-500/40': teamNumber % 2 === 0,
                    'bg-orange-500/40': teamNumber % 2 !== 0,
                  })}
                />
              )}
            </div>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
