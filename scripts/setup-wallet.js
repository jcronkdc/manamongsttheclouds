#!/usr/bin/env node
/**
 * WALLET SETUP HELPER — Man Amongst the Clouds
 *
 * Creates a new Polygon wallet for blockchain proofs
 * or shows info about an existing wallet.
 *
 * Based on WormHole wallet system by Justin Cronk / Cronk Companies LLC
 */

import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  const action = process.argv[2];

  console.log("");
  console.log(
    "╔═══════════════════════════════════════════════════════════════╗",
  );
  console.log(
    "║        WALLET SETUP — Man Amongst the Clouds                  ║",
  );
  console.log(
    "╚═══════════════════════════════════════════════════════════════╝",
  );
  console.log("");

  const { ethers } = await import("ethers");

  if (action === "create") {
    const wallet = ethers.Wallet.createRandom();

    console.log("🔑 NEW WALLET CREATED\n");
    console.log("   Address:     ", wallet.address);
    console.log("   Private Key: ", wallet.privateKey);
    console.log("   Mnemonic:    ", wallet.mnemonic.phrase);
    console.log("");
    console.log("⚠️  IMPORTANT: Save these credentials securely!");
    console.log("   - The private key gives FULL ACCESS to this wallet");
    console.log("   - Anyone with the mnemonic can restore this wallet");
    console.log("   - Store in a password manager, NOT in plain text");
    console.log("");
    console.log("📋 Next steps:");
    console.log(
      "   1. Buy a small amount of MATIC (~$1 is enough for 100+ proofs)",
    );
    console.log("   2. Send MATIC to:", wallet.address);
    console.log("   3. Run proof submission:");
    console.log(
      `      BLOCKCHAIN_PRIVATE_KEY=${wallet.privateKey} node prove-manuscript.js --submit`,
    );
    console.log("");

    // Save to local file (should be gitignored)
    const walletPath = join(__dirname, ".wallet-backup.json");
    const walletData = {
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic.phrase,
      createdAt: new Date().toISOString(),
      network: "polygon",
      purpose: "Proof of authorship — Man Amongst the Clouds",
      warning: "KEEP THIS FILE SECURE — DELETE AFTER BACKING UP ELSEWHERE",
    };
    writeFileSync(walletPath, JSON.stringify(walletData, null, 2));
    console.log(`💾 Backup saved to: ${walletPath}`);
    console.log("   ⚠️  Back this up securely and delete the local copy!");
  } else if (action === "check") {
    const privateKey = process.env.BLOCKCHAIN_PRIVATE_KEY;

    if (!privateKey) {
      console.log("❌ No BLOCKCHAIN_PRIVATE_KEY environment variable set");
      console.log("");
      console.log("   Set it with:");
      console.log("   export BLOCKCHAIN_PRIVATE_KEY=your_key_here");
      console.log("");
      console.log("   Or create a new wallet with:");
      console.log("   node setup-wallet.js create");
      process.exit(1);
    }

    try {
      const wallet = new ethers.Wallet(privateKey);
      const provider = new ethers.JsonRpcProvider(
        "https://polygon-bor-rpc.publicnode.com",
      );
      const balance = await provider.getBalance(wallet.address);
      const balanceMatic = ethers.formatEther(balance);

      console.log("✅ WALLET FOUND\n");
      console.log("   Address:", wallet.address);
      console.log("   Balance:", balanceMatic, "MATIC");
      console.log("   Network: Polygon Mainnet");
      console.log("");

      if (parseFloat(balanceMatic) < 0.01) {
        console.log("⚠️  Low balance! You need MATIC for transactions.");
        console.log("   Send MATIC to:", wallet.address);
      } else {
        console.log("✅ Ready to submit proofs!");
        console.log("   Run: node prove-manuscript.js --submit");
      }
    } catch (e) {
      console.log("❌ Invalid private key:", e.message);
    }
  } else if (action === "balance") {
    const privateKey = process.env.BLOCKCHAIN_PRIVATE_KEY;
    if (!privateKey) {
      console.log("Set BLOCKCHAIN_PRIVATE_KEY first");
      process.exit(1);
    }

    const wallet = new ethers.Wallet(privateKey);
    const provider = new ethers.JsonRpcProvider(
      "https://polygon-bor-rpc.publicnode.com",
    );
    const balance = await provider.getBalance(wallet.address);
    console.log(`Balance: ${ethers.formatEther(balance)} MATIC`);
  } else {
    console.log("Usage:");
    console.log("  node setup-wallet.js create    Create a new wallet");
    console.log(
      "  node setup-wallet.js check     Check existing wallet status",
    );
    console.log("  node setup-wallet.js balance   Quick balance check");
    console.log("");
    console.log("After creating a wallet:");
    console.log("  1. Fund it with MATIC (~$1 is plenty for 100+ proofs)");
    console.log(
      "  2. Set your private key: export BLOCKCHAIN_PRIVATE_KEY=0x...",
    );
    console.log("  3. Run proofs: node prove-manuscript.js --submit");
  }

  console.log("");
}

main().catch(console.error);
