# Full Manuscript AI Detection Audit

**Date:** March 12, 2026
**Guide Used:** GENERIC_AI_AUDIT_GUIDE.md
**Scope:** Prologue + 48 chapters (chapter_47 merged into chapter_46)

---

## Thresholds (from guide)

| Metric | Safe | Flaggable |
|--------|------|-----------|
| Em dash ratio (lines/dash) | ≥5.0 | <5.0 |
| "The way" similes | 1-4 | 8+ |
| Filler qualifiers | 0-1 | 5+ |
| Daisy chains | 0-1 | 3+ |
| "Not" line clusters | 0-1/paragraph | 3+ stacked |

---

## Full Scan Results

| Chapter | Lines | Em Dashes | Ratio | "The Way" | Qualifiers | Daisy Chains | Not Lines |
|---------|-------|-----------|-------|-----------|------------|--------------|-----------|
| Prologue | 129 | 22 | 5.8 ✅ | 3 ✅ | 0 ✅ | 1 ✅ | 1 ✅ |
| Ch01 | 167 | 33 | 5.0 ✅ | 5 ⚠️ | 1 ✅ | 0 ✅ | 1 ✅ |
| Ch02 | 177 | 37 | 4.7 ⚠️ | 7 ⚠️ | 0 ✅ | 1 ✅ | 3 ⚠️ |
| Ch03 | 197 | 45 | 4.3 ⚠️ | 3 ✅ | 1 ✅ | 0 ✅ | 2 ✅ |
| Ch04 | 207 | 45 | 4.6 ⚠️ | 7 ⚠️ | 3 ⚠️ | 0 ✅ | 2 ✅ |
| Ch05 | 109 | 29 | 3.7 🔴 | 0 ✅ | 1 ✅ | 1 ✅ | 0 ✅ |
| **Ch06** | **293** | **62** | **4.7 ⚠️** | **12 🔴** | **3 ⚠️** | **2 ⚠️** | **2 ✅** |
| Ch07 | 141 | 34 | 4.1 ⚠️ | 4 ✅ | 1 ✅ | 0 ✅ | 3 ⚠️ |
| Ch08 | 121 | 29 | 4.1 ⚠️ | 5 ⚠️ | 4 ⚠️ | 0 ✅ | 1 ✅ |
| Ch09 | 151 | 39 | 3.8 🔴 | 5 ⚠️ | 0 ✅ | 0 ✅ | 0 ✅ |
| Ch10 | 197 | 41 | 4.8 ⚠️ | 3 ✅ | 2 ⚠️ | 0 ✅ | 0 ✅ |
| Ch11 | 177 | 41 | 4.3 ⚠️ | 1 ✅ | 1 ✅ | 0 ✅ | 3 ⚠️ |
| Ch12 | 89 | 23 | 3.8 🔴 | 0 ✅ | 4 ⚠️ | 0 ✅ | 0 ✅ |
| Ch13 | 131 | 30 | 4.3 ⚠️ | 3 ✅ | 2 ⚠️ | 0 ✅ | 0 ✅ |
| Ch14 | 123 | 31 | 3.9 🔴 | 2 ✅ | 0 ✅ | 0 ✅ | 2 ✅ |
| **Ch15** | **148** | **45** | **3.2 🔴** | **6 ⚠️** | **1 ✅** | **0 ✅** | **1 ✅** |
| **Ch16** | **212** | **60** | **3.5 🔴** | **9 🔴** | **4 ⚠️** | **0 ✅** | **5 🔴** |
| Ch17 | 121 | 30 | 4.0 ⚠️ | 7 ⚠️ | 5 🔴 | 1 ✅ | 1 ✅ |
| **Ch18** | **169** | **49** | **3.4 🔴** | **11 🔴** | **2 ⚠️** | **1 ✅** | **1 ✅** |
| **Ch19** | **133** | **41** | **3.2 🔴** | **4 ✅** | **2 ⚠️** | **4 🔴** | **3 ⚠️** |
| Ch20 | 125 | 31 | 4.0 ⚠️ | 8 🔴 | 4 ⚠️ | 2 ⚠️ | 1 ✅ |
| **Ch21** | **192** | **49** | **3.9 🔴** | **14 🔴** | **0 ✅** | **3 🔴** | **2 ✅** |
| Ch22 | 121 | 32 | 3.7 🔴 | 6 ⚠️ | 0 ✅ | 2 ⚠️ | 0 ✅ |
| Ch23 | 143 | 40 | 3.5 🔴 | 5 ⚠️ | 2 ⚠️ | 0 ✅ | 0 ✅ |
| Ch24 | 139 | 33 | 4.2 ⚠️ | 8 🔴 | 0 ✅ | 1 ✅ | 2 ✅ |
| Ch25 | 151 | 32 | 4.7 ⚠️ | 5 ⚠️ | 0 ✅ | 1 ✅ | 1 ✅ |
| Ch26 | 167 | 37 | 4.5 ⚠️ | 11 🔴 | 0 ✅ | 1 ✅ | 1 ✅ |
| Ch27 | 94 | 20 | 4.7 ⚠️ | 2 ✅ | 0 ✅ | 3 🔴 | 1 ✅ |
| Ch28 | 129 | 32 | 4.0 ⚠️ | 2 ✅ | 0 ✅ | 0 ✅ | 0 ✅ |
| Ch29 | 121 | 30 | 4.0 ⚠️ | 5 ⚠️ | 0 ✅ | 0 ✅ | 0 ✅ |
| Ch30 | 135 | 31 | 4.3 ⚠️ | 4 ✅ | 0 ✅ | 1 ✅ | 4 🔴 |
| Ch31 | 81 | 23 | 3.5 🔴 | 4 ✅ | 0 ✅ | 0 ✅ | 0 ✅ |
| Ch32 | 81 | 22 | 3.6 🔴 | 3 ✅ | 0 ✅ | 1 ✅ | 0 ✅ |
| Ch33 | 173 | 30 | 5.7 ✅ | 4 ✅ | 0 ✅ | 2 ⚠️ | 3 ⚠️ |
| Ch34 | 113 | 25 | 4.5 ⚠️ | 3 ✅ | 0 ✅ | 1 ✅ | 4 🔴 |
| Ch35 | 115 | 29 | 3.9 🔴 | 2 ✅ | 0 ✅ | 1 ✅ | 2 ✅ |
| Ch36 | 103 | 24 | 4.2 ⚠️ | 0 ✅ | 1 ✅ | 1 ✅ | 0 ✅ |
| Ch37 | 167 | 32 | 5.2 ✅ | 4 ✅ | 0 ✅ | 1 ✅ | 0 ✅ |
| Ch38 | 113 | 20 | 5.6 ✅ | 4 ✅ | 0 ✅ | 3 🔴 | 0 ✅ |
| **Ch39** | **97** | **29** | **3.3 🔴** | **1 ✅** | **0 ✅** | **0 ✅** | **2 ✅** |
| **Ch40** | **173** | **42** | **4.1 ⚠️** | **3 ✅** | **1 ✅** | **4 🔴** | **1 ✅** |
| **Ch41** | **83** | **27** | **3.0 🔴** | **4 ✅** | **2 ⚠️** | **1 ✅** | **0 ✅** |
| **Ch42** | **159** | **45** | **3.5 🔴** | **4 ✅** | **2 ⚠️** | **3 🔴** | **0 ✅** |
| Ch43 | 91 | 25 | 3.6 🔴 | 5 ⚠️ | 0 ✅ | 1 ✅ | 2 ✅ |
| Ch44 | 71 | 21 | 3.3 🔴 | 3 ✅ | 8 🔴 | 1 ✅ | 0 ✅ |
| Ch45 | 85 | 23 | 3.6 🔴 | 3 ✅ | 10 🔴 | 1 ✅ | 1 ✅ |
| **Ch46** | **171** | **39** | **4.3 ⚠️** | **2 ✅** | **26 🔴** | **3 🔴** | **0 ✅** |
| Ch47 | 83 | 15 | 5.5 ✅ | 1 ✅ | 10 🔴 | 2 ⚠️ | 1 ✅ |
| Ch48 | 67 | 18 | 3.7 🔴 | 9 🔴 | 10 🔴 | 0 ✅ | 1 ✅ |

