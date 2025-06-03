import { NextResponse } from 'next/server';
import logger from '@/lib/utils/logger';
import prisma from '@/lib/db/db';

export async function GET(request: Request) {
    try {
        const healthCheck = await prisma.$queryRaw`SELECT 1 AS health_check`;

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