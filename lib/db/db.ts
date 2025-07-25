import { PrismaClient } from '@prisma/client';
import loggerService from '../utils/logger';



// Enhanced Prisma client with comprehensive logging
const prisma = new PrismaClient({
    log: [
      { emit: 'event', level: 'query' },
      { emit: 'event', level: 'error' },
      { emit: 'event', level: 'info' },
      { emit: 'event', level: 'warn' },
    ],
  });

// Add event listeners for critical logging
prisma.$on('error', async (e) => {
  await loggerService.critical('database-error', 
    'Prisma database error occurred', 
    {
      target: e.target,
      message: e.message,
      timestamp: e.timestamp,
    }
  );
});

prisma.$on('warn', async (e) => {
  await loggerService.warn('database-warn', 
    'Prisma database warning', 
    {
      target: e.target,
      message: e.message,
      timestamp: e.timestamp,
    }
  );
});

// Log slow queries (optional)
prisma.$on('query', async (e) => {
  if (e.duration > 1000) { // Log queries taking more than 1 second
    await loggerService.warn('database-slow-query', 
      'Slow database query detected', 
      {
        query: e.query,
        params: e.params,
        duration: e.duration,
        target: e.target,
        timestamp: e.timestamp,
      }
    );
  }
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;