---

## Priority Tiers

### TIER 1 — CRITICAL (multiple 🔴 flags)
Fix these first. These chapters would likely trigger AI detection tools.

| Chapter | Issues |
|---------|--------|
| **Ch06** | 62 em dashes, 12 "the way" similes, 3 qualifiers, 2 daisy chains |
| **Ch16** | 60 em dashes (ratio 3.5), 9 "the way" similes, 4 qualifiers, 5 "Not" lines |
| **Ch18** | 49 em dashes (ratio 3.4), 11 "the way" similes |
| **Ch19** | 41 em dashes (ratio 3.2), 4 daisy chains, 3 "Not" lines |
| **Ch21** | 49 em dashes (ratio 3.9), 14 "the way" similes, 3 daisy chains |
| **Ch40** | 42 em dashes, 4 daisy chains |
| **Ch42** | 45 em dashes (ratio 3.5), 3 daisy chains |
| **Ch46** | 26 qualifiers (!), 3 daisy chains |
| **Ch48** | 9 "the way" similes, 10 qualifiers |

### TIER 2 — HIGH (1-2 significant flags)
Fix after Tier 1.

| Chapter | Issues |
|---------|--------|
| **Ch15** | 45 em dashes (ratio 3.2) |
| **Ch17** | 5 qualifiers, 7 "the way" similes |
| **Ch20** | 8 "the way" similes, 4 qualifiers |
| **Ch24** | 8 "the way" similes |
| **Ch26** | 11 "the way" similes |
| **Ch27** | 3 daisy chains |
| **Ch30** | 4 "Not" lines |
| **Ch34** | 4 "Not" lines |
| **Ch38** | 3 daisy chains |
| **Ch41** | 27 em dashes (ratio 3.0) |
| **Ch44** | 8 qualifiers |
| **Ch45** | 10 qualifiers |
| **Ch47** | 10 qualifiers |

### TIER 3 — BORDERLINE (minor flags only)
Address if time allows. Most are em dash ratio in the 3.5-4.9 range.

Ch02, Ch03, Ch04, Ch05, Ch07, Ch08, Ch09, Ch10, Ch11, Ch12, Ch13, Ch14, Ch22, Ch23, Ch25, Ch28, Ch29, Ch31, Ch32, Ch35, Ch39, Ch43

### CLEAN ✅
Prologue, Ch33, Ch36, Ch37
