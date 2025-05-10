'use client'

import html2canvas from 'html2canvas-pro'
import { ChevronLeft, Loader2, Share2 } from 'lucide-react'
import { useRef, useTransition } from 'react'

import { Button } from '@/components/ui/button'

import { TeamItem } from './team-item'

interface TeamResultsProps {
  teams: string[][]
  onBack: () => void
}

export function TeamResults({ teams, onBack }: TeamResultsProps) {
  const captureRef = useRef<HTMLDivElement>(null)
  const [isPending, startTransition] = useTransition()

  async function handleCaptureAndShareWhatsApp() {
    if (!captureRef.current) return

    captureRef.current.classList.add('screenshot')

    const canvas = await html2canvas(captureRef.current, {
      backgroundColor: 'oklch(0.141 0.005 285.823)',
    })

    captureRef.current.classList.remove('screenshot')

    const blob = await new Promise<Blob | null>(resolve => {
      canvas.toBlob(b => resolve(b), 'image/png')
    })

    if (!blob) return

    const formData = new FormData()
    formData.append('file', blob, 'screenshot.png')

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()

    const imageUrl = data.url

    if (!imageUrl) return

    const message = `Veja o resultado do sorteio: ${imageUrl}`
    const encoded = encodeURIComponent(message)

    window.open(`https://wa.me/?text=${encoded}`, '_blank')
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          className="-ml-2 mb-4"
          aria-label="voltar para o sorteio"
          onClick={onBack.bind(null)}
          disabled={isPending}
        >
          <ChevronLeft className="size-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="-ml-2 mb-4"
          aria-label="voltar para o sorteio"
          onClick={startTransition.bind(null, handleCaptureAndShareWhatsApp)}
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Share2 className="size-4" />
          )}
        </Button>
      </div>

      <div ref={captureRef}>
        <h2 className="text-lg font-semibold">Times sorteados:</h2>

        <div className="mt-4 flex flex-col gap-6">
          {teams.map((team, idx) => (
            <TeamItem key={idx} players={team} teamNumber={idx} />
          ))}
        </div>
      </div>
    </div>
  )
}
