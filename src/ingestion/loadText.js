import fs from "fs";
import path from "path";

export function loadText(fileName) {
  const filePath = path.join("data", "texts", fileName);
  return fs.readFileSync(filePath, "utf-8");
}
