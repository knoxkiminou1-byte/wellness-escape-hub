import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../shared/schema";

const { Pool } = pg;

let pool: pg.Pool | null = null;
let db: NodePgDatabase<typeof schema> | null = null;

async function initializeDatabase() {
  if (!process.env.DATABASE_URL) {
    console.warn(
      "DATABASE_URL not set. Running in memory-only mode. Data will not persist."
    );
    return;
  }

  try {
    const testPool = new Pool({ connectionString: process.env.DATABASE_URL });
    const testDb = drizzle(testPool, { schema });
    
    // Test if tables exist by running a simple query
    await testDb.select().from(schema.users).limit(1);
    
    // If we get here, tables exist - use this connection
    pool = testPool;
    db = testDb;
    console.log("Connected to PostgreSQL database");
  } catch (error: any) {
    if (error.code === "42P01" || error.message?.includes("does not exist")) {
      console.warn(
        "Database tables not initialized. Running in memory-only mode. Data will not persist."
      );
    } else {
      console.warn(
        "Failed to connect to database:",
        error.message,
        "Running in memory-only mode. Data will not persist."
      );
    }
    // Leave db as null to trigger MemoryStorage fallback
  }
}

// Initialize immediately
initializeDatabase();

export { pool, db };
