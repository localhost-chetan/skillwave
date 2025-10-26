import { configDotenv } from "dotenv";

configDotenv({ path: "./.env.local" });

export const getDatabaseUrl = () => {
    const DATABASE_URL = process.env.DATABASE_URL;
    console.log(`🚀 ~ db.ts:7 ~ getDatabaseUrl ~ DATABASE_URL: `, DATABASE_URL);

    if (!DATABASE_URL) {
        throw new Error("DATABASE_URL is not set in environment variables");
    }
    return DATABASE_URL;
}