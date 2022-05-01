import * as crypto from "crypto";
import readlineSync from "readline-sync";

const algorithm = "sha256";
const str = readlineSync.question("Enter the string that will be hashed: ");
const hash = crypto.createHash(algorithm).update(str).digest("hex");

console.log(`Result: ${hash} (${algorithm})`);
