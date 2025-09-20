import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'

/**
 * Image Conversion API Endpoint
 * 
 * This API endpoint handles image conversion using the Sharp library.
 * It processes multipart/form-data requests containing an image file
 * and a target format, then returns the converted image.
 * 
 * Supported input formats: JPEG, PNG, WebP, GIF, BMP, TIFF
 * Supported output formats: JPEG, PNG, WebP
 * 
 * The conversion is performed server-side for better performance
 * and to avoid client-side limitations.
 */

/**
 * Handles POST requests for image conversion
 * @param {NextRequest} request - The incoming request containing form data
 * @returns {NextResponse} - The converted image as a binary response
 */
export async function POST(request) {
  try {
    // Parse the multipart form data from the request
    const formData = await request.formData()
    
    // Extract the image file and target format from form data
    const imageFile = formData.get('image')
    const targetFormat = formData.get('format') || 'webp'

    // Validate that an image file was provided
    if (!imageFile || !(imageFile instanceof File)) {
      return NextResponse.json(
        { error: 'No image file provided' },
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
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer())

    // Initialize Sharp with the image buffer
    let sharpImage = sharp(imageBuffer)

    // Get metadata to validate the input image
    const metadata = await sharpImage.metadata()
    
    // Validate that the input is actually an image
    if (!metadata.format) {
      return NextResponse.json(
        { error: 'Invalid image file' },
        { status: 400 }
      )
    }

    // Convert the format to lowercase for consistency
    const format = targetFormat.toLowerCase()
    
    // Configure Sharp for the target format with optimization settings
    let convertedBuffer
    
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
        return NextResponse.json(
          { error: 'Unsupported format' },
          { status: 400 }
        )
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
    // Log the error for debugging (in production, use proper logging)
    console.error('Image conversion error:', error)
    
    // Determine the type of error and return appropriate response
    if (error.message.includes('Input file contains unsupported image format')) {
      return NextResponse.json(
        { error: 'Unsupported image format' },
        { status: 400 }
      )
    }
    
    if (error.message.includes('Input buffer contains unsupported image format')) {
      return NextResponse.json(
        { error: 'Invalid or corrupted image file' },
        { status: 400 }
      )
    }

    // Generic error response for unexpected errors
    return NextResponse.json(
      { error: 'Failed to process image. Please try again.' },
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