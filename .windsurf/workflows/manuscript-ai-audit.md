---
description: How to audit and reduce AI detection scores in the MATC manuscript
---

# Manuscript AI Detection Audit — Reference Guide

**Last updated:** March 12, 2026
**Baseline:** Part 1 passed GPTZero at 0% AI probability after full treatment.

---

## The Five Patterns That Flag AI Detectors

### 1. "The specific, [adj], [adj]" Qualifier Stacking
- **What:** The phrase "the specific" used as a filler qualifier before adjective lists
- **Fix:** Delete "the specific" — most instances are deletable with no replacement needed
- **Preserve:** Natural uses where "specific" means "particular" (e.g., "six specific memories," "not a specific child," "my specific frequency")
- **Search:** `grep -i "specific" chapter_XX.md`
- **Density before treatment:** ~350 instances across full manuscript
- **Density after treatment:** ~20 natural uses remaining

### 2. "Not X. Not Y. But Z." Negation Chains
- **What:** Triple or more negation constructions before a positive statement
- **Fix:** Keep the strongest negation, consolidate the rest. "Not X. Not Y. Not Z. But W." → "Not X or Y. W."
- **Preserve:** Single "Not X — Y" constructions are fine. The author's voice uses this naturally. The issue is when 3+ stack in one paragraph.
- **Search:** `grep -n "Not " chapter_XX.md` (look for clusters)
- **Threshold:** 3+ negations in one paragraph = flaggable

### 3. Identical Structural Templates
- **What:** Multiple passages following the same formula (e.g., "The [discipline] came [ordinal]. [Description]. The [discipline] showed him...")
- **Fix:** Give each instance a structurally unique shape. Vary the intro, the connective structure, the length.
- **Key locations in manuscript:**
  - Ch 40: Six-discipline activation (was identical × 6, now varied)
  - Ch 42: Five memory vignettes (was identical × 5, now partially varied)
  - Ch 35: Four prisoner memories (was identical × 4, now varied)
  - Ch 41: "Survived because" formulas (was identical × 4, now varied)
  - Ch 36: Three "gone" divine memories (was identical × 3, now varied)

### 4. Daisy-Chain Closures
- **What:** "and the X was Y, and the Y was Z, and the Z was the thing that..."
- **Fix:** Break into separate sentences or reduce chain to 2 links max. "The sound held steady. It was love. And the love was holding."
- **Search:** `grep "and the .* was .*, and the .* was" chapter_XX.md`

### 5. Restatement Loops
- **What:** Same meaning stated → metaphored → re-stated → re-metaphored (3-4 layers)
- **Fix:** Trust the first statement. If the metaphor is strong, let it stand alone. Cut layers 2-4.
- **Example before:** "Exhaustion. The complete, terminal exhaustion of a body that had spent everything..."
- **Example after:** "Exhaustion first — the terminal kind, a body that had spent everything..."

---

## The Three Patterns From the AI Critique Report

### 6. Em Dash Overuse
- **What:** ~1,600 em dashes across the manuscript. Average 1 per 3-4 lines. Published literary fiction: 1 per 10-15 lines.
- **Fix:** Convert ~30-40% to other punctuation:
  - Paired em dashes (parenthetical) → commas
  - Em dash before elaboration → colon
  - Em dash before new thought → period (adds burstiness)
  - Em dash before continuation → semicolon
- **Search:** `grep -c '—' chapter_XX.md` (target chapters above 30)
- **Priority chapters:** Any chapter with 40+ em dashes needs reduction

### 7. "The way a/the..." Simile Overuse
- **What:** "the way a [simile]" is the manuscript's dominant comparative device
- **Fix:** 
  - Cut similes that over-explain a strong image
  - Replace "the way" with "as" or "like" for variety
  - Remove duplicate similes in the same paragraph
  - Cut repeated "the way the lake stone held the riverbed" callbacks (used 10+ times)
- **Search:** `grep -c 'the way a \|the way the ' chapter_XX.md` (target chapters above 5)
- **Priority:** Any chapter with 8+ instances needs aggressive reduction

### 8. Over-Explanation (Rich Yet Shallow)
- **What:** Image → metaphor → explanation of metaphor. The explanation kills emotional depth.
- **Fix:** Trust the image. Cut the explanatory layer.
- **Example before:** "He held it the way the stone held the riverbed — without force, without aggression, with the patient, immovable, structurally certain pressure of a person who..."
- **Example after:** "He held it without force, without aggression, with the patient, immovable pressure of a person who..."
- **Red flag phrases:** Any sentence that explains what a metaphor means after delivering the metaphor.

---

## Chapter Risk Tiers (Post-Treatment)

| Tier | Chapters | Notes |
|------|----------|-------|
| **Strongest (Knife POV)** | 2, 8, 10, 12, 17 | Naturally high burstiness. Minimal edits needed. Use as voice benchmark. |
| **Strong** | 1, 3, 4, 5, 6, 7, 14, 27 | Good organic voice. Light pass sufficient. |
| **Moderate (Aelo training)** | 9, 11, 13, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 28, 29, 30 | Training/exposition chapters. Smooth Aelo voice can flag detectors. These need the most attention. |
| **Critical (treated)** | 31, 32, 33, 34, 37, 40, 42 | Climactic chapters. Were highest risk. Now treated with full structural passes. |
| **Yellow (treated)** | 35, 36, 38, 39, 41, 43 | Supporting climactic chapters. Treated with targeted passes. |

---

## Part 2 Specific Issue

Part 2 (Ch 11-22) scores ~91% on GPTZero despite edits. This is because:
- 10 of 12 chapters are Aelo POV (smooth, explanatory rhythm)
- Only Ch 12 and Ch 17 are Knife chapters (natural burstiness)
- 5 chapters are training chapters following the same structural template (teach → try → fail → succeed → emotion)
- The issue is **document-level rhythmic uniformity**, not individual patterns

This is a characteristic of the author's Aelo voice, not AI generation. Part 1 passes because it has more POV variety (4 Knife/Halvar chapters in 11 total). The solution is either:
1. Accept the score (readers don't AI-check novels)
2. Structural surgery on training chapters (visible to readers)
3. Wait for natural revision to inject more variation

---

## Quick Audit Workflow

For any new or revised chapter:

```bash
# 1. Check em dash density (target: under 30 per chapter)
grep -c '—' chapter_XX.md

# 2. Check "the way" simile density (target: under 5 per chapter)
grep -oc 'the way a \|the way the \|the way you \|the way it ' chapter_XX.md

# 3. Check for "the specific" filler (target: 0 unless natural use)
grep -in 'specific' chapter_XX.md

# 4. Check for daisy-chains (target: 0-1 per chapter)
grep 'and the .* was .*, and the .* was' chapter_XX.md

# 5. Check for triple negation (target: 0 per paragraph)
grep -n 'Not.*Not.*Not' chapter_XX.md
```

---

## Natural Uses to Always Preserve

These are NOT filler and should never be cut:
- "specific" meaning "particular" in context (e.g., "six specific memories")
- "Not X — Y" as a single contrast (the author's natural voice)
- Em dashes in dialogue (character voice)
- Negation patterns in Knife/Varas dialogue (character voice)
- "The way" similes that are genuinely original (not callbacks or over-explanations)

---

## Files Modified in This Audit

Every chapter from `prologue.md` through `chapter_43.md` was edited. The heaviest modifications were in:
- Ch 31-34, 37, 40, 42 (structural template breaking + pattern reduction)
- Ch 1, 6, 11, 13, 15, 16, 18, 24 (em dash + simile + over-explanation reduction)
- All chapters (removal of ~350 "the specific" filler instances)
