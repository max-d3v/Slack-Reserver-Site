"use client"

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { FcGoogle } from "react-icons/fc"

export default function SignIn() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  return (
    <div className="flex min-h-screen flex-col items-center justify-center  from-background to-muted/30">
      <div className="w-full max-w-md space-y-6 p-8 rounded-lg shadow-xl border border-slate-300 bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Welcome!</h1>
          <p className="mt-3 text-muted-foreground">Sign in to your account to continue</p>
        </div>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border"></span>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-2 text-muted-foreground">Sign in with</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => signIn('google', { callbackUrl })}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-input rounded-md 
                     shadow-sm text-sm font-medium transition-all
                     bg-background hover:bg-accent hover:text-accent-foreground
                     focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <FcGoogle className="h-5 w-5" /> 
            <span>Continue with Google</span>
          </button>
          
          
        </div>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>By signing in, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a></p>
        </div>
      </div>
    </div>
  )
}