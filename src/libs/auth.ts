import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from 'astro:db';
import { User, Session, Account, Verification } from "astro:db";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            users: User,
            sessions: Session,
            accounts: Account,
            verificationTokens: Verification
        },
    }),
    emailAndPassword: {
        enabled: true,
    }
});