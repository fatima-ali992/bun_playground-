import { Pool } from "pg";

const DATABASE_URL = "postgresql://user:pass@localhost:5433/db";

export default function getCon() {
  return new Pool({
    connectionString: DATABASE_URL,
  });
}