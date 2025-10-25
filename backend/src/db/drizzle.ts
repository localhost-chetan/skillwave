import { SQL } from "bun";
import * as schema from "@/db/schema";
import { getDatabaseUrl } from "@utils/db";
import { drizzle } from "drizzle-orm/bun-sql";

const client = new SQL(getDatabaseUrl())

export const db = drizzle({ client, schema, casing: "snake_case" })