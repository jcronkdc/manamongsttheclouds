#!/usr/bin/env node
/**
 * PROOF VERIFICATION TOOL — Man Amongst the Clouds
 *
 * Verify that a file was included in a blockchain proof.
 * Based on WormHole verification system.
 */

import { createHash } from "crypto";
import { existsSync, readFileSync, readdirSync } from "fs";
import { basename, dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function sha256File(filePath) {
  const content = readFileSync(filePath);
  return createHash("sha256").update(content).digest("hex");
}

async function main() {
  const args = process.argv.slice(2);

  console.log("");
  console.log(
    "╔═══════════════════════════════════════════════════════════════╗",
  );
  console.log(
    "║       PROOF VERIFICATION — Man Amongst the Clouds             ║",
  );
  console.log(
    "╚═══════════════════════════════════════════════════════════════╝",
  );
  console.log("");

  if (args.length === 0) {
    console.log("Usage:");
    console.log(
      "  node verify-proof.js <file_path>              Verify a specific file",
    );
    console.log(
      "  node verify-proof.js --list                   List all proofs",
    );
    console.log(
      "  node verify-proof.js --show <proof_file>      Show proof details",
    );
    console.log(
      "  node verify-proof.js --blockchain <tx_hash>   Verify on blockchain",
    );
    console.log("");
    process.exit(0);
  }

  const proofsDir = join(__dirname, "..", "proofs");

  if (args[0] === "--list") {
    const files = readdirSync(proofsDir).filter((f) => f.endsWith(".json"));
    console.log("📋 Available proofs:\n");

    for (const file of files) {
      try {
        const proof = JSON.parse(readFileSync(join(proofsDir, file), "utf-8"));
        const status =
          proof.blockchain.transactionHash !== "pending"
            ? "✅ CONFIRMED"
            : "⏳ Pending";
        console.log(`   ${file}`);
        console.log(
          `      Files: ${proof.proof.fileCount}, Size: ${proof.proof.totalSizeMB} MB`,
        );
        console.log(`      Status: ${status}`);
        if (proof.blockchain.transactionHash !== "pending") {
          console.log(`      TX: ${proof.blockchain.transactionHash}`);
        }
        console.log("");
      } catch (e) {
        // Skip non-proof files
      }
    }
    return;
  }

  if (args[0] === "--show") {
    const proofFile = args[1];
    if (!proofFile) {
      console.log("❌ Please specify a proof file");
      process.exit(1);
    }

    const proofPath = join(proofsDir, proofFile);
    if (!existsSync(proofPath)) {
      console.log(`❌ Proof file not found: ${proofFile}`);
      process.exit(1);
    }

    const proof = JSON.parse(readFileSync(proofPath, "utf-8"));

    console.log("📜 PROOF DETAILS\n");
    console.log("   Author:       ", proof.creator.name);
    console.log(
      "   Work:         ",
      proof.work?.title || proof.creator.project,
    );
    console.log("   Files:        ", proof.proof.fileCount);
    console.log("   Size:         ", proof.proof.totalSizeMB, "MB");
    console.log("   Merkle Root:  ", proof.proof.merkleRoot);
    console.log("   Timestamp:    ", proof.proof.timestamp);
    console.log("");
    console.log("   Blockchain:   ", proof.blockchain.network);
    console.log("   TX Hash:      ", proof.blockchain.transactionHash);
    console.log("   Block:        ", proof.blockchain.blockNumber || "N/A");
    console.log("");

    if (proof.aiTransparency) {
      console.log(
        "   AI Statement: ",
        proof.aiTransparency.statement.substring(0, 80) + "...",
      );
      console.log("");
    }

    if (proof.blockchain.transactionHash !== "pending") {
      console.log(
        `   🔗 View on PolygonScan: https://polygonscan.com/tx/${proof.blockchain.transactionHash}`,
      );
    }
    return;
  }

  if (args[0] === "--blockchain") {
    const txHash = args[1];
    if (!txHash) {
      console.log("❌ Please specify a transaction hash");
      process.exit(1);
    }

    console.log("🔗 Verifying on Polygon blockchain...\n");

    const { ethers } = await import("ethers");
    const provider = new ethers.JsonRpcProvider(
      "https://polygon-bor-rpc.publicnode.com",
    );

    try {
      const tx = await provider.getTransaction(txHash);
      const receipt = await provider.getTransactionReceipt(txHash);

      if (!tx) {
        console.log("❌ Transaction not found");
        process.exit(1);
      }

      console.log("✅ TRANSACTION FOUND\n");
      console.log("   Hash:         ", tx.hash);
      console.log("   Block:        ", tx.blockNumber);
      console.log("   From:         ", tx.from);
      console.log(
        "   Status:       ",
        receipt.status === 1 ? "✅ Confirmed" : "❌ Failed",
      );
      console.log("");

      // Try to decode the data
      if (tx.data && tx.data !== "0x") {
        try {
          const decoded = ethers.toUtf8String(tx.data);
          const proofData = JSON.parse(decoded);
          console.log("   Proof Type:   ", proofData.type);
          console.log("   Merkle Root:  ", proofData.merkleRoot);
          console.log("   Creator:      ", proofData.creator);
          console.log("   Work:         ", proofData.work);
          console.log("   File Count:   ", proofData.fileCount);
          if (proofData.aiStatement) {
            console.log("   AI Statement: ", proofData.aiStatement);
          }
        } catch (e) {
          console.log("   Data:         ", tx.data.substring(0, 66) + "...");
        }
      }

      console.log("");
      console.log(`   🔗 https://polygonscan.com/tx/${txHash}`);
    } catch (e) {
      console.log("❌ Error:", e.message);
    }
    return;
  }

  // Verify a specific file
  const filePath = args[0];
  if (!existsSync(filePath)) {
    console.log(`❌ File not found: ${filePath}`);
    process.exit(1);
  }

  const fileHash = sha256File(filePath);
  console.log(`📄 File: ${basename(filePath)}`);
  console.log(`   SHA-256: ${fileHash}\n`);

  // Search all proofs for this hash
  const proofFiles = readdirSync(proofsDir).filter(
    (f) => f.startsWith("proof-of-authorship") && f.endsWith(".json"),
  );

  let found = false;
  for (const proofFile of proofFiles) {
    const proof = JSON.parse(readFileSync(join(proofsDir, proofFile), "utf-8"));
    const match = proof.manifest.find((f) => f.hash === fileHash);

    if (match) {
      found = true;
      console.log(`✅ FOUND in ${proofFile}\n`);
      console.log(`   Original path: ${match.path}`);
      console.log(`   Merkle Root:   ${proof.proof.merkleRoot}`);
      console.log(`   Timestamp:     ${proof.proof.timestamp}`);
      console.log(`   TX Hash:       ${proof.blockchain.transactionHash}`);

      if (proof.blockchain.transactionHash !== "pending") {
        console.log("");
        console.log(
          "   This file's existence was cryptographically proven on the",
        );
        console.log("   Polygon blockchain at the timestamp above.");
        console.log(
          `   🔗 https://polygonscan.com/tx/${proof.blockchain.transactionHash}`,
        );
      }
      break;
    }
  }

  if (!found) {
    console.log("❌ File NOT FOUND in any proof");
    console.log("   This file was either:");
    console.log("   - Not included in the original proof");
    console.log("   - Modified since the proof was created");
  }

  console.log("");
}

main().catch(console.error);
