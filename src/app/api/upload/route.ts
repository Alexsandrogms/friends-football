import path from 'node:path'
import { NextResponse } from 'next/server'
import { writeFile } from 'node:fs/promises'

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file)
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const filename = `${Date.now()}.png`
  const uploadDir = path.join(process.cwd(), 'public', 'uploads')

  await writeFile(path.join(uploadDir, filename), buffer)

  const publicUrl = `/uploads/${filename}`

  return NextResponse.json({ url: publicUrl })
}
