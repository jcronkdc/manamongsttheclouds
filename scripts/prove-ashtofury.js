#!/usr/bin/env node
/**
 * PROOF OF AUTHORSHIP — Ash to Fury
 * By Carter Cronk / Stillfire Press
 *
 * Hashes the manuscript PDF and submits Merkle root to Polygon.
 * Uses same wallet as Man Amongst the Clouds proof.
 */

import { createHash } from "crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "fs";
import { dirname, extname, join, relative } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const RPC_URL = "https://polygon-bor-rpc.publicnode.com";

function sha256(data) {
  return createHash("sha256").update(data).digest("hex");
}

function hashPair(left, right) {
  const sorted = [left, right].sort();
  return sha256(sorted[0] + sorted[1]);
}

function buildMerkleTree(hashes) {
  if (hashes.length === 0) throw new Error("Empty hash list");
  const sorted = [...hashes].sort();
  if (sorted.length % 2 === 1) sorted.push(sorted[sorted.length - 1]);
  const tree = [sorted];
  let current = sorted;
  while (current.length > 1) {
    const next = [];
    for (let i = 0; i < current.length; i += 2) {
      next.push(hashPair(current[i], current[i + 1] || current[i]));
    }
    tree.push(next);
    current = next;
  }
  return tree;
}

function getMerkleRoot(tree) {
  return tree[tree.length - 1][0];
}

