import { Hono } from "hono";
import { auth } from "@lib/auth";

const authRoute = new Hono()

authRoute
    .on(["GET", "POST"], "/*", (c) => {
        console.log(`On /api/auth/* route`)

        return auth.handler(c.req.raw)
    })

export { authRoute }