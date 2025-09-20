import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({ 
    message: 'API is working', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'unknown'
  })
}

export async function POST(request) {
  try {
    console.log('🧪 Test POST endpoint called')
    
    // Test if we can parse FormData
    const formData = await request.formData()
    const testFile = formData.get('testFile')
    
    return NextResponse.json({ 
      message: 'POST method is working',
      hasFormData: !!formData,
      hasTestFile: !!testFile,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Test POST error:', error)
    return NextResponse.json({ 
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}