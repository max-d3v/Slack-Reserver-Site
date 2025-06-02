import { NextResponse } from 'next/server';
import logger from '@/lib/utils/logger';


export async function GET(request: Request) {
    try {
        logger.critical('healthcheck', `teste: health check successful`);

        return NextResponse.json(
            { message: 'Health check successful' },
            { status: 200 }
        );
    } catch (error: any) {
        logger.critical('healthcheck', `health check error: ${error.message}`);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );

    }
}