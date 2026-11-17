import { env } from "@/data/env/server";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { relations } from "./schema";

const client = neon(env.DATABASE_URL);

export const db = drizzle({ client, relations: relations });
