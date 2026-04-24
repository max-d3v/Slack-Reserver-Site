import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json(
        { error: 'Slack Reserver has been discontinued. Slack integration is disabled.' },
        { status: 410 },
    );
}
