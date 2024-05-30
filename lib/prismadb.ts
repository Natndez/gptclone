import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
};

// There is a chance lots of prisma clients are initialized everytime we hot reload with next. Thus doing this so hot reloading so we can have multiple prisma contexts active.
const prismadb = globalThis.prisma || new PrismaClient();

// Only do in development env
if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = prismadb;
}

export default prismadb;