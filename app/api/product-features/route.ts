import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json(
        { error: 'Slack Reserver has been discontinued. Admin endpoints are disabled.' },
        { status: 410 },
    );
}
