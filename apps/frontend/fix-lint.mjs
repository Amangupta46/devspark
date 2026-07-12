import fs from "fs";
import path from "path";

function walkDir(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(filePath));
    } else {
      results.push(filePath);
    }
  });
  return results;
}

const rootDir = path.join(process.cwd(), "apps", "frontend", "src");
const allFiles = walkDir(rootDir);

allFiles.forEach((filePath) => {
  if (!filePath.endsWith(".ts") && !filePath.endsWith(".tsx")) return;

  let content = fs.readFileSync(filePath, "utf8");
  let originalContent = content;

  // 1. Fix empty interfaces in types/index.ts
  if (filePath.includes("types") && filePath.endsWith("index.ts")) {
    content = content.replace(
      /export interface ([A-Za-z0-9_]+) \{\}/g,
      "export type $1 = Record<string, unknown>;",
    );
  }

  // 2. Fix empty interfaces without export
  if (filePath.includes("types") && filePath.endsWith("index.ts")) {
    content = content.replace(
      /interface ([A-Za-z0-9_]+) \{\}/g,
      "type $1 = Record<string, unknown>;",
    );
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
  }
});
