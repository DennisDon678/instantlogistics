
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Use direct connection for migrations (port 5432)
    // Use pooled connection for queries (port 6543)
    url: env("DIRECT_URL") || env("DATABASE_URL"),
  },
});
