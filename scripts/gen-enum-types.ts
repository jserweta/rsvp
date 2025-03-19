import { writeFileSync, mkdirSync } from "fs";
import * as path from "path";
import postgres from "postgres";
import { config } from "dotenv";
config();

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
  transform: postgres.toCamel,
});

const fetchMenuKinds = async () => {
  try {
    const data = await sql<{ enumRange: [] }[]>`
    SELECT 
    enum_range(null::menu_kind)
    `;

    return data[0].enumRange;
  } catch (err) {
    console.error(err);
    throw new Error(`Failed to fetch menu kinds list.`);
  }
};

async function generateEnumTypes() {
  try {
    const enums = await fetchMenuKinds();
    const typeDef = [];
    typeDef.push("// AUTO-GENERATED FILE. DO NOT EDIT MANUALLY");
    typeDef.push(
      `export enum MenuKinds {\n\t${enums
        .map((e: string) => `${e.toUpperCase()} = "${e}"`)
        .join(",\n\t")}\n}`
    );
    typeDef.push(
      `export const menuKindsList: MenuKinds[] = Object.values(MenuKinds);`
    );

    const filePath = path.join(
      __dirname,
      "..",
      "src",
      "lib",
      "enum-definitions.ts"
    );

    mkdirSync(path.dirname(filePath), { recursive: true });
    writeFileSync(filePath, typeDef.join("\n"));

    console.log("✅ Generated enum-definition.ts");
  } catch (err) {
    console.error("Błąd generowania pliku:", err);
  } finally {
    process.exit(0);
  }
}

generateEnumTypes();
