/**
 * Build a formatted DOCX of Part One: The Still Water with glossary.
 * Run: node scripts/build-docx.mjs
 * Output: public/matc-part-one.docx
 * Requires: pandoc 3.x installed
 */

import { readFileSync, writeFileSync, unlinkSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CHAPTERS_DIR = join(ROOT, "content", "chapters");
const GLOSSARY_SRC = join(ROOT, "content", "glossary.md");
const OUTPUT = join(ROOT, "public", "matc-part-one.docx");
const REF_DOCX = join(__dirname, "reference.docx");
const TEMP_MD = join(__dirname, ".combined-part-one.md");

const CHAPTER_META = [
  { file: "prologue.md", label: "Prologue", title: "The First Song" },
  { file: "chapter_01.md", label: "Chapter 1", title: "The Herbs" },
  { file: "chapter_02.md", label: "Chapter 2", title: "The Collection" },
  { file: "chapter_03.md", label: "Chapter 3", title: "The Blue Sun" },
  { file: "chapter_04.md", label: "Chapter 4", title: "The Running" },
  { file: "chapter_05.md", label: "Chapter 5", title: "The Merchant" },
  { file: "chapter_06.md", label: "Chapter 6", title: "The History" },
  { file: "chapter_07.md", label: "Chapter 7", title: "The Growing" },
  { file: "chapter_08.md", label: "Chapter 8", title: "The Patrol" },
  { file: "chapter_09.md", label: "Chapter 9", title: "The Flood" },
  { file: "chapter_10.md", label: "Chapter 10", title: "The Report" },
];

function stripChapterHeaders(md) {
  return md
    .replace(/^# PART ONE:[\s\S]*?\n\n/s, "")
    .replace(/^_"In the time before[\s\S]*?"_\s*\n\n---\s*\n\n/s, "")
    .replace(/^# PROLOGUE\s*\n\n## [\s\S]+?\s*\n\n---\s*\n\n/s, "")
    .replace(/^# Chapter \d+\s*\n\n## [\s\S]+?\s*\n\n---\s*\n\n/s, "")
    .trim();
}

console.log("Assembling manuscript for DOCX...");

const parts = [];

// YAML frontmatter for pandoc
parts.push(`---
title: "Man Amongst the Clouds"
subtitle: "Part One: The Still Water"
author: "Justin Cronk"
date: "2026"
lang: en
---
`);

// Title page (using markdown headings — pandoc will style these)
parts.push(`\\newpage

::: {custom-style="Title"}
MAN AMONGST THE CLOUDS
:::

::: {custom-style="Subtitle"}
Part One: The Still Water
:::

---

::: {custom-style="Quote"}
*"In the time before the taking, the world sang to itself, and men were wise enough to listen."*
:::

::: {custom-style="Author"}
by Justin Cronk
:::

::: {custom-style="Author"}
Stillfire Press
:::

\\newpage

::: {custom-style="Body Text"}
Man Amongst the Clouds: Part One — The Still Water

© 2026 Justin Cronk. All rights reserved.

Published by Stillfire Press — stillfirepress.com

This is a work of fiction. Names, characters, places, and incidents are the product of the author's imagination or are used fictitiously. Any resemblance to actual persons, living or dead, events, or locales is entirely coincidental.

First Digital Edition: March 2026

manamongsttheclouds.com
:::

\\newpage
`);

// Part header
parts.push(`
# PART ONE

## The Still Water

---

\\newpage
`);

// Chapters
for (const ch of CHAPTER_META) {
  const md = readFileSync(join(CHAPTERS_DIR, ch.file), "utf-8");
  const body = stripChapterHeaders(md);

  parts.push(`# ${ch.label}\n\n## ${ch.title}\n\n---\n\n${body}\n\n\\newpage\n`);
  console.log(`  ${ch.file} → ${ch.label}: ${ch.title}`);
}

// End of Part One
parts.push(`
---

*End of Part One: The Still Water*

The story continues in Part Two: The Waking.

Sign up for updates at manamongsttheclouds.com

\\newpage
`);

// Glossary
const glossary = readFileSync(GLOSSARY_SRC, "utf-8");
parts.push(glossary);

// Write combined markdown
const combined = parts.join("\n");
writeFileSync(TEMP_MD, combined, "utf-8");

// Run pandoc
console.log("Running pandoc...");
try {
  execSync(
    `pandoc "${TEMP_MD}" -o "${OUTPUT}" --from markdown --to docx --reference-doc="${REF_DOCX}" --toc --toc-depth=2`,
    { stdio: "inherit" },
  );
  const stats = readFileSync(OUTPUT);
  console.log(
    `DOCX built: ${OUTPUT} (${(stats.length / 1024).toFixed(1)} KB)`,
  );
} catch (err) {
  console.error("pandoc failed:", err.message);
  process.exit(1);
} finally {
  try {
    unlinkSync(TEMP_MD);
  } catch {}
}
