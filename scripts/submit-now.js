#!/usr/bin/env node
/**
 * One-shot submission script — reads wallet from .wallet-backup.json
 * No environment variables needed.
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { ethers } from "ethers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const RPC_URL = "https://polygon-bor-rpc.publicnode.com";

async function main() {
  // Read wallet
  const walletData = JSON.parse(
    readFileSync(join(__dirname, ".wallet-backup.json"), "utf-8"),
  );

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(walletData.privateKey, provider);

  console.log("Wallet:", wallet.address);

  const balance = await provider.getBalance(wallet.address);
  console.log("Balance:", ethers.formatEther(balance), "MATIC");

  if (parseFloat(ethers.formatEther(balance)) < 0.001) {
    console.log("Insufficient balance. Need at least 0.001 MATIC.");
    process.exit(1);
  }

  // Find latest proof
  const proofsDir = join(__dirname, "..", "proofs");
  const proofFiles = readdirSync(proofsDir)
    .filter((f) => f.startsWith("proof-of-authorship") && f.endsWith(".json"))
    .sort();
  const latestFile = proofFiles[proofFiles.length - 1];
  const proofPath = join(proofsDir, latestFile);
  const proofDoc = JSON.parse(readFileSync(proofPath, "utf-8"));

  console.log("Proof:", latestFile);
  console.log("Merkle Root:", proofDoc.proof.merkleRoot);
  console.log("Files:", proofDoc.proof.fileCount);
  console.log("");

  // Build on-chain data — compact to minimize gas
  const proofData = {
    t: "authorship-v1",
    m: "0x" + proofDoc.proof.merkleRoot,
    a: "Justin Cronk",
    w: "Man Amongst the Clouds",
    n: proofDoc.proof.fileCount,
    ai: "human-written",
  };

  const data = ethers.hexlify(ethers.toUtf8Bytes(JSON.stringify(proofData)));

  const feeData = await provider.getFeeData();

  // Use lower gas price to fit within balance
  const maxFee = feeData.maxFeePerGas;
  const priorityFee = feeData.maxPriorityFeePerGas;

  console.log("Gas price:", ethers.formatUnits(maxFee, "gwei"), "gwei");
  console.log("Data size:", data.length / 2, "bytes");
  console.log("Submitting to Polygon...");

  const tx = await wallet.sendTransaction({
    to: wallet.address,
    value: 0,
    data: data,
    gasLimit: 50000,
    maxFeePerGas: maxFee,
    maxPriorityFeePerGas: priorityFee,
  });

  console.log("TX sent:", tx.hash);
  console.log("Waiting for confirmation...");

  const receipt = await tx.wait();

  console.log("");
  console.log("CONFIRMED ON POLYGON!");
  console.log("Block:", receipt.blockNumber);
  console.log("TX Hash:", receipt.hash);
  console.log("Gas Used:", receipt.gasUsed.toString());
  console.log("PolygonScan: https://polygonscan.com/tx/" + receipt.hash);

  // Update proof document
  proofDoc.blockchain.transactionHash = receipt.hash;
  proofDoc.blockchain.blockNumber = Number(receipt.blockNumber);
  proofDoc.blockchain.confirmedAt = new Date().toISOString();
  proofDoc.blockchain.gasUsed = receipt.gasUsed.toString();
  proofDoc.blockchain.walletAddress = wallet.address;
  proofDoc.verification.verifyUrl =
    "https://polygonscan.com/tx/" + receipt.hash;

  writeFileSync(proofPath, JSON.stringify(proofDoc, null, 2));
  console.log("Proof JSON updated with transaction details.");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
