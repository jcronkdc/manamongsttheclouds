# AI Detection Audit Guide for Fiction

**Publisher:** Stillfire Press
**Purpose:** A reusable framework for auditing any manuscript against AI detection tools (GPTZero, Originality.ai, etc.) before publication.
**Applicable to:** Novels, novellas, short stories — any prose fiction regardless of genre.

---

## How AI Detectors Work (And Why They Flag Human Writing)

AI detectors measure two things:

1. **Perplexity** — How predictable is the next word? Low perplexity = the detector could guess what comes next. High perplexity = surprising word choices.
2. **Burstiness** — How much does sentence length and rhythm vary? Low burstiness = uniform cadence. High burstiness = a mix of long, short, fragmented, and flowing sentences.

**Why human fiction gets flagged:**
- A consistent narrative voice (especially in close third or deep POV) produces rhythmic uniformity across thousands of words
- Exposition-heavy chapters (worldbuilding, training sequences, travel) tend toward explanatory prose with predictable cadence
- A single-POV novel is more likely to flag than a multi-POV novel because there's less rhythmic variation across the document
- Literary fiction with long, cadenced sentences (think Marilynne Robinson, Cormac McCarthy) can flag as low-burstiness

**Key insight:** A high AI probability score does not mean the writing is AI-generated. It means the writing has low variance. These are different things.

---

## The 10 Patterns That Flag Detectors

### Pattern 1: Qualifier Stacking
**What it looks like:**
> "The specific, deliberate, architectural quality of the silence"

**Why it flags:** AI models pad descriptions with stacked adjectives and filler qualifiers ("the specific," "the particular," "the precise") to sound literary. Three or more qualifiers before a noun is a strong signal.

**Fix:** Cut filler qualifiers. If the adjective doesn't change the meaning, delete it. "The silence" is almost always stronger than "the specific, deliberate silence."

**Search:** `grep -in "the specific\|the particular\|the precise" [file]`

---

### Pattern 2: Triple Negation Chains
**What it looks like:**
> "Not anger. Not grief. Not the dull ache of loss. Something else entirely."

**Why it flags:** AI models love the "Not X. Not Y. But Z." structure because it's a predictable rhetorical pattern that sounds profound. Once per chapter is fine. Three times per page is a signal.

**Fix:** Keep the strongest negation and consolidate. "Not anger or grief. Something else." Or restructure: "He expected grief. What arrived was different."

**Search:** Look for clusters of lines starting with "Not" in close proximity.

---

### Pattern 3: Identical Structural Templates
**What it looks like:**
> "The first memory was a beach. She stood at the water's edge and felt..."
> "The second memory was a garden. She knelt in the soil and felt..."
> "The third memory was a room. She sat in the chair and felt..."

**Why it flags:** Repetitive structure is the single strongest AI signal. When multiple passages follow the same formula (same sentence shape, same intro pattern, same emotional arc), detectors read it as generated from a template.

**Fix:** Give each instance a structurally unique shape. Vary the opening, the length, the syntax, the emotional delivery. If you have 5 parallel items, make each one sound like it was written on a different day.

---

### Pattern 4: Daisy-Chain Closures
**What it looks like:**
> "and the carrying was the wound, and the wound was the silence, and the silence was the price of the love, and the love was the only thing he had left"

**Why it flags:** This "A was B, and B was C, and C was D" chain is extremely common in AI prose. It creates a false sense of depth through recursion rather than genuine insight.

**Fix:** Break chains at 2 links maximum. Or restructure: state the first thing, then jump to the last thing, and let the reader connect the middle.

**Search:** `grep "and the .* was .*, and the .* was" [file]`

---

### Pattern 5: Restatement Loops
**What it looks like:**
> "He was exhausted. The complete, bone-deep exhaustion of a man who had given everything. Every ounce of strength, every reserve of will, every last fragment of the energy that had sustained him through the ordeal — all of it spent."

**Why it flags:** AI models restate the same idea in escalating metaphorical layers because each token generation builds on the previous one. The result is 3-4 sentences that all say the same thing. Human writers trust the first statement.

**Fix:** Pick the strongest version and cut the rest. "He was exhausted — the bone-deep kind, where even breathing felt borrowed."

---

### Pattern 6: Em Dash Overuse
**What it looks like:**
> "He walked — not quickly — toward the door — the old door, the one with the scratch — and paused."

**Why it flags:** AI models use em dashes as a universal connector between clauses. Human writers use a mix of commas, colons, semicolons, periods, and em dashes. A chapter with 40+ em dashes and few other punctuation varieties reads as AI.

**Benchmark:** Published literary fiction averages 1 em dash per 10-15 lines. If your chapter has more than 1 per 4-5 lines, reduce.

**Fix options:**
- Paired em dashes (parenthetical) → commas
- Em dash before elaboration → colon
- Em dash before new sentence → period
- Em dash before continuation → semicolon

**Search:** `grep -c '—' [file]`

---

### Pattern 7: "The way a/the..." Simile Overuse
**What it looks like:**
> "She held the cup the way a child holds a butterfly — carefully, afraid of breaking it."
> "He spoke the way old men speak to the dying — slowly, with too much gentleness."

**Why it flags:** "The way a [noun] [verbs]" is AI's dominant simile construction. A few per chapter are natural. 8+ per chapter creates a detectable pattern.

