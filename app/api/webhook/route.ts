import { NextResponse } from 'next/server';

export async function POST() {
    return NextResponse.json(
        { error: 'Slack Reserver has been discontinued. Webhook processing is disabled.' },
        { status: 410 },
    );
}
