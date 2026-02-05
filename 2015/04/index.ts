import { createHash } from "crypto";

// const path = new URL("./sample_input.txt", import.meta.url);
const path = new URL("./input.txt", import.meta.url);
const text = Bun.file(path);

const input = await text.text();

let currentIndex = 0;
let isFound = false;

while(!isFound) {
    const hash = createHash("md5")
    .update(`${input}${currentIndex}`, "utf8")
    .digest("hex");

    if (hash.startsWith('000000')) {
        console.log({ currentIndex });
        isFound = true;
    } else {
        currentIndex++;
    }
} 