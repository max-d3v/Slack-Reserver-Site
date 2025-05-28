// app/api/slack-auth/route.ts
import { NextResponse } from 'next/server';
import { SlackInstallation } from '@/types/types';
import { storeInstallation } from '@/lib/slack/installation';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    
    if (!state) {
        throw new Error("No logged account was found")
    }    
    if (!code) {
        throw new Error("Slack permit unsuccessful. No client code was provided.") 
    }
    
    try {
        const clientId = process.env.SLACK_CLIENT_ID;
        const clientSecret = process.env.SLACK_CLIENT_SECRET;
        const redirectUri = process.env.NEXT_PUBLIC_SITE_URL + "/api/slack-auth"; 
        
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
        
        const {workspace, tenant} = await storeInstallation(installation as SlackInstallation, state);
        

        // Redirect to pricing
        return NextResponse.redirect(new URL('/pricing', request.url));
    } catch (error: any) {
        console.error('Error exchanging code for token:', error);
        return NextResponse.redirect(new URL(`/auth-result?error=${error.message}`, request.url));
    }
}