async function main() {
  const shouldSubmit = process.argv.includes("--submit");

  console.log("");
  console.log(
    "╔═══════════════════════════════════════════════════════════════╗",
  );
  console.log(
    "║   PROOF OF AUTHORSHIP — Ash to Fury                          ║",
  );
  console.log(
    "║   Polygon Blockchain Timestamping                             ║",
  );
  console.log(
    "╚═══════════════════════════════════════════════════════════════╝",
  );
  console.log("");

  // Files to prove
  const manuscriptPdf = "/Users/justincronk/Desktop/Ash to Fury RD.pdf";
  const websiteDir = join(__dirname, "..", "ash-to-fury-website");

  const filesToHash = [];

  // 1. The manuscript PDF
  if (existsSync(manuscriptPdf)) {
    const stat = statSync(manuscriptPdf);
    filesToHash.push({
      path: "Ash to Fury RD.pdf",
      fullPath: manuscriptPdf,
      size: stat.size,
    });
    console.log(
      "📄 Manuscript PDF found:",
      (stat.size / 1024 / 1024).toFixed(2),
      "MB",
    );
  } else {
    console.log("❌ Manuscript PDF not found at:", manuscriptPdf);
    process.exit(1);
  }

  // 2. Website source files
  if (existsSync(websiteDir)) {
    const websiteFiles = [];
    const exts = [".tsx", ".ts", ".css", ".json", ".mjs"];
    const skip = ["node_modules", ".next", ".git", ".vercel"];

    function scan(dir) {
      for (const item of readdirSync(dir)) {
        if (item.startsWith(".") || skip.includes(item)) continue;
        const full = join(dir, item);
        const stat = statSync(full);
        if (stat.isDirectory()) {
          scan(full);
        } else if (
          exts.includes(extname(item).toLowerCase()) &&
          stat.size > 0
        ) {
          websiteFiles.push({
            path: "website/" + relative(websiteDir, full),
            fullPath: full,
            size: stat.size,
          });
        }
      }
    }
    scan(websiteDir);
    filesToHash.push(...websiteFiles);
    console.log(`🌐 Website files found: ${websiteFiles.length}`);
  }

  console.log(`\n📁 Total files to prove: ${filesToHash.length}\n`);

  // Hash everything
  console.log("🔐 Computing SHA-256 hashes...");
  const fileHashes = [];
  const manifest = [];

  for (const file of filesToHash) {
    const content = readFileSync(file.fullPath);
    const hash = sha256(content);
    fileHashes.push(hash);
    manifest.push({ path: file.path, size: file.size, hash });
  }

  const tree = buildMerkleTree(fileHashes);
  const merkleRoot = getMerkleRoot(tree);

  console.log(`✅ Merkle Root: ${merkleRoot}`);

  const totalSize = manifest.reduce((s, f) => s + f.size, 0);
  const totalSizeMB = (totalSize / 1024 / 1024).toFixed(2);

  // Create proof document
  const proofDocument = {
    version: "1.0",
    type: "proof-of-authorship",
    creator: {
      name: "Carter Cronk",
      project: "Ash to Fury",
      claim:
        "I am the original author of this novel. This story was written by me. No artificial intelligence was used to write any prose, dialogue, or narrative content in this work.",
      publisher: "Stillfire Press",
    },
    work: {
      title: "Ash to Fury",
      author: "Carter Cronk",
      type: "Novel — Dark Fantasy",
      publisher: "Stillfire Press",
      website: "https://ashtofury.com",
      description:
        "A dark fantasy novel about a disciplined man, a devastating betrayal, and a transformation forged in grief and fire.",
    },
    aiTransparency: {
      statement:
        "This novel was written entirely by Carter Cronk. AI was never used to generate prose, dialogue, characters, plot, or any narrative content. AI tools were used solely as editorial aids to identify plot holes, flag inconsistencies, and assist with copyediting. The story, the voice, and every word on the page are the author's own.",
      aiNeverUsedFor: [
        "Writing prose, dialogue, or narrative content",
        "Generating characters, plot points, or world-building",
        "Rewriting or paraphrasing the author's original text",
      ],
      verificationLinks: ["https://gptzero.me/", "https://originality.ai/"],
    },
    proof: {
      merkleRoot,
      merkleRootBytes32: "0x" + merkleRoot,
      fileCount: manifest.length,
      totalSize,
      totalSizeMB,
      timestamp: new Date().toISOString(),
      unixTimestamp: Math.floor(Date.now() / 1000),
    },
    blockchain: {
      network: "polygon",
      chainId: 137,
      transactionHash: "pending",
      blockNumber: null,
      confirmedAt: null,
      walletAddress: null,
    },
    verification: {
      verifyUrl: "https://polygonscan.com/tx/",
      aiDetection: ["https://gptzero.me/", "https://originality.ai/"],
    },
    legal: {
      copyright: `© ${new Date().getFullYear()} Carter Cronk / Stillfire Press. All rights reserved.`,
    },
    manifest,
  };

  // Save proof
  const proofsDir = join(__dirname, "..", "proofs");
  if (!existsSync(proofsDir)) mkdirSync(proofsDir, { recursive: true });

  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const proofPath = join(proofsDir, `proof-ash-to-fury-${ts}.json`);
  writeFileSync(proofPath, JSON.stringify(proofDocument, null, 2));
  console.log(`\n💾 Proof saved: ${proofPath}`);

  // Summary
  console.log(
    `\n╔═══════════════════════════════════════════════════════════════╗`,
  );
  console.log(`║  Author:       ${"Carter Cronk".padEnd(47)}║`);
  console.log(`║  Work:         ${"Ash to Fury".padEnd(47)}║`);
  console.log(`║  Files:        ${manifest.length.toString().padEnd(47)}║`);
  console.log(`║  Size:         ${(totalSizeMB + " MB").padEnd(47)}║`);
  console.log(`║  Merkle Root:  ${merkleRoot.substring(0, 45)}... ║`);
  console.log(
    `╚═══════════════════════════════════════════════════════════════╝\n`,
  );

  // Submit
  if (shouldSubmit) {
    const walletPath = join(__dirname, ".wallet-backup.json");
    if (!existsSync(walletPath)) {
      console.log("❌ No wallet found. Run: node setup-wallet.js create");
      return;
    }

    const { ethers } = await import("ethers");
    const walletData = JSON.parse(readFileSync(walletPath, "utf-8"));
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(walletData.privateKey, provider);

    const balance = await provider.getBalance(wallet.address);
    console.log("Wallet:", wallet.address);
    console.log("Balance:", ethers.formatEther(balance), "MATIC");

    if (parseFloat(ethers.formatEther(balance)) < 0.001) {
      console.log("❌ Insufficient balance.");
      return;
    }

    const proofData = {
      t: "authorship-v1",
      m: "0x" + merkleRoot,
      a: "Carter Cronk",
      w: "Ash to Fury",
      n: manifest.length,
      ai: "human-written",
    };

    const data = ethers.hexlify(ethers.toUtf8Bytes(JSON.stringify(proofData)));

    // Calculate max affordable gas price given balance
    const balanceWei = await provider.getBalance(wallet.address);
    const gasLimit = 50000n;
    const maxAffordableGasPrice = balanceWei / gasLimit;
    console.log(
      "\nMax affordable gas price:",
      ethers.formatUnits(maxAffordableGasPrice, "gwei"),
      "gwei",
    );
    console.log("Submitting to Polygon...");

    const tx = await wallet.sendTransaction({
      to: wallet.address,
      value: 0,
      data,
      gasLimit: Number(gasLimit),
      gasPrice: (maxAffordableGasPrice * 90n) / 100n, // 90% of max to leave margin
    });

    console.log("TX sent:", tx.hash);
    console.log("Waiting for confirmation...");
    const receipt = await tx.wait();

    console.log("\n✅ CONFIRMED ON POLYGON!");
    console.log("Block:", receipt.blockNumber);
    console.log("TX Hash:", receipt.hash);
    console.log("Gas Used:", receipt.gasUsed.toString());
    console.log("PolygonScan: https://polygonscan.com/tx/" + receipt.hash);

    // Update proof
    proofDocument.blockchain.transactionHash = receipt.hash;
    proofDocument.blockchain.blockNumber = Number(receipt.blockNumber);
    proofDocument.blockchain.confirmedAt = new Date().toISOString();
    proofDocument.blockchain.gasUsed = receipt.gasUsed.toString();
    proofDocument.blockchain.walletAddress = wallet.address;
    proofDocument.verification.verifyUrl =
      "https://polygonscan.com/tx/" + receipt.hash;
    writeFileSync(proofPath, JSON.stringify(proofDocument, null, 2));
    console.log("Proof JSON updated.");
  } else {
    console.log("To submit to blockchain: node prove-ashtofury.js --submit");
  }
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
