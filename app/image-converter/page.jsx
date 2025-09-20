'use client'

import React, { useState, useRef } from 'react'
import { Upload, Download, Settings, Image as ImageIcon, FileImage, AlertCircle, CheckCircle2 } from 'lucide-react'

/**
 * Image Converter Component
 * 
 * This component provides a complete image conversion interface that allows users to:
 * 1. Upload images via drag-and-drop or file selection
 * 2. Select target format (JPG, PNG, WebP)
 * 3. Convert images using server-side processing
 * 4. Download the converted images
 * 
 * The component uses React hooks for state management and implements
 * a clean, responsive UI with TailwindCSS.
 */
const ImageConverter = () => {
  // State management for the image converter functionality
  const [selectedFile, setSelectedFile] = useState(null) // Stores the uploaded file
  const [convertedImageUrl, setConvertedImageUrl] = useState(null) // URL of the converted image
  const [targetFormat, setTargetFormat] = useState('webp') // Default conversion format
  const [isConverting, setIsConverting] = useState(false) // Loading state during conversion
  const [isDragOver, setIsDragOver] = useState(false) // Visual feedback for drag-and-drop
  const [error, setError] = useState('') // Error messages
  const [success, setSuccess] = useState('') // Success messages
  
  // Reference to the hidden file input element
  const fileInputRef = useRef(null)

  /**
   * Supported image formats for upload validation
   * These MIME types cover the most common image formats
   */
  const supportedFormats = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/webp',
    'image/gif',
    'image/bmp',
    'image/tiff'
  ]

  /**
   * Validates if the uploaded file is a supported image format
   * @param {File} file - The file to validate
   * @returns {boolean} - True if file is a supported image format
   */
  const isValidImageFile = (file) => {
    return file && supportedFormats.includes(file.type)
  }

  /**
   * Handles file selection from the file input or drag-and-drop
   * Validates the file and updates the component state
   * @param {File} file - The selected file
   */
  const handleFileSelect = (file) => {
    // Clear previous states
    setError('')
    setSuccess('')
    setConvertedImageUrl(null)

    // Validate file type
    if (!isValidImageFile(file)) {
      setError('Please select a valid image file (JPG, PNG, WebP, GIF, BMP, TIFF)')
      return
    }

    // Validate file size (limit to 10MB for better performance)
    const maxSize = 10 * 1024 * 1024 // 10MB in bytes
    if (file.size > maxSize) {
      setError('File size must be less than 10MB')
      return
    }

    setSelectedFile(file)
    setSuccess('Image uploaded successfully!')
  }

  /**
   * Handles the drag over event for drag-and-drop functionality
   * Prevents default behavior and shows visual feedback
   */
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  /**
   * Handles the drag leave event
   * Removes visual feedback when drag leaves the drop zone
   */
  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  /**
   * Handles the file drop event for drag-and-drop functionality
   * Extracts the first file from the dropped files and processes it
   */
  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  /**
   * Handles file input change event
   * Processes the selected file from the file input element
   */
  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  /**
   * Triggers the hidden file input when the upload area is clicked
   */
  const handleUploadAreaClick = () => {
    fileInputRef.current?.click()
  }

  /**
   * Handles the image conversion process
   * Sends the image to the server API for conversion and handles the response
   */
  const handleConvert = async () => {
    if (!selectedFile) {
      setError('Please select an image first')
      return
    }

    setIsConverting(true)
    setError('')
    setSuccess('')

    try {
      // Create FormData to send the file to the server
      const formData = new FormData()
      formData.append('image', selectedFile)
      formData.append('format', targetFormat)

      // Send the conversion request to the API endpoint
      const response = await fetch('/api/convert-image', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Conversion failed')
      }

      // Convert the response to a blob (binary data)
      const blob = await response.blob()
      
      // Create a URL for the converted image blob
      const convertedUrl = URL.createObjectURL(blob)
      setConvertedImageUrl(convertedUrl)
      setSuccess(`Image successfully converted to ${targetFormat.toUpperCase()}!`)

    } catch (error) {
      setError('Failed to convert image. Please try again.')
      console.error('Conversion error:', error)
    } finally {
      setIsConverting(false)
    }
  }

  /**
   * Handles the download of the converted image
   * Creates a download link and triggers the download
   */
  const handleDownload = () => {
    if (!convertedImageUrl || !selectedFile) return

    // Create a temporary download link
    const link = document.createElement('a')
    link.href = convertedImageUrl
    
    // Generate filename with new extension
    const originalName = selectedFile.name.split('.').slice(0, -1).join('.')
    link.download = `${originalName}_converted.${targetFormat}`
    
    // Trigger the download
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  /**
   * Resets the converter to initial state
   * Clears all files, messages, and converted images
   */
  const handleReset = () => {
    setSelectedFile(null)
    setConvertedImageUrl(null)
    setError('')
    setSuccess('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <ImageIcon className="text-blue-600" size={40} />
            Image Converter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert your images to different formats quickly and easily. 
            Upload any image and convert it to JPG, PNG, or WebP format.
          </p>
        </div>

        {/* Main Converter Card */}
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
          
          {/* File Upload Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Upload size={24} />
              Upload Image
            </h2>
            
            {/* Drag and Drop Area */}
            <div
              className={`
                border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300
                ${isDragOver 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                }
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleUploadAreaClick}
            >
              <FileImage size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                {selectedFile ? selectedFile.name : 'Drop your image here or click to browse'}
              </p>
              <p className="text-sm text-gray-500">
                Supports: JPG, PNG, WebP, GIF, BMP, TIFF (Max 10MB)
              </p>
              
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>

            {/* File Info Display */}
            {selectedFile && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 text-green-800">
                  <CheckCircle2 size={20} />
                  <span className="font-medium">File Selected:</span>
                </div>
                <div className="mt-2 text-sm text-green-700">
                  <p><strong>Name:</strong> {selectedFile.name}</p>
                  <p><strong>Size:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  <p><strong>Type:</strong> {selectedFile.type}</p>
                </div>
              </div>
            )}
          </div>

          {/* Format Selection Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Settings size={24} />
              Output Format
            </h2>
            
            {/* Format Selection Radio Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['webp', 'jpg', 'png'].map((format) => (
                <label key={format} className="cursor-pointer">
                  <div className={`
                    p-4 rounded-lg border-2 transition-all duration-300
                    ${targetFormat === format 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                    }
                  `}>
                    <input
                      type="radio"
                      name="format"
                      value={format}
                      checked={targetFormat === format}
                      onChange={(e) => setTargetFormat(e.target.value)}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-800 uppercase">
                        {format}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {format === 'webp' && 'Best compression'}
                        {format === 'jpg' && 'Universal support'}
                        {format === 'png' && 'Lossless quality'}
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={handleConvert}
              disabled={!selectedFile || isConverting}
              className={`
                flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300
                ${!selectedFile || isConverting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                }
              `}
            >
              {isConverting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Converting...
                </span>
              ) : (
                'Convert Image'
              )}
            </button>

            <button
              onClick={handleReset}
              className="flex-1 sm:flex-none py-3 px-6 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all duration-300"
            >
              Reset
            </button>
          </div>

          {/* Status Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-800">
                <AlertCircle size={20} />
                <span className="font-medium">Error:</span>
              </div>
              <p className="mt-1 text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle2 size={20} />
                <span className="font-medium">Success:</span>
              </div>
              <p className="mt-1 text-green-700">{success}</p>
            </div>
          )}

          {/* Download Section */}
          {convertedImageUrl && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Download size={24} />
                Download Converted Image
              </h3>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1">
                  <p className="text-gray-700">
                    Your image has been successfully converted to <strong>{targetFormat.toUpperCase()}</strong> format.
                  </p>
                </div>
                
                <button
                  onClick={handleDownload}
                  className="py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2"
                >
                  <Download size={20} />
                  Download
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Information */}
        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            All processing is done securely. Your images are not stored on our servers.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ImageConverter