**Fix:**
- Cut similes that explain an already-clear image
- Replace "the way" with "as" or "like" for variety
- Delete callback similes (reusing the same simile from earlier chapters)

**Search:** `grep -c 'the way a \|the way the \|the way you ' [file]`

---

### Pattern 8: Image → Metaphor → Explanation of Metaphor
**What it looks like:**
> "The door was red. Red like blood — the particular, arterial red that speaks of violence, the red that the eye registers before the mind catches up, the red that says: something has happened here."

**Why it flags:** AI models generate an image, then a metaphor for the image, then an explanation of why the metaphor is apt. This three-layer pattern is extremely predictable. Human writers trust the image or the metaphor, rarely both, and almost never explain the metaphor.

**Fix:** Pick one: the image or the metaphor. "The door was red. Arterial." Done.

---

### Pattern 9: Uniform Sentence Length
**What it looks like:**
A paragraph where every sentence is 15-25 words. No fragments. No 40-word sentences. No 3-word sentences. Just a steady, metronomic rhythm.

**Why it flags:** This is the core of the "burstiness" metric. Human writers naturally vary sentence length because they vary their thinking speed. AI generates tokens at a consistent rate, producing consistent length.

**Fix:** Introduce deliberate variety. Follow a long sentence with a fragment. Use one-word paragraphs. Break a complex thought into three short punches. Let a sentence run for 50 words when the emotion demands it.

---

### Pattern 10: Self-Explaining Foreshadowing
**What it looks like:**
> "She did not yet know that this moment would change everything. She did not yet understand that the door she was about to open led not to a room but to a decision, and the decision would cost her the only thing she had never been willing to lose."

**Why it flags:** AI models telegraph significance by over-narrating the importance of a moment before it happens. This "she did not yet know" construction is a strong signal.

**Fix:** Delete the foreshadowing. Let the moment happen. The reader will feel the significance without being told to.

---

## Audit Workflow

### Step 1: Quantitative Scan
Run these commands on each chapter file:

```bash
# Em dash count (target: under 30 per chapter, under 1 per 5 lines)
grep -c '—' [file]

# "The way" simile count (target: under 5 per chapter)
grep -oc 'the way a \|the way the \|the way you \|the way it ' [file]

# Qualifier stacking (target: 0 filler uses)
grep -in 'the specific\|the particular\|the precise' [file]

# Daisy chains (target: 0-1 per chapter)
grep 'and the .* was .*, and the .* was' [file]

# Triple negation clusters (target: 0 per paragraph)
grep -n '^Not ' [file]
```

### Step 2: Structural Scan
Read through looking for:
- [ ] Passages where 3+ items follow the same sentence template
- [ ] Paragraphs that restate the same idea 3+ times
- [ ] Sections where sentence length doesn't vary for 10+ consecutive sentences
- [ ] "She did not yet know" / "He would later learn" foreshadowing

### Step 3: POV Distribution Check
Count chapters by POV character. If 80%+ of chapters share a single POV, the manuscript is at higher risk for rhythmic uniformity. Consider whether interstitial chapters, POV breaks, or structural variety can be introduced.

### Step 4: Test High-Risk Chapters
Export the 2-3 longest single-POV chapters as a standalone .docx and run through GPTZero individually. This identifies the chapters dragging the score.

### Step 5: Apply Fixes
Work from the highest-density chapters first. Prioritize:
1. Breaking identical structural templates (strongest impact)
2. Reducing daisy chains and restatement loops
3. Introducing sentence-length variation
4. Reducing em dash and simile density
5. Cutting qualifier stacking and over-explanation

---

## What NOT to Edit

- **Character voice in dialogue** — If a character speaks in em dashes or negation chains, that's voice, not a pattern.
- **Intentional repetition for rhetorical effect** — A deliberate tricolon or anaphora (e.g., "We hold. We hold. We hold.") is a stylistic choice. Keep it. Just don't let the same device appear 15 times in one chapter.
- **Single "Not X — Y" contrasts** — One per paragraph is natural. The issue is when 3+ stack.
- **Original similes** — If a simile is genuinely surprising and not a callback, keep it regardless of "the way" construction.
- **The author's natural cadence** — The goal is to disrupt detectable uniformity, not to destroy the writer's voice. Every edit should make the prose better, not just different.

---

## Benchmarks

| Metric | AI-Flaggable | Safe Range | Target |
|--------|-------------|------------|--------|
| Em dashes per chapter | 40+ | 10-25 | 15-20 |
| "The way" similes per chapter | 8+ | 1-4 | 2-3 |
| Filler qualifiers per chapter | 5+ | 0-1 | 0 |
| Daisy chains per chapter | 3+ | 0-1 | 0 |
| Restatement loops per chapter | 3+ | 0-1 | 0-1 |
| Identical templates per section | 3+ parallel | 0 | 0 |
| Sentence length variance | Low (all 15-25w) | High | Mix of 3-50w |

---

## Final Note

AI detectors are probability tools, not truth machines. They measure statistical patterns, not authorship. A manuscript can be 100% human-written and still flag if the prose has low variance. Conversely, AI-generated text can pass if it's been sufficiently edited.

The goal of this audit is not to "fool" detectors. The goal is to identify patterns that make prose predictable — because predictable prose is weaker prose regardless of who or what wrote it. Every fix in this guide makes the writing sharper, more varied, and more engaging on its own merits.

A clean detector score is a side effect of good revision.
