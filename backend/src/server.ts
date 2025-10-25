import { Hono } from 'hono'
import { db } from '@/db/drizzle'
import { user } from '@/db/schema'
import { authRoute } from '@routes/authRoutes'

const app = new Hono()

app
    .get("/", (c) => {
        return c.json({ message: "Hello World!" })
    })
    .get("/db-check", async (c) => {
        const currentDatabase = await db.execute("SELECT current_database()")
        console.log(`🚀 ~ server.ts:14 ~ currentDatabase: `, currentDatabase);


        const result = await db.select().from(user)
        return c.json({ message: "DB Connected!", users: result })
    })
    .route("/api/auth/", authRoute)

export default {
    fetch: app.fetch,
    port: process.env.PORT || 3001
}
