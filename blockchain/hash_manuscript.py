#!/usr/bin/env python3
"""
Generates a SHA-256 hash of the complete manuscript for blockchain timestamping.
This hash can be stored on-chain (Polygon) as irrefutable proof of ownership.

Usage:
  python3 hash_manuscript.py

The hash proves: "This exact manuscript existed at the time the hash was recorded on-chain."
Any change to any character in any chapter would produce a completely different hash.
"""

import hashlib
import os
import json
from datetime import datetime

MANUSCRIPT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "manuscript")
OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))

# All manuscript files in canonical order
FILES = [
    "prologue.md",
    *[f"chapter_{i:02d}.md" for i in range(1, 49)],
    "epilogue.md",
]

def main():
    # Hash each file individually AND the combined manuscript
    file_hashes = {}
    combined = hashlib.sha256()

    for fn in FILES:
        fp = os.path.join(MANUSCRIPT_DIR, fn)
        if not os.path.exists(fp):
            print(f"  WARNING: {fn} not found, skipping")
            continue

        with open(fp, 'rb') as f:
            content = f.read()

        file_hash = hashlib.sha256(content).hexdigest()
        file_hashes[fn] = file_hash
        combined.update(content)

    manuscript_hash = combined.hexdigest()

    # Build the proof document
    proof = {
        "title": "Man Amongst the Clouds",
        "author": "Justin Cronk",
        "timestamp_utc": datetime.utcnow().isoformat() + "Z",
        "manuscript_sha256": manuscript_hash,
        "file_count": len(file_hashes),
        "total_files": [fn for fn in FILES if fn in [k for k in file_hashes]],
        "individual_hashes": file_hashes,
        "instructions": {
            "what_this_proves": "This SHA-256 hash uniquely identifies the exact content of the manuscript. Any change to any character in any file would produce a completely different hash.",
            "how_to_verify": "Run this script again on the same manuscript files. If the hash matches, the content is identical to what was registered on-chain.",
            "polygon_instructions": [
                "1. Open MetaMask or any Polygon wallet",
                "2. Send a 0 MATIC transaction to your OWN wallet address",
                "3. In the 'Hex Data' or 'Input Data' field, paste the manuscript_sha256 hash prefixed with 0x",
                f"4. The data to paste: 0x{manuscript_hash}",
                "5. Confirm the transaction (gas cost: ~$0.001 on Polygon)",
                "6. Save the transaction hash — this is your on-chain proof",
                "7. Anyone can verify by looking up the transaction on polygonscan.com"
            ],
            "alternative_services": [
                "OriginStamp.com — automated blockchain timestamping service",
                "OpenTimestamps.org — free, uses Bitcoin blockchain",
                "Polygonscan.com — verify any Polygon transaction"
            ]
        }
    }

    # Save proof document
    proof_path = os.path.join(OUTPUT_DIR, "manuscript_proof.json")
    with open(proof_path, 'w') as f:
        json.dump(proof, f, indent=2)

    # Print results
    print("=" * 60)
    print("MANUSCRIPT BLOCKCHAIN PROOF")
    print("=" * 60)
    print(f"  Title:    Man Amongst the Clouds")
    print(f"  Author:   Justin Cronk")
    print(f"  Date:     {proof['timestamp_utc']}")
    print(f"  Files:    {len(file_hashes)} manuscript files")
    print(f"")
    print(f"  SHA-256 HASH:")
    print(f"  {manuscript_hash}")
    print(f"")
    print(f"  Polygon calldata (paste in MetaMask hex data field):")
    print(f"  0x{manuscript_hash}")
    print(f"")
    print(f"  Proof saved to: {proof_path}")
    print("=" * 60)

if __name__ == '__main__':
    main()
