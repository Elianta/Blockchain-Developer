import * as crypto from "crypto";
import readlineSync from "readline-sync";
import secp256k1 from "secp256k1";

function digest(str: string, algorithm = "sha256") {
  return crypto.createHash(algorithm).update(str).digest();
}

function generatePrivateKey() {
  let privateKey;
  do {
    privateKey = crypto.randomBytes(32);
  } while (!secp256k1.privateKeyVerify(privateKey));
  return privateKey;
}

function generatePublicKey(privateKey: Buffer) {
  return secp256k1.publicKeyCreate(privateKey);
}

const message = readlineSync.question("Enter your message: ");
const digested = digest(message);

console.log(`0) You write:
    message: ${message}
    digested: ${digested.toString("hex")}`);

const privateKey = generatePrivateKey();
const publicKey = generatePublicKey(privateKey);

console.log(`1) Your keypair:
    publicKey: ${publicKey}
    privateKey: ${privateKey.toString("hex")}`);

const sigObg = secp256k1.ecdsaSign(digested, privateKey);
const signature = sigObg.signature;

console.log(`2) Your signature: ${signature}`);

const verified = secp256k1.ecdsaVerify(signature, digested, publicKey);

console.log(`3) Someone else can verify your signature using message digest, signature and public key:
verified: ${verified}`);
