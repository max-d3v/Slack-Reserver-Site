'use client'
//THIS IS MOSTLY FOR ERRORS
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Check, X } from 'lucide-react'
import loggerService from '@/lib/utils/logger'

export default function SlackAuthSuccess() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const error = searchParams.get('error')

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push('/')
    }, 30000)

    return () => clearTimeout(redirectTimer)
  }, [router]);


  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-md">
        <div className="mb-6 flex items-center justify-center">
          {status === "success" && !error ? (
            <div className="rounded-full bg-green-100 p-3">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          ) : (
            <div className="rounded-full bg-red-100 p-3">
              <X className="h-8 w-8 text-red-600" />
            </div>
          )}
        </div>

        <h1 className="mb-4 text-gray-800 text-center text-2xl font-bold">
          {status === "success" && !error
            ? 'Authentication Successful'
            : 'Authentication Failed'}
        </h1>

        <p className="text-center text-gray-600">
          {status === "success" && !error
            ? 'Your account has been successfully linked/created.'
            : `Authentication error: ${error || 'Unknown error'}`}
        </p>

        <p className="mt-4 text-center text-sm text-gray-500">
          You'll be redirected to the homepage in a few seconds...
        </p>
      </div>
    </div>
  )
}