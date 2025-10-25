export const getDatabaseUrl = () => {
    const isBunRuntime = typeof globalThis.Bun !== "undefined";
    console.log(isBunRuntime ? "🚀 Running in Bun" : "🚀 Not running in Bun");

    const DATABASE_URL = isBunRuntime ? process.env.DATABASE_URL : "postgresql://postgres:password@localhost:5432/skillwave";
    
    // If running postgres and the backend app in docker, use this instead:
    // const DATABASE_URL = isBunRuntime ? process.env.DATABASE_URL : "postgresql://postgres:password@postgres:5432/skillwave";

    if (!DATABASE_URL) {
        throw new Error("DATABASE_URL is not set in environment variables");
    }
    return DATABASE_URL;
}