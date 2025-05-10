import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

// Configurar o Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file)
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Converter Buffer para uma string base64 que o Cloudinary aceita
    const base64File = buffer.toString('base64')
    const fileStr = `data:${file.type};base64,${base64File}`

    // Fazer upload para o Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        fileStr,
        {
          folder: 'uploads',
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      )
    })

    return NextResponse.json({
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      url: (uploadResponse as any).secure_url,
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      public_id: (uploadResponse as any).public_id,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
