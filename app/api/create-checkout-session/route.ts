import { NextResponse } from 'next/server';

const disabled = () =>
    NextResponse.json(
        { error: 'Slack Reserver has been discontinued. Checkout is disabled.' },
        { status: 410 },
    );

export const GET = disabled;
export const POST = disabled;
