import "dotenv/config";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { getDb } from "./connection";

function splitStatements(sql: string): string[] {
  return sql
    .split("\n")
    .filter((line) => {
      const trimmed = line.trim();
      return !trimmed.startsWith("--") && trimmed !== "";
    })
    .join("\n")
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map((s) => s + ";");
}

function isIgnorableError(err: Error): boolean {
  const msg = err.message ?? "";
  return (
    msg.includes("Duplicate column") ||
    msg.includes("already exists") ||
    msg.includes("Duplicate entry") ||
    (msg.includes("ER_DUP_ENTRY"))
  );
}

async function runMigrations(): Promise<void> {
  const db = getDb();
  const migrationsDir = join(__dirname, "migrations");
  const files = readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  if (files.length === 0) {
    console.log("No hay migraciones para ejecutar.");
    process.exit(0);
  }

  console.log(`▶ Ejecutando ${files.length} migraciones...\n`);

  for (const file of files) {
    const filePath = join(migrationsDir, file);
    const sql = readFileSync(filePath, "utf-8");

    if (!sql.trim()) {
      console.log(`  ⏭ ${file} — vacío`);
      continue;
    }

    const statements = splitStatements(sql);

    if (statements.length === 0) {
      console.log(`  ⏭ ${file} — sin statements`);
      continue;
    }

    console.log(`  ▶ ${file} (${statements.length} statements)...`);
    let ok = 0;
    let skipped = 0;

    for (const stmt of statements) {
      try {
        await db.query(stmt);
        ok++;
      } catch (error) {
        const err = error as Error;
        if (isIgnorableError(err)) {
          skipped++;
          continue;
        }
        throw error;
      }
    }

    const parts: string[] = [];
    if (ok > 0) parts.push(`${ok} ejecutados`);
    if (skipped > 0) parts.push(`${skipped} ignorados`);
    console.log(`  ✓ ${file} completado (${parts.join(", ")})\n`);
  }

  console.log("✅ Migraciones ejecutadas correctamente");
  process.exit(0);
}

runMigrations().catch((error) => {
  console.error("❌ Error en migraciones:", error);
  process.exit(1);
});
