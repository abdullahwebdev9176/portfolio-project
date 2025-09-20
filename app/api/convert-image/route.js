import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'

// Configure the API route for production
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Enhanced Image Conversion API Endpoint
 * 
 * This API endpoint handles image conversion using the Sharp library.
 * It processes multipart/form-data requests containing an image file
 * and a target format, then returns the converted image.
 * 
 * Supported input formats: JPEG, PNG, WebP, GIF, BMP, TIFF
 * Supported output formats: JPEG, PNG, WebP
 * 
 * The conversion is performed server-side for better performance
 * and to avoid client-side limitations. This endpoint is optimized
 * for batch processing when multiple images are being converted.
 */

/**
 * Handles POST requests for image conversion
 * @param {NextRequest} request - The incoming request containing form data
 * @returns {NextResponse} - The converted image as a binary response
 */
export async function POST(request) {
  // Add comprehensive logging for debugging production issues
  console.log('🚀 API Route Called:', {
    timestamp: new Date().toISOString(),
    url: request.url,
    method: request.method,
    headers: Object.fromEntries(request.headers.entries())
  })

  try {
    // Check if the request has the correct content type
    const contentType = request.headers.get('content-type')
    console.log('📝 Content Type:', contentType)
    
    // More flexible content-type checking for different production environments
    const hasMultipartData = contentType && 
      (contentType.includes('multipart/form-data') || contentType.includes('multipart'));
    
    if (!hasMultipartData) {
      console.error('❌ Invalid content type:', contentType)
      return NextResponse.json(
        { error: 'Invalid content type. Expected multipart/form-data.' },
        { status: 400 }
      )
    }

    // Parse the multipart form data from the request
    console.log('📤 Parsing form data...')
    const formData = await request.formData()
    console.log('✅ Form data parsed successfully')
    
    // Extract the image file and target format from form data
    const imageFile = formData.get('image')
    const targetFormat = formData.get('format') || 'webp'
    
    console.log('📋 Request details:', {
      hasImageFile: !!imageFile,
      imageFileName: imageFile?.name,
      imageSize: imageFile?.size,
      targetFormat: targetFormat
    })

    // Enhanced validation for the image file
    if (!imageFile) {
      console.error('❌ No image file in form data')
      return NextResponse.json(
        { error: 'No image file provided in form data' },
        { status: 400 }
      )
    }

    if (!(imageFile instanceof File)) {
      console.error('❌ Invalid image file type:', typeof imageFile)
      return NextResponse.json(
        { error: 'Invalid image file format' },
        { status: 400 }
      )
    }

    // Validate the target format
    const supportedFormats = ['jpeg', 'jpg', 'png', 'webp']
    if (!supportedFormats.includes(targetFormat.toLowerCase())) {
      return NextResponse.json(
        { error: 'Unsupported target format' },
        { status: 400 }
      )
    }

    // Convert the file to a buffer for processing with Sharp
    console.log('🔄 Converting file to buffer...')
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer())
    console.log('✅ Buffer created, size:', imageBuffer.length)

    // Initialize Sharp with the image buffer and production-specific settings
    console.log('🖼️ Initializing Sharp...')
    let sharpImage = sharp(imageBuffer, {
      // Production-specific configurations
      limitInputPixels: 268402689, // ~16383x16383 max resolution for safety
      sequentialRead: true, // Better for serverless environments
      density: 72 // Standard web density
    })

    // Get metadata to validate the input image
    console.log('📊 Getting image metadata...')
    const metadata = await sharpImage.metadata()
    console.log('✅ Metadata retrieved:', {
      format: metadata.format,
      width: metadata.width,
      height: metadata.height,
      channels: metadata.channels
    })
    
    // Validate that the input is actually an image
    if (!metadata.format) {
      console.error('❌ Invalid image - no format detected')
      return NextResponse.json(
        { error: 'Invalid image file' },
        { status: 400 }
      )
    }

    // Convert the format to lowercase for consistency
    const format = targetFormat.toLowerCase()
    console.log('🎯 Target format:', format)
    
    // Configure Sharp for the target format with optimization settings
    let convertedBuffer
    console.log('⚙️ Starting image conversion...')
    
    try {
      switch (format) {
        case 'jpeg':
        case 'jpg':
          // Convert to JPEG with quality optimization
          convertedBuffer = await sharpImage
            .jpeg({ 
              quality: 85, // Good balance between quality and file size
              progressive: true, // Enable progressive JPEG for better loading
              mozjpeg: true // Use mozjpeg encoder for better compression
            })
            .toBuffer()
          break
          
        case 'png':
          // Convert to PNG with compression optimization
          convertedBuffer = await sharpImage
            .png({ 
              compressionLevel: 6, // Good balance between compression and speed
              adaptiveFiltering: true, // Better compression for complex images
              progressive: true // Enable progressive PNG
            })
            .toBuffer()
          break
          
        case 'webp':
          // Convert to WebP with quality optimization
          convertedBuffer = await sharpImage
            .webp({ 
              quality: 85, // High quality with good compression
              effort: 4, // Good balance between compression and speed
              smartSubsample: true // Better quality for certain image types
            })
            .toBuffer()
          break
          
        default:
          console.error('❌ Unsupported format requested:', format)
          return NextResponse.json(
            { error: 'Unsupported format' },
            { status: 400 }
          )
      }
      
      console.log('✅ Image conversion completed, output size:', convertedBuffer.length)
      
    } catch (sharpError) {
      console.error('❌ Sharp conversion error:', sharpError)
      throw new Error(`Sharp processing failed: ${sharpError.message}`)
    }

    // Determine the correct MIME type for the response
    let mimeType
    switch (format) {
      case 'jpeg':
      case 'jpg':
        mimeType = 'image/jpeg'
        break
      case 'png':
        mimeType = 'image/png'
        break
      case 'webp':
        mimeType = 'image/webp'
        break
    }

    // Create and return the response with the converted image
    return new NextResponse(convertedBuffer, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Length': convertedBuffer.length.toString(),
        // Add cache headers for better performance
        'Cache-Control': 'public, max-age=31536000',
        // Add content disposition for potential download
        'Content-Disposition': `inline; filename="converted.${format}"`
      },
    })

  } catch (error) {
    // Enhanced error logging for debugging production issues
    console.error('💥 API Route Error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      timestamp: new Date().toISOString()
    })
    
    // Determine the type of error and return appropriate response
    if (error.message.includes('Input file contains unsupported image format')) {
      console.error('❌ Unsupported image format error')
      return NextResponse.json(
        { error: 'Unsupported image format. Please upload a valid image file.' },
        { status: 400 }
      )
    }
    
    if (error.message.includes('Input buffer contains unsupported image format')) {
      console.error('❌ Invalid/corrupted image error')
      return NextResponse.json(
        { error: 'Invalid or corrupted image file. Please try a different image.' },
        { status: 400 }
      )
    }

    if (error.message.includes('Sharp processing failed')) {
      console.error('❌ Sharp processing error')
      return NextResponse.json(
        { error: 'Image processing failed. The image may be corrupted or in an unsupported format.' },
        { status: 400 }
      )
    }

    if (error.message.includes('Request timeout') || error.message.includes('timeout')) {
      console.error('⏱️ Timeout error')
      return NextResponse.json(
        { error: 'Request timeout. Please try with a smaller image or try again later.' },
        { status: 408 }
      )
    }

    // Log unknown errors for debugging
    console.error('🔍 Unknown error type:', error.message)

    // Generic error response for unexpected errors
    return NextResponse.json(
      { 
        error: 'Failed to process image. Please try again with a different image.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

/**
 * Handles GET requests - returns method not allowed
 * This endpoint only supports POST requests for security and functionality reasons
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to convert images.' },
    { status: 405 }
  )
}

/**
 * Handles other HTTP methods - returns method not allowed
 */
export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to convert images.' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to convert images.' },
    { status: 405 }
  )
}

export async function PATCH() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to convert images.' },
    { status: 405 }
  )
}