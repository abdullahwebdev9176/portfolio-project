import { NextResponse } from 'next/server'
import sharp from 'sharp'

// Configure the API route for production
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Image Conversion API Endpoint using @napi-rs/canvas
 * 
 * This API endpoint handles image conversion using the @napi-rs/canvas library.
 * Canvas is a native Node.js addon that works well in serverless environments.
 * 
 * Supported input formats: JPEG, PNG, WebP, GIF, BMP
 * Supported output formats: JPEG, PNG, WebP
 * 
 * Note: Canvas has excellent WebP support and works reliably in production
 */

export async function POST(request) {
  console.log('🚀 POST request received at:', new Date().toISOString())
  
  try {
    console.log('📋 Parsing form data...')
    const formData = await request.formData()
    
    const imageFile = formData.get('image')
    const targetFormat = formData.get('format') || 'webp'
    
    console.log('📁 Image file:', imageFile ? 'received' : 'not received')
    console.log('📁 File name:', imageFile?.name)
    console.log('📁 File size:', imageFile?.size)
    console.log('🎯 Target format:', targetFormat)
    
    if (!imageFile || !(imageFile instanceof File)) {
      console.error('❌ No valid image file')
      return NextResponse.json(
        { error: 'No valid image file provided' },
        { status: 400 }
      )
    }
    
    // Validate supported formats
    const supportedFormats = ['jpeg', 'jpg', 'png', 'webp']
    if (!supportedFormats.includes(targetFormat.toLowerCase())) {
      return NextResponse.json(
        { error: 'Unsupported format. Supported: JPEG, PNG, WebP' },
        { status: 400 }
      )
    }
    
    // Convert file to buffer
    console.log('🔄 Converting to buffer...')
    const buffer = Buffer.from(await imageFile.arrayBuffer())
    console.log('✅ Buffer size:', buffer.length)
    
    // Process with Sharp - minimal configuration for Vercel compatibility
    console.log('🖼️ Processing with Sharp...')
    let convertedBuffer
    const format = targetFormat.toLowerCase()
    
    try {
      const sharpInstance = sharp(buffer)
      
      if (format === 'jpg' || format === 'jpeg') {
        convertedBuffer = await sharpInstance.jpeg({ quality: 85 }).toBuffer()
      } else if (format === 'png') {
        convertedBuffer = await sharpInstance.png().toBuffer()
      } else if (format === 'webp') {
        convertedBuffer = await sharpInstance.webp({ quality: 85 }).toBuffer()
      }
      
      console.log('✅ Conversion complete, output size:', convertedBuffer.length)
      
    } catch (sharpError) {
      console.error('❌ Sharp error:', sharpError.message)
      throw new Error('Image processing failed')
    }
    
    // Return the converted image
    return new NextResponse(convertedBuffer, {
      status: 200,
      headers: {
        'Content-Type': `image/${format === 'jpg' ? 'jpeg' : format}`,
        'Content-Length': convertedBuffer.length.toString()
      }
    })
    
  } catch (error) {
    console.error('💥 Conversion error:', error)
    return NextResponse.json(
      { error: 'Image conversion failed: ' + error.message },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  )
}

export async function PATCH() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  )
}