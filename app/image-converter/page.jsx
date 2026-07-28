'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Upload, Download, Settings, Image as ImageIcon, FileImage, AlertCircle, CheckCircle2, Archive } from 'lucide-react'
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
    const maxSize = 100 * 1024 * 1024 // 100MB per file

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
    // Reset the input value to allow selecting the same files again if needed
    e.target.value = ''
  }

  /**
   * Triggers the file input when the upload area is clicked
   */
  const handleUploadAreaClick = () => {
    fileInputRef.current?.click()
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
        const batchPromises = batch.map(async (file) => {
          let retryCount = 0
          const maxRetries = 2

          while (retryCount <= maxRetries) {
            try {
              const formData = new FormData()
              formData.append('image', file)
              formData.append('format', targetFormat)

              // Add timeout for production environments
              const controller = new AbortController()
              const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 seconds timeout

              const response = await fetch('/api/convert-image', {
                method: 'POST',
                body: formData,
                signal: controller.signal
              })

              clearTimeout(timeoutId)

              if (!response.ok) {
                // Try to get more detailed error information
                let errorMessage = `HTTP ${response.status}: ${response.statusText}`
                try {
                  const errorData = await response.json()
                  if (errorData.error) {
                    errorMessage = errorData.error
                  }
                } catch (parseError) {
                  // If we can't parse the error response, use the default message
                  console.error('Error parsing error response:', parseError)
                }
                throw new Error(`Conversion failed for ${file.name}: ${errorMessage}`)
              }

              const blob = await response.blob()

              return {
                originalName: file.name,
                convertedBlob: blob,
                convertedUrl: URL.createObjectURL(blob),
                success: true
              }

            } catch (error) {
              console.error(`Error converting ${file.name} (attempt ${retryCount + 1}):`, error)

              // Check if it's a timeout or network error that might be retryable
              const isRetryableError = error.name === 'AbortError' ||
                error.message.includes('timeout') ||
                error.message.includes('network') ||
                error.message.includes('502') ||
                error.message.includes('503') ||
                error.message.includes('504')

              if (isRetryableError && retryCount < maxRetries) {
                retryCount++
                console.log(`🔄 Retrying ${file.name} (attempt ${retryCount + 1}/${maxRetries + 1})`)
                // Wait before retry (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000))
                continue
              }

              // If all retries failed or non-retryable error
              return {
                originalName: file.name,
                error: error.message,
                success: false
              }
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
    link.download = `${originalName}.${targetFormat}`

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
        const fileName = `${originalName}.${targetFormat}`

        // Add the blob data to the ZIP folder
        imagesFolder.file(fileName, convertedImage.convertedBlob)
      }

      // Generate the ZIP file
      const zipBlob = await zip.generateAsync({ type: "blob" })

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

    // Clean up blob URLs to prevent memory leaks
    convertedImages.forEach(img => {
      if (img.convertedUrl) {
        URL.revokeObjectURL(img.convertedUrl)
      }
    })
  }

  // Clear object URLs on unmount
  useEffect(() => {
    return () => {
      convertedImages.forEach(img => {
        if (img.convertedUrl) {
          URL.revokeObjectURL(img.convertedUrl)
        }
      })
    }
  }, [convertedImages])

  return (
    <div className="min-h-screen py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 border border-blue-500/15">
            <ImageIcon className="w-3.5 h-3.5" />
            Developer Tools
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Image Format Converter
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Convert multiple images to modern formats instantly. Bulk upload files, select options, and compile them into ZIP archives with ease.
          </p>
        </div>

        {/* Main Converter Card */}
        <div className="glass rounded-3xl border border-slate-200/50 dark:border-slate-800/40 p-6 md:p-10 shadow-xl shadow-slate-100/30 dark:shadow-none relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none -z-10"></div>

          {/* File Upload Section */}
          <div className="mb-10">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
              <Upload size={20} className="text-blue-600 dark:text-blue-400" />
              1. Upload Images
            </h2>

            {/* Main Drag and Drop Area */}
            <div
              className={`
                border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 relative group
                ${isDragOver
                  ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/15'
                  : 'border-slate-350 dark:border-slate-800 hover:border-blue-500/50 hover:bg-slate-50/30 dark:hover:bg-slate-900/10'
                }
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleUploadAreaClick}
            >
              <div className="p-4 rounded-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileImage size={32} className="text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
                {selectedFiles.length > 0
                  ? `${selectedFiles.length} image${selectedFiles.length > 1 ? 's' : ''} selected`
                  : 'Drag & drop images here, or browse files'
                }
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">
                Supports JPG, PNG, WebP, GIF, BMP, TIFF (Up to 100MB per file)
              </p>
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 underline">
                Browse Files
              </span>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple={true}
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>

            {/* Selected Files Grid */}
            {selectedFiles.length > 0 && (
              <div className="mt-6 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/10 animate-fade-in">
                <div className="flex items-center gap-2 text-slate-755 dark:text-slate-300 mb-3">
                  <CheckCircle2 size={18} className="text-green-500" />
                  <span className="text-sm font-bold">Selected Files ({selectedFiles.length}):</span>
                </div>
                <div className="max-h-48 overflow-y-auto pr-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedFiles.slice(0, 10).map((file, index) => (
                      <div key={index} className="text-xs flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-350">
                        <span className="font-semibold truncate max-w-[70%] text-slate-800 dark:text-slate-205">{file.name}</span>
                        <span className="text-slate-400 dark:text-slate-500 font-bold shrink-0">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                    ))}
                  </div>
                  {selectedFiles.length > 10 && (
                    <p className="text-xs text-slate-405 dark:text-slate-500 mt-3 text-center">
                      ... and {selectedFiles.length - 10} more files
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Format Selection Section */}
          <div className="mb-10">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
              <Settings size={20} className="text-blue-600 dark:text-blue-400" />
              2. Select Target Format
            </h2>

            {/* Format Selection Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['webp', 'jpg', 'png'].map((format) => (
                <label key={format} className="cursor-pointer">
                  <div className={`
                    p-5 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-2 bg-white dark:bg-slate-900/60
                    ${targetFormat === format
                      ? 'border-blue-600 dark:border-blue-500 shadow-md shadow-blue-500/5'
                      : 'border-slate-200 dark:border-slate-850 hover:border-blue-500/30'
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
                    <span className={`text-xl font-black uppercase ${targetFormat === format ? 'text-blue-600 dark:text-blue-400' : 'text-slate-800 dark:text-slate-200'}`}>
                      {format}
                    </span>
                    <span className="text-xs text-center text-slate-400 dark:text-slate-500">
                      {format === 'webp' && 'Best size & quality'}
                      {format === 'jpg' && 'Universal standard'}
                      {format === 'png' && 'Lossless & transparency'}
                    </span>
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
                flex-grow py-3.5 px-6 rounded-xl font-bold text-white transition-all duration-300 transform active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2
                ${selectedFiles.length === 0 || isConverting
                  ? 'bg-slate-200 dark:bg-slate-800/80 text-slate-400 dark:text-slate-600 cursor-not-allowed transform-none'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/10 hover:scale-[1.01]'
                }
              `}
            >
              {isConverting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Converting... {Math.round(conversionProgress)}%
                </>
              ) : (
                <>
                  Convert {selectedFiles.length} Image{selectedFiles.length > 1 ? 's' : ''}
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="py-3.5 px-6 rounded-xl font-bold text-slate-705 dark:text-slate-350 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 transition-all duration-300 cursor-pointer"
            >
              Reset
            </button>
          </div>

          {/* Progress Bar */}
          {isConverting && (
            <div className="mb-6">
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-200/10">
                <div
                  className="bg-blue-650 h-full rounded-full transition-all duration-350"
                  style={{ width: `${conversionProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Status Messages */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-400 border border-red-200/50 dark:border-red-900/30 animate-fade-in">
              <div className="flex items-center gap-2 font-bold mb-1">
                <AlertCircle size={18} className="shrink-0" />
                <span>Conversion Error</span>
              </div>
              <p className="text-xs leading-relaxed">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-950/20 text-green-805 dark:text-green-400 border border-green-200/50 dark:border-green-900/30 animate-fade-in">
              <div className="flex items-center gap-2 font-bold mb-1">
                <CheckCircle2 size={18} className="shrink-0" />
                <span>Conversion Complete</span>
              </div>
              <p className="text-xs leading-relaxed">{success}</p>
            </div>
          )}

          {/* Download Box */}
          {convertedImages.length > 0 && (
            <div className="bg-slate-50/50 dark:bg-slate-950/15 rounded-2xl p-6 border border-slate-200 dark:border-slate-800/80 mt-8 animate-fade-in">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Download size={20} className="text-blue-600 dark:text-blue-400" />
                3. Download Results
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Converted <strong>{convertedImages.length}</strong> image{convertedImages.length > 1 ? 's' : ''} to <strong>{targetFormat.toUpperCase()}</strong>. Download them individually or packaged together in a ZIP file.
              </p>

              {/* Conditional Download triggers */}
              {convertedImages.length < 5 ? (
                <div className="space-y-6">
                  {/* Individual Buttons */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Individual Download:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {convertedImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => handleSingleDownload(image)}
                          className="flex items-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition duration-200 text-xs font-bold cursor-pointer"
                        >
                          <Download size={14} />
                          {image.originalName.split('.').slice(0, -1).join('.')}.{targetFormat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ZIP triggers */}
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Package Download:</h4>
                    <button
                      onClick={handleZipDownload}
                      className="flex items-center gap-2 py-3 px-5 bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all duration-300 shadow-md shadow-blue-500/10 cursor-pointer animate-pulse"
                    >
                      <Archive size={18} />
                      Download ZIP Archive ({convertedImages.length} files)
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    onClick={handleZipDownload}
                    className="flex items-center gap-2 py-3.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all duration-300 shadow-md shadow-blue-500/10 cursor-pointer"
                  >
                    <Archive size={18} />
                    Download ZIP Archive ({convertedImages.length} files)
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Notes */}
        <div className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
          All image processes are run completely on-demand. Uploaded contents are temporarily processed and are never saved or kept permanently.
        </div>
      </div>
    </div>
  )
}

export default ImageConverter