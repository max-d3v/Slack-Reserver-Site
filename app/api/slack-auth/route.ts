// app/api/slack-auth/route.ts
import { NextResponse } from 'next/server';
import { SlackInstallation } from '@/types/types';
import { storeInstallation } from '@/lib/slack/installation';

export async function GET(request: Request) {
    // Get the URL and search params
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    
    if (!code) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    
    // Exchange the code for access tokens
    try {
        const clientId = process.env.SLACK_CLIENT_ID;
        const clientSecret = process.env.SLACK_CLIENT_SECRET;
        const redirectUri = "https://localhost:3000/api/slack-auth"; // Update this to your actual URL
        
        const response = await fetch('https://slack.com/api/oauth.v2.access', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: clientId || '',
                client_secret: clientSecret || '',
                code: code,
                redirect_uri: redirectUri,
            }).toString(),
        });
        
        const installation = await response.json();

        if (!installation.ok) {
            console.error('OAuth error:', installation.error);
            return NextResponse.redirect(new URL(`/auth-result?error=${installation.error}`, request.url));
        }

        console.log("Installation data: ", installation);
        
        // Store the installation data in your database
        const {workspace, tenant} = await storeInstallation(installation as SlackInstallation);

        console.log("Workspace created/updated: ", workspace);
        console.log("Tenant created/updated: ", tenant);
        
        // Redirect to success page or dashboard
        return NextResponse.redirect(new URL('/auth-result?status=success', request.url));
    } catch (error) {
        console.error('Error exchanging code for token:', error);
        return NextResponse.redirect(new URL('/auth-error', request.url));
    }
}

