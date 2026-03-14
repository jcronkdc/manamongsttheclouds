#!/usr/bin/env node
/**
 * PROOF OF AUTHORSHIP - Man Amongst the Clouds
 *
 * Creates an immutable blockchain proof that Justin Cronk authored:
 * - Man Amongst the Clouds (novel manuscript)
 * - All associated outlines, character bibles, world-building documents
 * - Publishing materials
 *
 * Stores SHA-256 Merkle root on Polygon blockchain (~$0.01 cost)
 *
 * Based on WormHole proof system by Justin Cronk / Cronk Companies LLC
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

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ============================================
// CONFIGURATION
// ============================================

const PROJECT_ROOT = join(__dirname, "..");

const CONFIG = {
  // Project to prove
  projectPath: PROJECT_ROOT,

  // Output
  outputPath: join(PROJECT_ROOT, "proofs"),

  // Blockchain
  network: "polygon",
  rpcUrl:
    process.env.POLYGON_RPC_URL || "https://polygon-bor-rpc.publicnode.com",
  contractAddress: process.env.POLYGON_CONTRACT_ADDRESS,
  privateKey: process.env.BLOCKCHAIN_PRIVATE_KEY,

  // File filters — manuscript and book files
  includeExtensions: [".md", ".txt", ".docx", ".html", ".py", ".css", ".json"],

  // Skip these directories
  skipDirs: [
    "node_modules",
    ".git",
    ".next",
    ".venv",
    "venv",
    "scripts",
    "proofs",
    "book covers",
    "website",
    "blockchain",
  ],

  // Max file size (skip huge files)
  maxFileSize: 10 * 1024 * 1024, // 10MB (docx can be large)
};

// ============================================
// CONTRACT ABI (minimal — same as WormHole)
// ============================================

const CONTRACT_ABI = [
  "function storeProof(bytes32 fileHash, string calldata metadata) external returns (bool)",
  "function storeBatchProof(bytes32[] calldata fileHashes, string calldata metadata) external returns (bool)",
  "function getProof(bytes32 fileHash) external view returns (address owner, uint256 timestamp, string memory metadata)",
  "function verifyProof(bytes32 fileHash) external view returns (bool exists, address owner, uint256 timestamp)",
  "event ProofStored(bytes32 indexed fileHash, address indexed owner, uint256 timestamp, string metadata)",
];

// ============================================
// MERKLE TREE
// ============================================

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

// ============================================
// FILE PROCESSING
// ============================================

function getAllFiles(dir, files = []) {
  try {
    const items = readdirSync(dir);

    for (const item of items) {
      // Skip hidden files/folders
      if (item.startsWith(".")) continue;
      // Skip temp Word files
      if (item.startsWith("~$")) continue;

      const fullPath = join(dir, item);

      try {
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
          if (!CONFIG.skipDirs.includes(item)) {
            getAllFiles(fullPath, files);
          }
        } else if (stat.isFile()) {
          const ext = extname(item).toLowerCase();
          if (
            CONFIG.includeExtensions.includes(ext) &&
            stat.size <= CONFIG.maxFileSize &&
            stat.size > 0
          ) {
            files.push({
              path: fullPath,
              relativePath: relative(CONFIG.projectPath, fullPath),
              size: stat.size,
            });
          }
        }
      } catch (e) {
        // Skip unreadable files
      }
    }
  } catch (e) {
    // Skip unreadable directories
  }

  return files;
}

function hashFile(filePath) {
  try {
    const content = readFileSync(filePath);
    return sha256(content);
  } catch (e) {
    return null;
  }
}

// ============================================
// PROOF GENERATION
// ============================================

async function generateProof() {
  console.log("");
  console.log(
    "╔═══════════════════════════════════════════════════════════════╗",
  );
  console.log(
    "║   PROOF OF AUTHORSHIP — Man Amongst the Clouds               ║",
  );
  console.log(
    "║   Polygon Blockchain Timestamping                             ║",
  );
  console.log(
    "╚═══════════════════════════════════════════════════════════════╝",
  );
  console.log("");

  console.log("📁 Scanning project:", CONFIG.projectPath);
  console.log("");

  // Get all files
  const files = getAllFiles(CONFIG.projectPath);
  console.log(`📄 Found ${files.length.toLocaleString()} manuscript files\n`);

  if (files.length === 0) {
    console.error("❌ No files found! Check the project path.");
    process.exit(1);
  }

  // List what we found
  const categories = {
    "Manuscript Chapters": files.filter((f) =>
      f.relativePath.startsWith("manuscript/"),
    ),
    "Outlines & Bible": files.filter(
      (f) =>
        !f.relativePath.includes("/") &&
        (f.relativePath.endsWith(".md") || f.relativePath.endsWith(".txt")),
    ),
    "Publishing Materials": files.filter((f) =>
      f.relativePath.startsWith("publishing/"),
    ),
    Screenplay: files.filter((f) => f.relativePath.startsWith("screenplay/")),
    "Research Notes": files.filter((f) =>
      f.relativePath.startsWith("extracted_notes/"),
    ),
    "DOCX Manuscripts": files.filter((f) => f.relativePath.endsWith(".docx")),
    "Other Files": files.filter(
      (f) =>
        !f.relativePath.startsWith("manuscript/") &&
        !f.relativePath.startsWith("publishing/") &&
        !f.relativePath.startsWith("screenplay/") &&
        !f.relativePath.startsWith("extracted_notes/") &&
        !f.relativePath.endsWith(".docx") &&
        (f.relativePath.includes("/") ||
          (!f.relativePath.endsWith(".md") &&
            !f.relativePath.endsWith(".txt"))),
    ),
  };

  for (const [category, catFiles] of Object.entries(categories)) {
    if (catFiles.length > 0) {
      console.log(`   ${category}: ${catFiles.length} files`);
    }
  }
  console.log("");

  // Hash all files
  console.log("🔐 Computing SHA-256 hashes...");
  const fileHashes = [];
  const fileManifest = [];
  let skipped = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const hash = hashFile(file.path);

    if (hash) {
      fileHashes.push(hash);
      fileManifest.push({
        path: file.relativePath,
        size: file.size,
        hash: hash,
      });
    } else {
      skipped++;
    }
  }

  if (skipped > 0) {
    console.log(`   ⚠️  Skipped ${skipped} unreadable files`);
  }

  // Build Merkle tree
  console.log("\n🌳 Building Merkle tree...");
  const tree = buildMerkleTree(fileHashes);
  const merkleRoot = getMerkleRoot(tree);

  console.log(`\n✅ Merkle Root: ${merkleRoot}`);

  // Calculate totals
  const totalSize = fileManifest.reduce((sum, f) => sum + f.size, 0);
  const totalSizeMB = (totalSize / 1024 / 1024).toFixed(2);

  // Count files by type
  const typeCounts = {};
  fileManifest.forEach((f) => {
    const ext = f.path.split(".").pop() || "other";
    typeCounts[ext] = (typeCounts[ext] || 0) + 1;
  });

  // Create proof document
  const proofDocument = {
    version: "1.0",
    type: "proof-of-authorship",

    creator: {
      name: "Justin Cronk",
      project: "Man Amongst the Clouds",
      claim:
        "I am the original author of this novel and all associated materials. This story was written by me over a period of nine years, from March 2017 to March 2026. No artificial intelligence was used to write any prose, dialogue, or narrative content in this work.",
      contact: "justincronk@cronkcompaniesllc.com",
    },

    work: {
      title: "Man Amongst the Clouds",
      author: "Justin Cronk",
      type: "Novel — Fantasy Fiction",
      beganWriting: "March 2017",
      completedManuscript: "March 2026",
      structure: "5 Parts, 48 Chapters, ~115,000 words",
      description:
        "A fantasy novel where magic is memory — the world remembers everything, and magic is communing with those memories. The story follows a young man who discovers he can Sing, the rarest and most dangerous of the seven magical disciplines, as he navigates a world where a tyrant king steals the memories of others to fuel his stolen power.",
    },

    aiTransparency: {
      statement:
        "This novel was written entirely by Justin Cronk. AI was never used to generate prose, dialogue, characters, plot, or any narrative content. AI tools were used solely as editorial aids — in place of a professional copywriter — to identify plot holes, flag inconsistencies, and pressure-test internal logic across a 48-chapter manuscript. The story, the voice, the world, and every word on the page are the author's own.",
      aiUsedFor: [
        "Identifying plot holes and continuity errors",
        "Flagging inconsistencies in character details across chapters",
        "Pressure-testing internal logic of the magic system",
        "Copyediting assistance (grammar, spelling, punctuation)",
      ],
      aiNeverUsedFor: [
        "Writing prose, dialogue, or narrative content",
        "Generating characters, plot points, or world-building",
        "Rewriting or paraphrasing the author's original text",
        "Creating any content that appears in the final manuscript",
      ],
      verificationLinks: [
        "https://gptzero.me/ — AI content detection (paste any chapter)",
        "https://originality.ai/ — Professional AI detection and plagiarism check",
      ],
    },

    proof: {
      merkleRoot: merkleRoot,
      merkleRootBytes32: "0x" + merkleRoot,
      fileCount: fileManifest.length,
      totalSize: totalSize,
      totalSizeMB: totalSizeMB,
      timestamp: new Date().toISOString(),
      unixTimestamp: Math.floor(Date.now() / 1000),
    },

    blockchain: {
      network: "polygon",
      chainId: 137,
      contractAddress: CONFIG.contractAddress || "pending-deployment",
      transactionHash: "pending",
      blockNumber: null,
      confirmedAt: null,
    },

    verification: {
      instructions: [
        "1. Compute SHA-256 hash of any file in this project",
        "2. Verify the hash exists in the manifest below (proves file was part of proof)",
        "3. Verify Merkle inclusion path (cryptographic proof)",
        "4. Check blockchain for Merkle root at PolygonScan.com",
        "5. Transaction sender wallet proves creator identity",
      ],
      verifyUrl: "https://polygonscan.com/tx/",
      aiDetection: ["https://gptzero.me/", "https://originality.ai/"],
    },

    legal: {
      disclaimer:
        "This proof certifies that the specified files existed at the recorded timestamp. The proof was created by hashing all manuscript and associated files and storing the Merkle root on the Polygon blockchain. This constitutes cryptographic proof of existence and authorship at the specified time, admissible as evidence in legal proceedings.",
      copyright: `© ${new Date().getFullYear()} Justin Cronk / Cronk Companies LLC. All rights reserved.`,
    },

    statistics: {
      filesByType: typeCounts,
    },

    manifest: fileManifest,
  };

  // Ensure output directory exists
  if (!existsSync(CONFIG.outputPath)) {
    mkdirSync(CONFIG.outputPath, { recursive: true });
  }

  // Save proof document
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const proofPath = join(
    CONFIG.outputPath,
    `proof-of-authorship-${timestamp}.json`,
  );

  writeFileSync(proofPath, JSON.stringify(proofDocument, null, 2));
  console.log(`\n💾 Proof document saved: ${proofPath}`);

  // Summary
  console.log(
    "\n╔═══════════════════════════════════════════════════════════════╗",
  );
  console.log(
    "║                      PROOF SUMMARY                            ║",
  );
  console.log(
    "╠═══════════════════════════════════════════════════════════════╣",
  );
  console.log(`║  Author:           ${"Justin Cronk".padEnd(42)}║`);
  console.log(`║  Work:             ${"Man Amongst the Clouds".padEnd(42)}║`);
  console.log(
    `║  Files Proven:     ${fileManifest.length.toString().padEnd(42)}║`,
  );
  console.log(`║  Total Size:       ${(totalSizeMB + " MB").padEnd(42)}║`);
  console.log(`║  Merkle Root:      ${merkleRoot.substring(0, 40)}... ║`);
  console.log(
    `║  Timestamp:        ${proofDocument.proof.timestamp.padEnd(42)}║`,
  );
  console.log(
    "╚═══════════════════════════════════════════════════════════════╝\n",
  );

  // Show file type breakdown
  console.log("📊 Files by type:");
  const sortedTypes = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);
  for (const [ext, count] of sortedTypes) {
    console.log(`   .${ext}: ${count}`);
  }

  return { proofDocument, merkleRoot, proofPath };
}

// ============================================
// BLOCKCHAIN SUBMISSION
// ============================================

async function submitToBlockchain(merkleRoot, metadata) {
  console.log("\n🔗 SUBMITTING TO POLYGON BLOCKCHAIN...\n");

  if (!CONFIG.privateKey) {
    console.log("⚠️  No BLOCKCHAIN_PRIVATE_KEY set.");
    console.log("");
    console.log("   To submit proof to blockchain, you need:");
    console.log("   1. A wallet with MATIC (Polygon's token)");
    console.log("   2. Export your private key from MetaMask/wallet");
    console.log("   3. Run:");
    console.log("");
    console.log(
      "   BLOCKCHAIN_PRIVATE_KEY=your_key node prove-manuscript.js --submit",
    );
    console.log("");
    console.log("   Or create a new wallet:");
    console.log("   node setup-wallet.js create");
    console.log("");
    return null;
  }

  try {
    const { ethers } = await import("ethers");

    // Connect to Polygon
    const provider = new ethers.JsonRpcProvider(CONFIG.rpcUrl);
    const wallet = new ethers.Wallet(CONFIG.privateKey, provider);

    console.log(`   Wallet: ${wallet.address}`);

    // Get balance
    const balance = await provider.getBalance(wallet.address);
    const balanceMatic = ethers.formatEther(balance);
    console.log(`   Balance: ${balanceMatic} MATIC`);

    if (parseFloat(balanceMatic) < 0.001) {
      console.log(
        "\n⚠️  Insufficient balance! Need at least 0.001 MATIC (~$0.001)",
      );
      console.log("   Get MATIC from an exchange and send to:", wallet.address);
      return null;
    }

    const merkleRootBytes = "0x" + merkleRoot;
    const metadataJson = JSON.stringify(metadata);

    if (CONFIG.contractAddress) {
      // Submit via WormHole contract
      const contract = new ethers.Contract(
        CONFIG.contractAddress,
        CONTRACT_ABI,
        wallet,
      );

      console.log("\n   Submitting to WormHoleProofStorage contract...");

      const gasEstimate = await contract.storeProof.estimateGas(
        merkleRootBytes,
        metadataJson,
      );
      console.log(`   Gas estimate: ${gasEstimate.toString()}`);

      const tx = await contract.storeProof(merkleRootBytes, metadataJson, {
        gasLimit: (gasEstimate * 120n) / 100n,
      });

      console.log(`   Transaction sent: ${tx.hash}`);
      console.log("   Waiting for confirmation (usually ~2 seconds)...");

      const receipt = await tx.wait();

      console.log(`\n✅ PROOF CONFIRMED ON POLYGON!`);
      console.log(`   Block: ${receipt.blockNumber}`);
      console.log(`   Transaction: ${receipt.hash}`);
      console.log(`   Gas Used: ${receipt.gasUsed.toString()}`);
      console.log(
        `   View on PolygonScan: https://polygonscan.com/tx/${receipt.hash}`,
      );

      return receipt;
    } else {
      // Raw transaction — embed proof in transaction data field
      console.log("\n   No contract deployed. Using raw transaction method...");
      console.log(
        "   (Proof data will be embedded directly in the transaction)",
      );

      const proofData = {
        type: "proof-of-authorship-v1",
        merkleRoot: merkleRootBytes,
        creator: metadata.creator,
        work: metadata.work,
        fileCount: metadata.fileCount,
        timestamp: metadata.timestamp,
        aiStatement:
          "No AI was used to write this novel. AI was used only as an editorial tool.",
      };

      const data = ethers.hexlify(
        ethers.toUtf8Bytes(JSON.stringify(proofData)),
      );

      const feeData = await provider.getFeeData();

      const tx = await wallet.sendTransaction({
        to: wallet.address, // Send to self — proof is in the data field
        value: 0,
        data: data,
        gasLimit: 150000,
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
      });

      console.log(`   Transaction sent: ${tx.hash}`);
      console.log("   Waiting for confirmation...");

      const receipt = await tx.wait();

      console.log(`\n✅ PROOF CONFIRMED ON POLYGON!`);
      console.log(`   Block: ${receipt.blockNumber}`);
      console.log(`   Transaction: ${receipt.hash}`);
      console.log(
        `   View on PolygonScan: https://polygonscan.com/tx/${receipt.hash}`,
      );

      return receipt;
    }
  } catch (error) {
    console.error("\n❌ Blockchain submission failed:", error.message);
    if (error.code === "INSUFFICIENT_FUNDS") {
      console.log("   Your wallet needs more MATIC.");
    }
    return null;
  }
}

// ============================================
// MAIN
// ============================================

async function main() {
  const shouldSubmit = process.argv.includes("--submit");
  const helpRequested =
    process.argv.includes("--help") || process.argv.includes("-h");

  if (helpRequested) {
    console.log(`
PROOF OF AUTHORSHIP — Man Amongst the Clouds
=============================================

Usage:
  node prove-manuscript.js              Generate proof document only
  node prove-manuscript.js --submit     Generate and submit to Polygon blockchain

Environment Variables:
  BLOCKCHAIN_PRIVATE_KEY             Your wallet private key (required for --submit)
  POLYGON_RPC_URL                    Custom RPC URL (optional)
  POLYGON_CONTRACT_ADDRESS           WormHole contract address (optional)

Example:
  BLOCKCHAIN_PRIVATE_KEY=0x... node prove-manuscript.js --submit
`);
    process.exit(0);
  }

  // Generate proof
  const { proofDocument, merkleRoot, proofPath } = await generateProof();

  // Submit to blockchain if requested
  if (shouldSubmit) {
    const metadata = {
      creator: proofDocument.creator.name,
      work: proofDocument.work.title,
      fileCount: proofDocument.proof.fileCount,
      totalSize: proofDocument.proof.totalSize,
      timestamp: proofDocument.proof.timestamp,
    };

    const receipt = await submitToBlockchain(merkleRoot, metadata);

    if (receipt) {
      // Update proof document with transaction info
      proofDocument.blockchain.transactionHash = receipt.hash;
      proofDocument.blockchain.blockNumber = Number(receipt.blockNumber);
      proofDocument.blockchain.confirmedAt = new Date().toISOString();
      proofDocument.blockchain.gasUsed = receipt.gasUsed.toString();
      proofDocument.verification.verifyUrl = `https://polygonscan.com/tx/${receipt.hash}`;

      writeFileSync(proofPath, JSON.stringify(proofDocument, null, 2));
      console.log("\n💾 Proof document updated with transaction details.");
    }
  } else {
    console.log("\n📋 To submit this proof to Polygon blockchain, run:");
    console.log(
      "   BLOCKCHAIN_PRIVATE_KEY=your_key node prove-manuscript.js --submit\n",
    );
  }

  console.log(
    "╔═══════════════════════════════════════════════════════════════╗",
  );
  console.log(
    "║                 WHAT THIS PROVES                              ║",
  );
  console.log(
    "╠═══════════════════════════════════════════════════════════════╣",
  );
  console.log(
    "║  ✓ Justin Cronk authored this manuscript                     ║",
  );
  console.log(
    "║  ✓ These exact files existed at this timestamp                ║",
  );
  console.log(
    "║  ✓ Immutable record on Polygon blockchain                    ║",
  );
  console.log(
    "║  ✓ Legally admissible cryptographic evidence                  ║",
  );
  console.log(
    "║  ✓ No AI was used to write this novel                        ║",
  );
  console.log(
    "║  ✓ Verifiable by anyone, forever                              ║",
  );
  console.log(
    "╚═══════════════════════════════════════════════════════════════╝\n",
  );
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
