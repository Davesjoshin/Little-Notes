import { PrismaClient } from "@prisma/client";

// Global for preventing multiple instances of Prisma Client
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma = 
    globalForPrisma.prisma || new PrismaClient({
        log: ["error"],
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

// Prevents too many instances of Prisma Client