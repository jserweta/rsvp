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

    return { name: "MenuKinds", data: data[0].enumRange };
  } catch (err) {
    console.error(err);
    throw new Error(`Failed to fetch menu kinds list.`);
  }
};

const fetchInvitationStatus = async () => {
  try {
    const data = await sql<{ enumRange: [] }[]>`
    SELECT 
    enum_range(null::invitation_status)
    `;

    return { name: "InvitationStatus", data: data[0].enumRange };
  } catch (err) {
    console.error(err);
    throw new Error(`Failed to fetch menu kinds list.`);
  }
};

const fetchAttendanceStatus = async () => {
  try {
    const data = await sql<{ enumRange: [] }[]>`
    SELECT 
    enum_range(null::attendance_status)
    `;

    return { name: "AttendanceStatus", data: data[0].enumRange };
  } catch (err) {
    console.error(err);
    throw new Error(`Failed to fetch menu kinds list.`);
  }
};

function removeDiacritics(str: string) {
  return str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

async function generateEnumTypes() {
  try {
    const fetchedEnums = await Promise.all([
      fetchMenuKinds(),
      fetchInvitationStatus(),
      fetchAttendanceStatus(),
    ]);

    const enumDefFileContent = [];
    enumDefFileContent.push("// AUTO-GENERATED FILE. DO NOT EDIT MANUALLY");

    fetchedEnums.forEach((enumItem) => {
      enumDefFileContent.push(
        `export enum ${enumItem.name} {\n\t${enumItem.data
          .map((e: string) => `${removeDiacritics(e.toUpperCase())} = "${e}"`)
          .join(",\n\t")}\n}`
      );
      enumDefFileContent.push(
        `export const ${
          enumItem.name.charAt(0).toLowerCase() + enumItem.name.slice(1)
        }List: ${enumItem.name}[] = Object.values(${enumItem.name});\n`
      );
    });

    const filePath = path.join(
      __dirname,
      "..",
      "src",
      "lib",
      "enum-definitions.ts"
    );

    mkdirSync(path.dirname(filePath), { recursive: true });
    writeFileSync(filePath, enumDefFileContent.join("\n"));

    console.log("✅ Generated enum-definition.ts");
  } catch (err) {
    console.error("Błąd generowania pliku:", err);
  } finally {
    process.exit(0);
  }
}

generateEnumTypes();
