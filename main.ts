import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "My plants died from neglect, so I bought plastic ones. Now I feel guilty for not watering those either.";

function validateLine(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\r") || line.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  if (line !== line.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

validateLine(LINE);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");
const readBack = readFileSync("/output/entry.txt", "utf8");
if (readBack !== LINE + "\n") {
  throw new Error("read-back verification failed: /output/entry.txt does not match the entry line");
}
console.log(LINE);
