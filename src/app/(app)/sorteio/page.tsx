'use client'

import {
  type ChangeEvent,
  type ClipboardEvent,
  type FormEvent,
  useEffect,
  useState,
  useTransition,
} from 'react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { extractPlayers } from '@/utils/extract-players'
import { shuffleTeams } from '@/utils/shuffle-teams'
import { wait } from '@/utils/wait'
import { TeamResults } from './components/team-results'

export default function PrizeDrawTeams() {
  const [players, setPlayers] = useState<string[]>([])
  const [teams, setTeams] = useState<string[][]>([])
  const [isPending, startTransition] = useTransition()
  const [isShowResult, setIsShowResult] = useState(false)

  function handlePaste(e: ClipboardEvent<HTMLTextAreaElement>) {
    e.preventDefault()

    const pastedText = e.clipboardData?.getData('text')
    const extracted = extractPlayers(pastedText ?? '')

    setPlayers(extracted)
  }

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    if (e.target.value.length === 0) {
      return setPlayers([])
    }

    setPlayers(e.target.value.split('\n'))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (players.length < 2) return

    startTransition(async () => {
      await wait(2000) // 2s

      const teamsSorted = shuffleTeams(players)
      setTeams(teamsSorted)
      setIsShowResult(true)
      setPlayers([])
    })
  }

  useEffect(() => {
    async function getTextClipboard() {
      const text = await navigator.clipboard.readText()

      setPlayers(extractPlayers(text))
    }

    getTextClipboard()
  }, [])

  if (isPending) {
    return (
      <div className="flex items-center justify-center absolute inset-0">
        <div className="w-14 h-14 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  console.log('players', players)

  return (
    <div className="min-w-full">
      {isShowResult ? (
        <TeamResults teams={teams} onBack={() => setIsShowResult(false)} />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <Label htmlFor="players">Insira os participantes</Label>
          <Textarea
            id="players"
            aria-invalid="false"
            placeholder="Digite ou cole os nomes dos players aqui — um nome por linha..."
            className="resize-none min-h-[160px]"
            rows={players.length}
            value={players.join('\n')}
            onPaste={handlePaste}
            onChange={handleChange}
          />
          <Button size="full" disabled={players.length < 1}>
            Sortear
          </Button>
        </form>
      )}
    </div>
  )
}
