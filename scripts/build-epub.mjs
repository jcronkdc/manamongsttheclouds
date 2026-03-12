/**
 * Build an EPUB of Part One: The Still Water from the markdown chapters.
 * Run: node scripts/build-epub.mjs
 * Output: public/matc-part-one.epub
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import archiver from "archiver";
import { createWriteStream } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CHAPTERS_DIR = join(ROOT, "content", "chapters");
const OUTPUT = join(ROOT, "public", "matc-part-one.epub");
const COVER_SRC = join(ROOT, "public", "cover-part-one.jpg");
const GLOSSARY_SRC = join(ROOT, "content", "glossary.md");

const CHAPTER_META = [
  { title: "The Herbs", pov: "Aelo" },
  { title: "The Collection", pov: "The Knife" },
  { title: "The Blue Sun", pov: "Aelo" },
  { title: "The Running", pov: "Aelo" },
  { title: "The Merchant", pov: "Sereth" },
  { title: "The History", pov: "Jalo" },
  { title: "The Growing", pov: "Aelo" },
  { title: "The Patrol", pov: "The Knife" },
  { title: "The Flood", pov: "Aelo" },
  { title: "The Report", pov: "The Knife" },
];

function mdToXhtml(md) {
  let text = md
    // strip Part One header + epigraph that only appears in ch1
    .replace(/^# PART ONE:.*?\n\n/s, "")
    .replace(/^_"In the time before.*?"_\s*\n\n---\s*\n\n/s, "")
    // strip prologue heading + title + divider
    .replace(/^# PROLOGUE\s*\n\n## .+?\s*\n\n---\s*\n\n/s, "")
    // strip chapter heading + title + divider
    .replace(/^# Chapter \d+\s*\n\n## .+?\s*\n\n---\s*\n\n/s, "")
    .trim();

  // Convert --- to <hr/>
  text = text.replace(/\n---\n/g, "\n<hr/>\n");

  // Convert _text_ to <em>
  text = text.replace(/(?<!\w)_([^_]+)_(?!\w)/g, "<em>$1</em>");

  // Split into paragraphs
  const paragraphs = text.split(/\n\n+/);
  const html = paragraphs
    .map((p) => {
      const trimmed = p.trim();
      if (!trimmed) return "";
      if (trimmed === "<hr/>") return "<hr/>";
      if (trimmed.startsWith("<")) return trimmed;
      return `<p>${trimmed}</p>`;
    })
    .filter(Boolean)
    .join("\n");

  return html;
}

function mdToGlossaryXhtml(md) {
  const lines = md.split("\n");
  const out = [];
  let inTable = false;
  let tableRows = [];

  function flushTable() {
    if (tableRows.length < 2) {
      inTable = false;
      tableRows = [];
      return;
    }
    const headers = tableRows[0];
    const dataRows = tableRows.slice(2); // skip separator row
    let t =
      '<table style="width:100%;border-collapse:collapse;margin:1em 0;font-size:0.9em;">';
    t += "<thead><tr>";
    for (const h of headers)
      t += `<th style="text-align:left;border-bottom:1px solid #ccc;padding:0.4em 0.6em;">${inline(h.trim())}</th>`;
    t += "</tr></thead><tbody>";
    for (const row of dataRows) {
      t += "<tr>";
      for (const cell of row)
        t += `<td style="border-bottom:1px solid #eee;padding:0.4em 0.6em;vertical-align:top;">${inline(cell.trim())}</td>`;
      t += "</tr>";
    }
    t += "</tbody></table>";
    out.push(t);
    inTable = false;
    tableRows = [];
  }

  function inline(s) {
    return s
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(?<!\w)_([^_]+)_(?!\w)/g, "<em>$1</em>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>");
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Table detection
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      if (!inTable) inTable = true;
      const cells = trimmed.split("|").slice(1, -1);
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      flushTable();
    }

    if (!trimmed) continue;
    if (trimmed === "---") {
      out.push("<hr/>");
      continue;
    }
    if (trimmed.startsWith("# ")) {
      out.push(`<h1>${inline(trimmed.slice(2))}</h1>`);
      continue;
    }
    if (trimmed.startsWith("## ")) {
      out.push(`<h2>${inline(trimmed.slice(3))}</h2>`);
      continue;
    }
    if (trimmed.startsWith("### ")) {
      out.push(`<h3>${inline(trimmed.slice(4))}</h3>`);
      continue;
    }
    if (trimmed.startsWith("- **")) {
      out.push(
        `<p style="text-indent:0;margin:0.5em 0;">${inline(trimmed.slice(2))}</p>`,
      );
      continue;
    }
    if (trimmed.startsWith("- ")) {
      out.push(
        `<p style="text-indent:0;margin:0.3em 0 0.3em 1.5em;">${inline(trimmed.slice(2))}</p>`,
      );
      continue;
    }
    if (/^\d+\.\s/.test(trimmed)) {
      out.push(
        `<p style="text-indent:0;margin:0.3em 0 0.3em 1.5em;">${inline(trimmed)}</p>`,
      );
      continue;
    }
    out.push(`<p style="text-indent:0">${inline(trimmed)}</p>`);
  }
  if (inTable) flushTable();
  return out.join("\n");
}

function buildPrologueXhtml(title, bodyHtml) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Prologue: ${title}</title>
  <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
  <h2>Prologue</h2>
  <h3>${title}</h3>
  <hr/>
  ${bodyHtml}
</body>
</html>`;
}

function buildChapterXhtml(num, title, bodyHtml) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Chapter ${num}: ${title}</title>
  <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
  <h2>Chapter ${num}</h2>
  <h3>${title}</h3>
  <hr/>
  ${bodyHtml}
</body>
</html>`;
}

const titlePageXhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Man Amongst the Clouds — Part One: The Still Water</title>
  <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
  <div class="title-page">
    <p class="series">Man Amongst the Clouds</p>
    <h1>Part One</h1>
    <h2>The Still Water</h2>
    <hr/>
    <p class="epigraph"><em>"In the time before the taking, the world sang to itself, and men were wise enough to listen."</em></p>
    <p class="author">Justin Cronk</p>
    <p class="publisher">Stillfire Press</p>
  </div>
</body>
</html>`;

const styleCSS = `body {
  font-family: Georgia, "Times New Roman", serif;
  line-height: 1.7;
  margin: 1em;
  color: #222;
}
h1 { font-size: 2em; font-weight: 300; margin-bottom: 0.2em; text-align: center; }
h2 { font-size: 1.4em; font-weight: 300; margin-bottom: 0.5em; text-align: center; color: #555; }
h3 { font-size: 1.2em; font-weight: 400; margin-bottom: 1em; text-align: center; font-style: italic; }
hr { border: none; border-top: 1px solid #ccc; margin: 2em auto; width: 30%; }
p { margin: 0.8em 0; text-indent: 1.5em; }
p:first-of-type { text-indent: 0; }
em { font-style: italic; }
.title-page { text-align: center; margin-top: 30%; }
.title-page h1 { font-size: 2.5em; margin-bottom: 0.1em; }
.title-page h2 { font-size: 1.6em; color: #8b7332; }
.title-page .series { font-size: 0.8em; letter-spacing: 0.3em; text-transform: uppercase; color: #999; margin-bottom: 2em; }
.title-page .epigraph { font-size: 0.9em; color: #777; max-width: 80%; margin: 2em auto; text-indent: 0; }
.title-page .author { font-size: 1em; margin-top: 2em; letter-spacing: 0.15em; text-indent: 0; }
.title-page .publisher { font-size: 0.8em; color: #999; margin-top: 3em; letter-spacing: 0.2em; text-indent: 0; }
`;

const tocNcx = (chapters) => `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="matc-part-one-2026"/>
  </head>
  <docTitle><text>Man Amongst the Clouds — Part One: The Still Water</text></docTitle>
  <navMap>
    <navPoint id="title" playOrder="1">
      <navLabel><text>Title Page</text></navLabel>
      <content src="title.xhtml"/>
    </navPoint>
    <navPoint id="prologue" playOrder="2">
      <navLabel><text>Prologue: The First Song</text></navLabel>
      <content src="prologue.xhtml"/>
    </navPoint>
${chapters
  .map(
    (c, i) => `    <navPoint id="ch${i + 1}" playOrder="${i + 3}">
      <navLabel><text>Chapter ${i + 1}: ${c.title}</text></navLabel>
      <content src="chapter_${String(i + 1).padStart(2, "0")}.xhtml"/>
    </navPoint>`,
  )
  .join("\n")}
    <navPoint id="glossary" playOrder="${chapters.length + 3}">
      <navLabel><text>Reader's Glossary</text></navLabel>
      <content src="glossary.xhtml"/>
    </navPoint>
  </navMap>
</ncx>`;

const contentOpf = (chapters) => `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="uid" version="3.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="uid">matc-part-one-2026</dc:identifier>
    <dc:title>Man Amongst the Clouds — Part One: The Still Water</dc:title>
    <dc:creator>Justin Cronk</dc:creator>
    <dc:language>en</dc:language>
    <dc:publisher>Stillfire Press</dc:publisher>
    <dc:rights>© 2026 Justin Cronk. All rights reserved.</dc:rights>
    <meta property="dcterms:modified">${new Date().toISOString().split("T")[0]}T00:00:00Z</meta>
    <meta name="cover" content="cover-image"/>
  </metadata>
  <manifest>
    <item id="style" href="style.css" media-type="text/css"/>
    <item id="cover-image" href="cover.jpg" media-type="image/jpeg" properties="cover-image"/>
    <item id="title-page" href="title.xhtml" media-type="application/xhtml+xml"/>
    <item id="prologue" href="prologue.xhtml" media-type="application/xhtml+xml"/>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
${chapters
  .map(
    (_, i) =>
      `    <item id="ch${i + 1}" href="chapter_${String(i + 1).padStart(2, "0")}.xhtml" media-type="application/xhtml+xml"/>`,
  )
  .join("\n")}
    <item id="glossary" href="glossary.xhtml" media-type="application/xhtml+xml"/>
  </manifest>
  <spine toc="ncx">
    <itemref idref="title-page"/>
    <itemref idref="prologue"/>
${chapters.map((_, i) => `    <itemref idref="ch${i + 1}"/>`).join("\n")}
    <itemref idref="glossary"/>
  </spine>
</package>`;

// --- Build ---

console.log("Building EPUB...");

const archive = archiver("zip", { zlib: { level: 9 } });
const output = createWriteStream(OUTPUT);

archive.pipe(output);

// mimetype must be first, uncompressed
archive.append("application/epub+zip", { name: "mimetype", store: true });

// META-INF/container.xml
archive.append(
  `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`,
  { name: "META-INF/container.xml" },
);

// OEBPS/style.css
archive.append(styleCSS, { name: "OEBPS/style.css" });

// OEBPS/title.xhtml
archive.append(titlePageXhtml, { name: "OEBPS/title.xhtml" });

// Cover image
const coverData = readFileSync(COVER_SRC);
archive.append(coverData, { name: "OEBPS/cover.jpg" });

// Prologue
const prologueMd = readFileSync(join(CHAPTERS_DIR, "prologue.md"), "utf-8");
const prologueHtml = mdToXhtml(prologueMd);
const prologueXhtml = buildPrologueXhtml("The First Song", prologueHtml);
archive.append(prologueXhtml, { name: "OEBPS/prologue.xhtml" });

// Chapter files
for (let i = 0; i < 10; i++) {
  const mdPath = join(
    CHAPTERS_DIR,
    `chapter_${String(i + 1).padStart(2, "0")}.md`,
  );
  const md = readFileSync(mdPath, "utf-8");
  const bodyHtml = mdToXhtml(md);
  const xhtml = buildChapterXhtml(i + 1, CHAPTER_META[i].title, bodyHtml);
  archive.append(xhtml, {
    name: `OEBPS/chapter_${String(i + 1).padStart(2, "0")}.xhtml`,
  });
}

// Glossary
const glossaryMd = readFileSync(GLOSSARY_SRC, "utf-8");
const glossaryHtml = mdToGlossaryXhtml(glossaryMd);
const glossaryXhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Reader's Glossary</title>
  <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
  ${glossaryHtml}
</body>
</html>`;
archive.append(glossaryXhtml, { name: "OEBPS/glossary.xhtml" });

// toc.ncx
archive.append(tocNcx(CHAPTER_META), { name: "OEBPS/toc.ncx" });

// content.opf
archive.append(contentOpf(CHAPTER_META), { name: "OEBPS/content.opf" });

output.on("close", () => {
  console.log(
    `EPUB built: ${OUTPUT} (${(archive.pointer() / 1024).toFixed(1)} KB)`,
  );
});

archive.finalize();
