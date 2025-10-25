import { db } from "@/db/drizzle";
import { sendEmail } from "@lib/email";
import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg"
    }),

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true
    },

    emailVerification: {
        sendOnSignIn: true,
        sendVerificationEmail: async ({ user, url, token }) => {
            await sendEmail({
                to: user.email,
                subject: "Verify your email address",
                text: `Click the link to verify your email address: ${url}`,
            })
        },
    },

    plugins: [
        openAPI()
    ],
})  