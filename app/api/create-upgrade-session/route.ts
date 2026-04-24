import { NextResponse } from 'next/server';

const disabled = () =>
    NextResponse.json(
        { error: 'Slack Reserver has been discontinued. Subscription changes are disabled.' },
        { status: 410 },
    );

export const GET = disabled;
export const POST = disabled;
