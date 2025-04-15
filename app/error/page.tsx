'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { AlertTriangle, XCircle, Home, ArrowLeftCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const errorParam = searchParams.get('error')
  const [error, setError] = useState<string | null>(errorParam)
  
  // Parse any error code passed in the URL
  useEffect(() => {
    if (!errorParam) return
    
    try {
      // If it's a JSON string, parse it
      if (errorParam.startsWith('{') && errorParam.endsWith('}')) {
        const parsedError = JSON.parse(errorParam)
        setError(parsedError.message || 'An unknown error occurred')
      } else {
        setError(decodeURIComponent(errorParam))
      }
    } catch {
      // If parsing fails, use the raw string
      setError(errorParam)
    }
  }, [errorParam])
  
  const isAuthError = error?.toLowerCase().includes('auth') || 
                      error?.toLowerCase().includes('login') || 
                      error?.toLowerCase().includes('permission')
  
  const isInstallationError = error?.toLowerCase().includes('install') || 
                             error?.toLowerCase().includes('workspace') ||
                             error?.toLowerCase().includes('slack')
  
  const errorTitle = isAuthError ? 'Authentication Error' : 
                    isInstallationError ? 'Installation Failed' : 
                    'Something Went Wrong'

  const renderErrorIcon = () => {
    return isAuthError ? (
      <XCircle className="h-24 w-24 text-red-500 mb-6" />
    ) : (
      <AlertTriangle className="h-24 w-24 text-amber-500 mb-6" />
    )
  }

  const renderErrorMessage = () => {
    // Default message if no specific error is provided
    if (!error) {
      return "We encountered an unexpected error. Please try again later."
    }
    
    return error
  }

  const renderSuggestion = () => {
    if (isAuthError) {
      return "Try signing in again or contact your workspace administrator if the problem persists."
    }
    
    if (isInstallationError) {
      return "Please try installing the app again or make sure you have the necessary permissions."
    }
    
    return "Try refreshing the page or coming back later."
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {renderErrorIcon()}
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {errorTitle}
        </h1>
        
        <div className="bg-red-50 border border-red-100 rounded-md p-4 mb-6">
          <p className="text-red-800 font-medium break-words">
            {renderErrorMessage()}
          </p>
        </div>
        
        <p className="text-gray-600 mb-8">
          {renderSuggestion()}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            variant="default"
            className="bg-[#4A154B] hover:bg-[#4A154B]/90 flex gap-2 items-center"
            onClick={() => window.location.href = '/'}
          >
            <Home size={18} />
            Back to Home
          </Button>
          
          {isAuthError && (
            <Button 
              variant="outline" 
              className="flex gap-2 items-center"
              onClick={() => window.location.href = '/login'}
            >
              <ArrowLeftCircle size={18} />
              Try Again
            </Button>
          )}
          
          {!isAuthError && (
            <Button 
              variant="outline"
              className="flex gap-2 items-center"
              onClick={() => window.location.reload()}
            >
              <RefreshCw size={18} />
              Refresh Page
            </Button>
          )}
        </div>
      </div>
      
      <div className="mt-8 text-gray-500 text-center">
        <p>Need assistance? Contact our support team at <a href="mailto:support@reserver.app" className="text-[#4A154B] hover:underline">support@reserver.app</a></p>
      </div>
    </div>
  )
}
