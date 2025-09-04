import { drizzle } from "drizzle-orm/libsql/web";
import * as schema from "../database/schema";
import { TURSO_AUTH_TOKEN, TURSO_DATABASE_URL } from "./constant";

export const tables = schema;

export function useDB() {
  return drizzle({
    connection: {
      url: TURSO_DATABASE_URL,
      authToken: TURSO_AUTH_TOKEN,
    },
  });
}
