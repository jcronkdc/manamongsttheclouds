"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import Link from "next/link";

const PASSAGES = [
  {
    text: "I didn\u2019t want to be a monster. I wanted to hear the music.",
    speaker: "King Varas",
    chapter: "Chapter 37",
  },
  {
    text: "You were never nothing. You are the Song.",
    speaker: "Jalo",
    chapter: "Chapter 33",
  },
  {
    text: "Magic is not energy. It is not force. It is memory.",
    speaker: null,
    chapter: "Prologue",
  },
  {
    text: "He held it for eleven seconds. He counted.",
    speaker: null,
    chapter: "Chapter 2",
  },
  {
    text: "The world remembers everything. Every stone remembers the mountain it was part of.",
    speaker: null,
    chapter: "Prologue",
  },
  {
    text: "I am the wall between the fire and the song. I will burn before the song goes silent.",
    speaker: "The Vael Guard Oath",
    chapter: "Chapter 6",
  },
  { text: "You sound like her.", speaker: "Jalo", chapter: "Chapter 4" },
  {
    text: "The Song isn\u2019t a technique. It\u2019s love made audible.",
    speaker: "Sereth",
    chapter: "Chapter 39",
  },
  {
    text: "I don\u2019t care about getting them back. I care about him not having them.",
    speaker: "The Knife",
    chapter: "Chapter 38",
  },
  {
    text: "The world makes beautiful things out of broken ones.",
    speaker: "The Knife",
    chapter: "Chapter 42",
  },
  {
    text: "She died holding a note that sounded like a lullaby.",
    speaker: null,
    chapter: "Chapter 24",
  },
  {
    text: "I collect orphans the way other people collect regrets. Perhaps they are the same thing.",
    speaker: "Sereth",
    chapter: "Chapter 15",
  },
  {
    text: "What would you give up to hear the world speak?",
    speaker: null,
    chapter: null,
  },
  { text: "He is worth the grief.", speaker: "Sereth", chapter: "Chapter 15" },
  {
    text: "The world sang to itself, and men were wise enough to listen.",
    speaker: null,
    chapter: "Epigraph",
  },
  {
    text: "Stopping is silence. And silence is all I\u2019ve ever known.",
    speaker: "King Varas",
    chapter: "Chapter 37",
  },
  {
    text: "I chose before you started. I chose when I heard the Elder Stone sing. I chose when I held the dead bird and cried.",
    speaker: "Aelo",
    chapter: "Chapter 21",
  },
  {
    text: "Beautiful things should be held by people who know how to hold them.",
    speaker: "The Knife",
    chapter: "Chapter 42",
  },
];

