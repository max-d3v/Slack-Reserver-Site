"use client"

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ErrorProps {
  error: Error
  reset: () => void
}

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Uncaught application error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <div className="text-center sm:text-left">
                <h1 className="text-4xl font-extrabold text-[#4A154B] tracking-tight sm:text-5xl">
                  Something went wrong!
                </h1>
                <p className="mt-4 text-base text-gray-500">
                  We apologize for the inconvenience. Our team has been notified of this issue.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                  <button
                    onClick={reset}
                    className="bg-[#4A154B] text-white hover:bg-[#611f64] px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A154B]"
                  >
                    Try again
                  </button>
                  <Link 
                    href="/"
                    className="bg-white text-[#4A154B] hover:bg-gray-50 px-4 py-2 border border-[#4A154B] rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A154B]"
                  >
                    Go to homepage
                  </Link>
                </div>
                <p className="mt-8 text-sm text-gray-500">
                  Error details: {error.message || 'Unknown error'}
                </p>
              </div>
            </div>
            <div className="mt-10 text-sm text-gray-500 text-center sm:text-left">
              <p>Need assistance? Contact our support team at <a href="mailto:support@reserver.app" className="text-[#4A154B] hover:underline">support@reserver.app</a></p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Error