import type { ReactNode } from 'react'

export default function AppLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <div className="py-10 max-w-6xl md:mx-auto mx-8 sm:max-w-[500px] min-h-screen flex flex-col justify-center items-center">
      {children}
    </div>
  )
}
