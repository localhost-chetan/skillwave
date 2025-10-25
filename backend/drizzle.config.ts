import { defineConfig } from "drizzle-kit"
import { getDatabaseUrl } from "@utils/db"

export default defineConfig({
    out: "./drizzle/migrations/",
    schema: "./src/db/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: getDatabaseUrl()
    },
    casing: "snake_case",
    strict: true,
    verbose: true
})