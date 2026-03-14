# Manuscript Formatting Guide — Vellum / Atticus Import

## Current State
The manuscript exists as 50 individual markdown files + a build script that compiles them into a single .docx. The .docx is formatted with Georgia 12pt, proper chapter headings, and part dividers.

## For Vellum Import

Vellum imports from .docx files. The current `Man Amongst the Clouds - Manuscript.docx` should import cleanly, but here's what to check:

### Before Importing
1. **Chapter headings** must be formatted as Heading 1 (H1) in Word — the build script does this ✓
2. **Part dividers** must be their own pages — the build script does this ✓
3. **Scene breaks** (the `---` horizontal rules) should appear as centered `* * *` or a blank line — check after import
4. **Italics** must be preserved — the build script converts markdown `_text_` to Word italic ✓
5. **No smart quotes issues** — check for straight vs. curly quote consistency after import

### Vellum Settings Recommended
- **Trim size:** 6" x 9" (standard for epic fantasy at this page count)
- **Font:** Georgia, Garamond, or Palatino (literary feel)
- **Font size:** 11pt for print (6x9 at 153k words = ~420-450 pages)
- **Chapter style:** "Novel" or "Classic" — drop cap on first paragraph, chapter title centered
- **Part pages:** Full-page, centered, with epigraph beneath
- **Scene breaks:** Three centered asterisks (* * *) or Vellum's built-in ornamental break
- **Headers/footers:** Author name on left pages, book title on right pages, page numbers centered at bottom
- **Margins:** Vellum defaults are good for 6x9

### Part Structure in Vellum
Vellum handles "Parts" as a grouping layer above chapters. Set up:

```
FRONT MATTER
  - Title Page
  - Copyright Page
  - Dedication (if desired)
  - Epigraph (optional — could use the prologue's opening line)

PROLOGUE — "The First Song"

PART I: THE STILL WATER
  Epigraph: "In the time before the taking, the world sang to itself, and men were wise enough to listen."
  - Chapter 1: The Herbs
  - Chapter 2: The Collection
  - Chapter 3: The Ceremony
  - Chapter 4: The Running
  - Chapter 5: The Merchant
  - Chapter 6: The Guardian
  - Chapter 7: The Growing
  - Chapter 8: The Hunting
  - Chapter 9: The Departure
  - Chapter 10: The Knower

PART II: THE WAKING
  Epigraph: "To learn what you are, first you must lose everything you were."
  - Chapter 11: The Still Lakes
  - Chapter 12: The Beautiful Things
  - Chapter 13: The Riverbed
  - Chapter 14: The Bond
  - Chapter 15: The Leaving
  - Chapter 16: The Core
  - Chapter 17: The Forgetting
  - Chapter 18: The Cost
  - Chapter 19: The Forge
  - Chapter 20: The Guide
  - Chapter 21: The Three Futures
  - Chapter 22: The Name

PART III: THE BREAKING
  Epigraph: "The world does not ask if you are ready. It asks if you are willing."
  - Chapter 23: The Ascent
  - Chapter 24: The Birthplace
  - Chapter 25: The Training
  - Chapter 26: The Five Voices
  - Chapter 27: The Demolition
  - Chapter 28: The Truth
  - Chapter 29: The Camp
  - Chapter 30: The Beach
  - Chapter 31: The Dead Zone
  - Chapter 32: The Trap
  - Chapter 33: The Wall
  - Chapter 34: The Ledge

PART IV: THE CHAMBER
  Epigraph: "He who takes everything possesses nothing. He who gives everything becomes everything."
  - Chapter 35: The Chamber
  - Chapter 36: The Arrival
  - Chapter 37: The Throne Room
  - Chapter 38: Reserve Supply 7
  - Chapter 39: The Conduit
  - Chapter 40: The Song
  - Chapter 41: The Cost
  - Chapter 42: The Blue Feather

PART V: THE REMEMBERING
  Epigraph: "The world sings to itself, and men are wise enough to listen."
  - Chapter 43: The Morning After
  - Chapter 44: The Unfinished Sentence
  - Chapter 45: The Warden
  - Chapter 46: The Ceremony
  - Chapter 47: The Last God
  - Chapter 48: The Breath

EPILOGUE — "The Sixth Sound"

BACK MATTER
  - Acknowledgments (write these!)
  - About the Author
  - "Coming Soon" page for Book 2 (optional but recommended)
```

### Copyright Page Template

```
Man Amongst the Clouds

Copyright © 2026 by Justin Cronk

All rights reserved. No part of this book may be reproduced in any form
or by any electronic or mechanical means, including information storage
and retrieval systems, without written permission from the author, except
for the use of brief quotations in a book review.

This is a work of fiction. Names, characters, places, and incidents either
are the product of the author's imagination or are used fictitiously. Any
resemblance to actual persons, living or dead, events, or locales is
entirely coincidental.

First Edition: [Month] 2026

ISBN [Ebook]: [YOUR ISBN]
ISBN [Paperback]: [YOUR ISBN]
ISBN [Hardcover]: [YOUR ISBN]

Published by [Your Imprint Name or "Justin Cronk"]

Cover design by [Designer Name]
Interior design by [Your Name or "Formatted with Vellum"]

www.[yourwebsite].com
```

### Dedication Page
Up to you. Some options to consider:
- A person (family, friend, mentor)
- A concept ("For everyone who was raised on silence")
- A line from the book ("For the boy who held the feather")
- Keep it simple. One line is often more powerful than a paragraph.

---

## Print Specifications

### Paperback (KDP + IngramSpark)
- **Trim:** 6" x 9"
- **Paper:** Cream/off-white (standard for fiction — white is harsh for long reads)
- **Cover finish:** Matte (literary feel) — NOT glossy
- **Binding:** Perfect bound (standard paperback)
- **Bleed:** No interior bleed needed (text only, no full-page images)

### Hardcover (IngramSpark only)
- **Trim:** 6" x 9"
- **Case type:** Case laminate (image printed directly on boards) OR dust jacket
- **Paper:** Cream
- **Recommendation:** Case laminate is more durable and looks premium. Dust jackets are traditional but more expensive and fragile.

### Ebook
- **Format:** EPUB (Vellum exports this natively)
- **DRM:** OFF (readers hate DRM; it doesn't prevent piracy; it only frustrates legitimate buyers)
- **Price:** $5.99

---

## Pre-Flight Checklist Before Upload

- [ ] Proofread complete (human proofreader)
- [ ] ISBNs purchased and assigned (one per format)
- [ ] Cover files received (ebook + paperback + hardcover)
- [ ] Interior formatted in Vellum (ebook EPUB + print PDF)
- [ ] Copyright page filled in with correct ISBNs
- [ ] Back-cover blurb finalized
- [ ] Amazon book description written (HTML formatted)
- [ ] Categories selected (3)
- [ ] Keywords selected (7)
- [ ] Author bio written
- [ ] Goodreads author page claimed
- [ ] Pricing set (ebook $5.99 / paperback $18.99 / hardcover $28.99)
- [ ] Pre-order set up (2-4 weeks before release)
- [ ] ARC copies sent (20-50 readers)
- [ ] Launch day plan ready
