'use client'

import React, { useState, useRef } from 'react'
import { Upload, Download, Settings, Image as ImageIcon, FileImage, AlertCircle, CheckCircle2, Folder, Files, Archive } from 'lucide-react'
import JSZip from 'jszip'

/**
 * Enhanced Image Converter Component
 * 
 * This component provides a comprehensive image conversion interface that allows users to:
 * 1. Upload multiple images or entire folders via drag-and-drop or file selection
 * 2. Select target format (JPG, PNG, WebP) with WebP as default
 * 3. Convert all images using batch server-side processing
 * 4. Download converted images individually (< 5 images) or as ZIP (>= 5 images or user choice)
 * 5. Handle large batches of images efficiently
 * 
 * The component uses React hooks for state management and implements
 * a clean, responsive UI matching the homepage color scheme with TailwindCSS.
 */
const ImageConverter = () => {
  // State management for the enhanced image converter functionality
  const [selectedFiles, setSelectedFiles] = useState([]) // Array of uploaded files
  const [convertedImages, setConvertedImages] = useState([]) // Array of converted image data
  const [targetFormat, setTargetFormat] = useState('webp') // Default conversion format
  const [isConverting, setIsConverting] = useState(false) // Loading state during conversion
  const [conversionProgress, setConversionProgress] = useState(0) // Progress percentage for batch conversion
  const [isDragOver, setIsDragOver] = useState(false) // Visual feedback for drag-and-drop
  const [error, setError] = useState('') // Error messages
  const [success, setSuccess] = useState('') // Success messages
  
  // References to the hidden file input elements
  const fileInputRef = useRef(null) // For multiple file selection
  const folderInputRef = useRef(null) // For folder selection

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
   * Handles multiple file selection from file input or drag-and-drop
   * Validates each file and updates the component state with valid images
   * @param {FileList|Array} files - The selected files
   */
  const handleFileSelect = (files) => {
    // Clear previous states
    setError('')
    setSuccess('')
    setConvertedImages([])
    setConversionProgress(0)

    // Convert FileList to Array for easier manipulation
    const fileArray = Array.from(files)
    
    // Filter and validate image files
    const validFiles = []
    const invalidFiles = []
    const oversizedFiles = []
    const maxSize = 10 * 1024 * 1024 // 10MB per file

    fileArray.forEach(file => {
      if (!isValidImageFile(file)) {
        invalidFiles.push(file.name)
      } else if (file.size > maxSize) {
        oversizedFiles.push(file.name)
      } else {
        validFiles.push(file)
      }
    })

    // Display validation results
    if (invalidFiles.length > 0) {
      setError(`Invalid file types: ${invalidFiles.join(', ')}. Please select only image files.`)
    }
    
    if (oversizedFiles.length > 0) {
      setError(prevError => 
        prevError 
          ? `${prevError} Files too large (>10MB): ${oversizedFiles.join(', ')}`
          : `Files too large (>10MB): ${oversizedFiles.join(', ')}`
      )
    }

    if (validFiles.length === 0) {
      if (invalidFiles.length === 0 && oversizedFiles.length === 0) {
        setError('No files selected.')
      }
      return
    }

    // Check total number of files (reasonable limit)
    if (validFiles.length > 100) {
      setError('Too many files selected. Please select 100 files or fewer.')
      return
    }

    setSelectedFiles(validFiles)
    setSuccess(`${validFiles.length} image${validFiles.length > 1 ? 's' : ''} uploaded successfully!`)
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
   * Extracts files from the dropped items and processes them
   */
  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files)
    }
  }

  /**
   * Handles multiple file input change event
   * Processes the selected files from the file input element
   */
  const handleFileInputChange = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files)
    }
  }

  /**
   * Handles folder input change event for folder upload
   * Processes all files from the selected folder
   */
  const handleFolderInputChange = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files)
    }
  }

  /**
   * Triggers the hidden multiple file input when the upload area is clicked
   */
  const handleUploadAreaClick = () => {
    fileInputRef.current?.click()
  }

  /**
   * Triggers the hidden folder input for folder selection
   */
  const handleFolderUploadClick = () => {
    folderInputRef.current?.click()
  }

  /**
   * Handles the batch image conversion process
   * Sends each image to the server API for conversion and tracks progress
   */
  const handleBatchConvert = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      setError('Please select images first')
      return
    }

    setIsConverting(true)
    setError('')
    setSuccess('')
    setConvertedImages([])
    setConversionProgress(0)

    const convertedResults = []
    const failedConversions = []

    try {
      // Process images in batches to avoid overwhelming the server
      const batchSize = 3 // Process 3 images at a time
      
      for (let i = 0; i < selectedFiles.length; i += batchSize) {
        const batch = selectedFiles.slice(i, i + batchSize)
        
        // Process current batch in parallel
        const batchPromises = batch.map(async (file, batchIndex) => {
          try {
            const formData = new FormData()
            formData.append('image', file)
            formData.append('format', targetFormat)

            const response = await fetch('/api/convert-image', {
              method: 'POST',
              body: formData,
            })

            if (!response.ok) {
              throw new Error(`Conversion failed for ${file.name}`)
            }

            const blob = await response.blob()
            
            return {
              originalName: file.name,
              convertedBlob: blob,
              convertedUrl: URL.createObjectURL(blob),
              success: true
            }
          } catch (error) {
            console.error(`Error converting ${file.name}:`, error)
            return {
              originalName: file.name,
              error: error.message,
              success: false
            }
          }
        })

        // Wait for current batch to complete
        const batchResults = await Promise.all(batchPromises)
        
        // Separate successful and failed conversions
        batchResults.forEach(result => {
          if (result.success) {
            convertedResults.push(result)
          } else {
            failedConversions.push(result)
          }
        })

        // Update progress
        const completedCount = i + batch.length
        const progressPercent = Math.min((completedCount / selectedFiles.length) * 100, 100)
        setConversionProgress(progressPercent)
      }

      // Update state with results
      setConvertedImages(convertedResults)

      // Show results summary
      if (convertedResults.length > 0 && failedConversions.length === 0) {
        setSuccess(`All ${convertedResults.length} images successfully converted to ${targetFormat.toUpperCase()}!`)
      } else if (convertedResults.length > 0 && failedConversions.length > 0) {
        setSuccess(`${convertedResults.length} images converted successfully. ${failedConversions.length} failed.`)
        setError(`Failed conversions: ${failedConversions.map(f => f.originalName).join(', ')}`)
      } else {
        setError('All conversions failed. Please try again.')
      }

    } catch (error) {
      setError('Batch conversion failed. Please try again.')
      console.error('Batch conversion error:', error)
    } finally {
      setIsConverting(false)
    }
  }

  /**
   * Downloads a single converted image
   * @param {Object} convertedImage - The converted image object
   */
  const handleSingleDownload = (convertedImage) => {
    const link = document.createElement('a')
    link.href = convertedImage.convertedUrl
    
    // Generate filename with new extension
    const originalName = convertedImage.originalName.split('.').slice(0, -1).join('.')
    link.download = `${originalName}_converted.${targetFormat}`
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  /**
   * Creates and downloads a ZIP file containing all converted images
   * Uses JSZip to package multiple images into a single download
   */
  const handleZipDownload = async () => {
    if (!convertedImages || convertedImages.length === 0) {
      setError('No converted images to download')
      return
    }

    try {
      // Create a new JSZip instance
      const zip = new JSZip()
      
      // Create a folder inside the ZIP for organization
      const imagesFolder = zip.folder("converted_images")

      // Add each converted image to the ZIP
      for (const convertedImage of convertedImages) {
        // Generate filename with new extension
        const originalName = convertedImage.originalName.split('.').slice(0, -1).join('.')
        const fileName = `${originalName}_converted.${targetFormat}`
        
        // Add the blob data to the ZIP folder
        imagesFolder.file(fileName, convertedImage.convertedBlob)
      }

      // Generate the ZIP file
      const zipBlob = await zip.generateAsync({type: "blob"})
      
      // Create download link for the ZIP file
      const zipUrl = URL.createObjectURL(zipBlob)
      const link = document.createElement('a')
      link.href = zipUrl
      link.download = `converted_images_${targetFormat}.zip`
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Clean up the URL
      URL.revokeObjectURL(zipUrl)
      
    } catch (error) {
      setError('Failed to create ZIP file. Please try again.')
      console.error('ZIP creation error:', error)
    }
  }

  /**
   * Resets the converter to initial state
   * Clears all files, messages, and converted images
   */
  const handleReset = () => {
    setSelectedFiles([])
    setConvertedImages([])
    setError('')
    setSuccess('')
    setConversionProgress(0)
    
    // Clear file inputs
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    if (folderInputRef.current) {
      folderInputRef.current.value = ''
    }

    // Clean up blob URLs to prevent memory leaks
    convertedImages.forEach(img => {
      if (img.convertedUrl) {
        URL.revokeObjectURL(img.convertedUrl)
      }
    })
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-3">
            <ImageIcon className="text-blue-600" size={40} />
            Image Converter
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Convert multiple images or entire folders to different formats quickly and easily. 
            Upload any number of images and convert them to JPG, PNG, or WebP format.
          </p>
        </div>

        {/* Main Converter Card */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 md:p-8">
          
          {/* File Upload Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Upload size={24} />
              Upload Images
            </h2>
            
            {/* Upload Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Multiple Files Upload */}
              <button
                onClick={handleUploadAreaClick}
                className="p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 text-center"
              >
                <Files size={32} className="mx-auto text-slate-400 mb-2" />
                <p className="font-medium text-slate-700">Upload Multiple Files</p>
                <p className="text-sm text-slate-500">Select multiple images</p>
              </button>

              {/* Folder Upload */}
              <button
                onClick={handleFolderUploadClick}
                className="p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 text-center"
              >
                <Folder size={32} className="mx-auto text-slate-400 mb-2" />
                <p className="font-medium text-slate-700">Upload Folder</p>
                <p className="text-sm text-slate-500">Select entire folder</p>
              </button>
            </div>

            {/* Main Drag and Drop Area */}
            <div
              className={`
                border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300
                ${isDragOver 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-slate-300 hover:border-blue-600 hover:bg-slate-50'
                }
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleUploadAreaClick}
            >
              <FileImage size={48} className="mx-auto text-slate-400 mb-4" />
              <p className="text-lg font-medium text-slate-700 mb-2">
                {selectedFiles.length > 0 
                  ? `${selectedFiles.length} image${selectedFiles.length > 1 ? 's' : ''} selected`
                  : 'Drop your images here or click to browse'
                }
              </p>
              <p className="text-sm text-slate-500">
                Supports: JPG, PNG, WebP, GIF, BMP, TIFF (Max 10MB per file, 100 files max)
              </p>
              
              {/* Hidden file inputs */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple={true}
                onChange={handleFileInputChange}
                className="hidden"
              />
              <input
                ref={folderInputRef}
                type="file"
                accept="image/*"
                webkitdirectory=""
                multiple={true}
                onChange={handleFolderInputChange}
                className="hidden"
              />
            </div>

            {/* Selected Files Display */}
            {selectedFiles.length > 0 && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 text-blue-800 mb-3">
                  <CheckCircle2 size={20} />
                  <span className="font-medium">Selected Files ({selectedFiles.length}):</span>
                </div>
                <div className="max-h-40 overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedFiles.slice(0, 10).map((file, index) => (
                      <div key={index} className="text-sm text-blue-700 bg-white px-3 py-2 rounded border">
                        <p className="font-medium truncate">{file.name}</p>
                        <p className="text-xs text-blue-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    ))}
                  </div>
                  {selectedFiles.length > 10 && (
                    <p className="text-sm text-blue-600 mt-2">
                      ... and {selectedFiles.length - 10} more files
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Format Selection Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
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
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-slate-200 hover:border-blue-300'
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
                      <div className="text-lg font-semibold text-slate-800 uppercase">
                        {format}
                      </div>
                      <div className="text-sm text-slate-600 mt-1">
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
              onClick={handleBatchConvert}
              disabled={selectedFiles.length === 0 || isConverting}
              className={`
                flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300
                ${selectedFiles.length === 0 || isConverting
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                }
              `}
            >
              {isConverting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Converting... {Math.round(conversionProgress)}%
                </span>
              ) : (
                `Convert ${selectedFiles.length} Image${selectedFiles.length > 1 ? 's' : ''}`
              )}
            </button>

            <button
              onClick={handleReset}
              className="flex-1 sm:flex-none py-3 px-6 rounded-lg font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300 transition-all duration-300"
            >
              Reset
            </button>
          </div>

          {/* Progress Bar */}
          {isConverting && (
            <div className="mb-6">
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${conversionProgress}%` }}
                ></div>
              </div>
            </div>
          )}

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
          {convertedImages.length > 0 && (
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Download size={24} />
                Download Converted Images
              </h3>
              
              <div className="mb-4">
                <p className="text-slate-700">
                  <strong>{convertedImages.length}</strong> image{convertedImages.length > 1 ? 's' : ''} successfully converted to <strong>{targetFormat.toUpperCase()}</strong> format.
                </p>
              </div>

              {/* Conditional Download Options */}
              {convertedImages.length < 5 ? (
                // Less than 5 images: Show both individual and ZIP download options
                <div className="space-y-4">
                  {/* Individual Downloads */}
                  <div>
                    <h4 className="font-medium text-slate-800 mb-3">Download Individual Images:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {convertedImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => handleSingleDownload(image)}
                          className="flex items-center gap-2 py-2 px-3 bg-green-600 hover:bg-green-700 text-white rounded transition-all duration-300 text-sm"
                        >
                          <Download size={16} />
                          {image.originalName.split('.').slice(0, -1).join('.')}.{targetFormat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ZIP Download Option */}
                  <div className="border-t border-slate-300 pt-4">
                    <h4 className="font-medium text-slate-800 mb-3">Or download all as ZIP:</h4>
                    <button
                      onClick={handleZipDownload}
                      className="flex items-center gap-2 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
                    >
                      <Archive size={20} />
                      Download ZIP ({convertedImages.length} images)
                    </button>
                  </div>
                </div>
              ) : (
                // 5 or more images: Show only ZIP download option
                <div>
                  <p className="text-slate-600 mb-4">
                    With {convertedImages.length} images, we recommend downloading them as a ZIP file for convenience.
                  </p>
                  <button
                    onClick={handleZipDownload}
                    className="flex items-center gap-2 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
                  >
                    <Archive size={20} />
                    Download ZIP ({convertedImages.length} images)
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Information */}
        <div className="mt-8 text-center text-slate-600">
          <p className="text-sm">
            All processing is done securely. Your images are processed on our servers and not permanently stored.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ImageConverter