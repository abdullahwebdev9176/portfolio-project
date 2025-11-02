import { NextResponse } from 'next/server'
import sharp from 'sharp'

// ✅ Use Node.js runtime (not Edge)
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * 🚀 Image Conversion API (Up to ~100MB)
 * -------------------------------------
 * - Supports: JPEG, PNG, WebP
 * - Converts image with Sharp (optimized & safe)
 * - Handles large files gracefully
 */

export async function POST(request) {
  console.log('🚀 [API] Conversion request at:', new Date().toISOString())

  try {
    // Parse form data
    console.log('📋 Parsing form data...')
    const formData = await request.formData()

    const imageFile = formData.get('image')
    const targetFormat = (formData.get('format') || 'webp').toLowerCase()

    // Validate input
    if (!imageFile || !(imageFile instanceof File)) {
      console.error('❌ No valid image file provided')
      return NextResponse.json(
        { error: 'No valid image file provided' },
        { status: 400 }
      )
    }

    const supportedFormats = ['jpeg', 'jpg', 'png', 'webp']
    if (!supportedFormats.includes(targetFormat)) {
      return NextResponse.json(
        { error: 'Unsupported format. Supported: JPEG, PNG, WebP' },
        { status: 400 }
      )
    }

    console.log(`📁 File received: ${imageFile.name} (${imageFile.size} bytes)`)

    // Convert to Buffer
    console.log('🔄 Reading file into buffer...')
    const buffer = Buffer.from(await imageFile.arrayBuffer())
    console.log('✅ Buffer ready:', buffer.length, 'bytes')

    // ✅ Optimize Sharp for large files
    sharp.cache(false)
    sharp.concurrency(1)

    // Create Sharp instance
    const sharpInstance = sharp(buffer, { failOnError: false })

    // Optional: resize safeguard (prevent ultra large images)
    const metadata = await sharpInstance.metadata()
    if (metadata.width > 8000) {
      console.log(`⚠️ Large image detected (${metadata.width}px). Resizing to 8000px width...`)
      sharpInstance.resize({ width: 8000 })
    }

    // Process image
    console.log('🖼️ Converting image to', targetFormat.toUpperCase(), '...')
    let convertedBuffer

    try {
      if (targetFormat === 'jpg' || targetFormat === 'jpeg') {
        convertedBuffer = await sharpInstance.jpeg({ quality: 85 }).toBuffer()
      } else if (targetFormat === 'png') {
        convertedBuffer = await sharpInstance.png({ compressionLevel: 8 }).toBuffer()
      } else if (targetFormat === 'webp') {
        convertedBuffer = await sharpInstance.webp({ quality: 85 }).toBuffer()
      }

      console.log('✅ Conversion complete. Output size:', convertedBuffer.length, 'bytes')
    } catch (sharpError) {
      console.error('❌ Sharp conversion error:', sharpError.message)
      return NextResponse.json(
        { error: 'Image processing failed: ' + sharpError.message },
        { status: 500 }
      )
    }

    // Return converted image
    return new NextResponse(convertedBuffer, {
      status: 200,
      headers: {
        'Content-Type': `image/${targetFormat === 'jpg' ? 'jpeg' : targetFormat}`,
        'Content-Length': convertedBuffer.length.toString(),
        'Cache-Control': 'no-store'
      }
    })

  } catch (error) {
    console.error('💥 Conversion failed:', error)
    return NextResponse.json(
      { error: 'Image conversion failed: ' + error.message },
      { status: 500 }
    )
  }
}

// ✅ Block other HTTP methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed. Use POST.' }, { status: 405 })
}
export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed. Use POST.' }, { status: 405 })
}
export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed. Use POST.' }, { status: 405 })
}
export async function PATCH() {
  return NextResponse.json({ error: 'Method not allowed. Use POST.' }, { status: 405 })
}
