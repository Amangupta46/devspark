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

  // 1. Fix types/index.ts empty interfaces
  if (filePath.includes("types") && filePath.endsWith("index.ts")) {
    content = content.replace(
      /export interface ([A-Za-z0-9_]+) \{\}/g,
      "export type $1 = Record<string, unknown>;",
    );
  }

  // 2. Fix services/index.ts parsing errors (broken commas or missing brackets)
  // The error is "9:2 Parsing error: ',' expected". This usually happens when an object literal or array is malformed.
  // Wait, I will just rewrite the file safely if I know the content, or I will use a regex if I can see it.
  // Let me view a services/index.ts file first to be safe, I won't run this script blindly yet.
});
