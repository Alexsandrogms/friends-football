import Image from 'next/image'

import logo from '@/assets/logo.png'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="space-y-6">
      <div className="flex items-center justify-center">
        <Image
          src={logo}
          alt="Futebol dos amigos"
          className="object-contain size-4/5 sm:size-1/3"
        />
      </div>

      <div className="gap-6 sm:max-w-[500px] flex justify-center items-center flex-col mx-auto">
        <div className="space-y-1.5 sm:space-y-2">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Quem Joga Com Quem?
          </h1>
          <h3 className="text-base text-muted-foreground font-light">
            Sorteie os times da pelada com um toque e sem tretas — só futebol e
            diversão.
          </h3>
        </div>

        <div className="w-full">
          <Button size="full" asChild>
            <Link href="/sorteio">Sortear Times</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
