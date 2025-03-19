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

const fetchInvitationStatus = async () => {
  try {
    const data = await sql<{ enumRange: [] }[]>`
    SELECT 
    enum_range(null::invitation_status)
    `;

    return data[0].enumRange;
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

    return data[0].enumRange;
  } catch (err) {
    console.error(err);
    throw new Error(`Failed to fetch menu kinds list.`);
  }
};

async function generateEnumTypes() {
  try {
    const [menuKinds, invitationStatus, attendanceStatus] = await Promise.all([
      fetchMenuKinds(),
      fetchInvitationStatus(),
      fetchAttendanceStatus(),
    ]);

    const typeDef = [];
    typeDef.push("// AUTO-GENERATED FILE. DO NOT EDIT MANUALLY");
    typeDef.push(
      `export enum MenuKinds {\n\t${menuKinds
        .map((e: string) => `${e.toUpperCase()} = "${e}"`)
        .join(",\n\t")}\n}`
    );
    typeDef.push(
      `export const menuKindsList: MenuKinds[] = Object.values(MenuKinds);\n`
    );

    typeDef.push(
      `export enum InvitationStatus {\n\t${invitationStatus
        .map((e: string) => `${e.toUpperCase()} = "${e}"`)
        .join(",\n\t")}\n}`
    );
    typeDef.push(
      `export const invitationStatusList: InvitationStatus[] = Object.values(InvitationStatus);\n`
    );

    typeDef.push(
      `export enum AttendanceStatus {\n\t${attendanceStatus
        .map((e: string) => `${e.toUpperCase()} = "${e}"`)
        .join(",\n\t")}\n}`
    );
    typeDef.push(
      `export const attendanceStatusList: AttendanceStatus[] = Object.values(AttendanceStatus);\n`
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
