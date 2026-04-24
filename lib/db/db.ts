// Database is intentionally disabled for this deployment.
// Every model method resolves to an empty/no-op result so existing call sites
// continue to type-check and run without a real PostgreSQL connection.

const stubModel = new Proxy(
  {},
  {
    get(_target, method: string) {
      return async (...args: any[]) => {
        switch (method) {
          case 'findMany':
            return [];
          case 'count':
            return 0;
          case 'aggregate':
          case 'groupBy':
            return [];
          case 'findUnique':
          case 'findFirst':
          case 'findUniqueOrThrow':
          case 'findFirstOrThrow':
            return null;
          case 'create':
          case 'update':
          case 'upsert':
          case 'delete':
            return (args[0]?.data ?? args[0]?.create ?? {}) as any;
          case 'createMany':
          case 'updateMany':
          case 'deleteMany':
            return { count: 0 };
          default:
            return null;
        }
      };
    },
  },
);

const prisma: any = new Proxy(
  {},
  {
    get(_target, prop: string) {
      if (prop === '$queryRaw' || prop === '$executeRaw' || prop === '$queryRawUnsafe' || prop === '$executeRawUnsafe') {
        return async () => [];
      }
      if (prop === '$on' || prop === '$use') {
        return () => undefined;
      }
      if (prop === '$connect' || prop === '$disconnect' || prop === '$transaction') {
        return async (arg?: any) => (typeof arg === 'function' ? arg(prisma) : arg);
      }
      return stubModel;
    },
  },
);

export default prisma;