export default function ShareClient() {
  const [selected, setSelected] = useState(0);
  const [custom, setCustom] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generated, setGenerated] = useState<string | null>(null);

  const passage = useMemo(
    () =>
      useCustom
        ? { text: custom, speaker: null, chapter: null }
        : PASSAGES[selected],
    [useCustom, custom, selected],
  );

  const generate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1080;
    canvas.height = 1080;

    // Background
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, 1080, 1080);

    // Subtle gold glow
    const grd = ctx.createRadialGradient(540, 540, 100, 540, 540, 500);
    grd.addColorStop(0, "rgba(201, 168, 76, 0.06)");
    grd.addColorStop(1, "rgba(201, 168, 76, 0)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 1080, 1080);

    // Gold border
    ctx.strokeStyle = "rgba(201, 168, 76, 0.3)";
    ctx.lineWidth = 1;
    ctx.strokeRect(60, 60, 960, 960);

    // Inner border
    ctx.strokeStyle = "rgba(201, 168, 76, 0.15)";
    ctx.strokeRect(72, 72, 936, 936);

    // Quote marks
    ctx.fillStyle = "rgba(201, 168, 76, 0.2)";
    ctx.font = "200px Georgia";
    ctx.textAlign = "center";
    ctx.fillText("\u201C", 540, 260);

    // Quote text — word wrap
    ctx.fillStyle = "#ededed";
    ctx.font = "italic 36px Georgia";
    ctx.textAlign = "center";

    const words = passage.text.split(" ");
    const lines: string[] = [];
    let currentLine = "";
    const maxWidth = 760;

    for (const word of words) {
      const test = currentLine ? currentLine + " " + word : word;
      if (ctx.measureText(test).width > maxWidth) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = test;
      }
    }
    if (currentLine) lines.push(currentLine);

    const lineHeight = 52;
    const totalHeight = lines.length * lineHeight;
    const startY = 540 - totalHeight / 2 + 40;

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], 540, startY + i * lineHeight);
    }

    // Attribution
    if (passage.speaker) {
      ctx.fillStyle = "rgba(201, 168, 76, 0.7)";
      ctx.font = "24px Georgia";
      ctx.fillText(`\u2014 ${passage.speaker}`, 540, startY + totalHeight + 50);
    }

    // Chapter
    if (passage.chapter) {
      ctx.fillStyle = "rgba(138, 138, 138, 0.5)";
      ctx.font = "16px sans-serif";
      ctx.fillText(
        passage.chapter,
        540,
        startY + totalHeight + (passage.speaker ? 90 : 50),
      );
    }

    // Title at bottom
    ctx.fillStyle = "rgba(201, 168, 76, 0.5)";
    ctx.font = "600 14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("M A N   A M O N G S T   T H E   C L O U D S", 540, 940);

    ctx.fillStyle = "rgba(138, 138, 138, 0.4)";
    ctx.font = "12px sans-serif";
    ctx.fillText("by Justin Cronk  \u2022  manamongsttheclouds.com", 540, 968);

    setGenerated(canvas.toDataURL("image/png"));
  }, [passage]);

  const download = () => {
    if (!generated) return;
    const a = document.createElement("a");
    a.href = generated;
    a.download = "man-amongst-the-clouds-quote.png";
    a.click();
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#ededed] py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-12 text-[#c9a84c] font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase hover:text-[#e8c85a] transition-colors"
        >
          &larr; Back to Home
        </Link>

        <h1 className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl font-light tracking-wide mb-4 text-center">
          Share the Song
        </h1>
        <p className="font-[family-name:var(--font-serif)] text-center text-[#8a8a8a] italic mb-12">
          Select a passage. Generate a card. Share it everywhere.
        </p>

        {/* Toggle */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setUseCustom(false)}
            className={`px-6 py-2 font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase transition-colors ${!useCustom ? "bg-[#c9a84c] text-[#0a0a0a]" : "border border-[#333] text-[#8a8a8a] hover:border-[#c9a84c]"}`}
          >
            Featured Passages
          </button>
          <button
            onClick={() => setUseCustom(true)}
            className={`px-6 py-2 font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase transition-colors ${useCustom ? "bg-[#c9a84c] text-[#0a0a0a]" : "border border-[#333] text-[#8a8a8a] hover:border-[#c9a84c]"}`}
          >
            Custom Quote
          </button>
        </div>

        {/* Selection */}
        {!useCustom ? (
          <div className="grid grid-cols-1 gap-3 mb-8 max-h-[400px] overflow-y-auto pr-2">
            {PASSAGES.map((p, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`text-left p-4 border transition-colors ${i === selected ? "border-[#c9a84c] bg-[#c9a84c]/5" : "border-[#222] hover:border-[#444]"}`}
              >
                <p className="font-[family-name:var(--font-serif)] text-sm italic text-[#bbb] leading-relaxed">
                  &ldquo;{p.text}&rdquo;
                </p>
                <p className="font-[family-name:var(--font-sans)] text-xs text-[#555] mt-2">
                  {p.speaker ? `${p.speaker} \u2022 ` : ""}
                  {p.chapter || ""}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <textarea
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="Paste or type any passage from the book..."
            className="w-full h-32 p-4 bg-[#1a1a1a] border border-[#333] text-[#ededed] font-[family-name:var(--font-serif)] text-sm italic placeholder:text-[#555] focus:border-[#c9a84c] focus:outline-none transition-colors resize-none mb-8"
          />
        )}

        {/* Generate */}
        <div className="text-center mb-8">
          <button
            onClick={generate}
            disabled={useCustom && !custom.trim()}
            className="px-10 py-3 bg-[#c9a84c] text-[#0a0a0a] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:bg-[#e8c85a] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Generate Card
          </button>
        </div>

        {/* Canvas (hidden) */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Preview + Download */}
        {generated && (
          <div className="text-center">
            <div className="border border-[#222] inline-block mb-6">
              <img
                src={generated}
                alt="Share card"
                className="max-w-full w-[540px]"
              />{" "}
              {/* eslint-disable-line @next/next/no-img-element */}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={download}
                className="px-8 py-3 bg-[#c9a84c] text-[#0a0a0a] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:bg-[#e8c85a] transition-colors"
              >
                Download Image
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    fetch(generated)
                      .then((r) => r.blob())
                      .then((blob) => {
                        const file = new File(
                          [blob],
                          "man-amongst-the-clouds.png",
                          { type: "image/png" },
                        );
                        navigator.share({
                          files: [file],
                          title: "Man Amongst the Clouds",
                          text: passage.text,
                        });
                      });
                  }
                }}
                className="px-8 py-3 border border-[#c9a84c]/40 text-[#c9a84c] font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase hover:border-[#c9a84c] hover:bg-[#c9a84c]/10 transition-colors"
              >
                Share
              </button>
            </div>
            <p className="font-[family-name:var(--font-sans)] text-xs text-[#444] mt-4">
              1080&times;1080 &bull; Perfect for Instagram, Twitter, Facebook,
              TikTok
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
