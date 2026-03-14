export default function SEOArticle() {
  return (
    <article
      className="py-16 sm:py-20 px-5 sm:px-6 border-t border-[#1a1a1a]"
      itemScope
      itemType="https://schema.org/Article"
    >
      <div className="max-w-2xl mx-auto">
        <p className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]/50 text-center mb-6">
          About This Novel
        </p>
        <h2
          className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-light tracking-wide text-center mb-10"
          itemProp="headline"
        >
          Man Amongst the Clouds &mdash; A New Epic Fantasy for 2026
        </h2>

        <div className="font-[family-name:var(--font-serif)] text-sm sm:text-base leading-[1.9] text-[#999] space-y-5">
          <p>
            <strong className="text-[#c4beb4]">
              Man Amongst the Clouds
            </strong>{" "}
            is a 153,000-word epic literary fantasy novel by{" "}
            <span itemProp="author">Justin Cronk</span>, published by Stillfire
            Press in 2026. It is one of the most ambitious fantasy debuts of the
            year &mdash; a novel nine years in the making, featuring a
            memory-based magic system with seven disciplines, each exacting an
            irreversible personal cost.
          </p>
          <p>
            The novel follows Aelo, a boy raised on silence who discovers he can
            hear the world sing, and his guardian Jalo, whose every lie is an act
            of love. They are pursued by The Knife, an assassin who carries a
            wooden box of five beautiful objects as the only proof he was ever a
            person, sent by King Varas &mdash; a ruler born deaf to the Song who
            has spent seventy years draining others&rsquo; memories to fill his
            silence.
          </p>
          <p>
            For readers searching for{" "}
            <strong className="text-[#c4beb4]">
              the best new fantasy books of 2026
            </strong>
            , the{" "}
            <strong className="text-[#c4beb4]">
              best epic fantasy novels
            </strong>
            , or{" "}
            <strong className="text-[#c4beb4]">
              books like The Name of the Wind
            </strong>{" "}
            by Patrick Rothfuss,{" "}
            <strong className="text-[#c4beb4]">
              Assassin&rsquo;s Apprentice
            </strong>{" "}
            by Robin Hobb,{" "}
            <strong className="text-[#c4beb4]">Tigana</strong> by Guy Gavriel
            Kay, or{" "}
            <strong className="text-[#c4beb4]">A Wizard of Earthsea</strong> by
            Ursula K. Le Guin &mdash; Man Amongst the Clouds was written for
            you.
          </p>
          <p>
            The magic system is built on a single premise:{" "}
            <em className="text-[#c4beb4]">magic is memory</em>. Every stone
            remembers the mountain it was part of. Every flame remembers the
            first spark. Seven disciplines &mdash; The Know, The Mold, The Heal,
            The Move, The Guide, The Burn, and The Sing &mdash; each offer a
            different way of hearing the world&rsquo;s memory, and each costs
            something personal and irreversible. The Know costs your emotional
            boundaries. The Heal transfers every wound into your body. The Sing
            costs everything.
          </p>
          <p>
            The novel is published in five serialized parts: Part&nbsp;I: The
            Still Water (available now &mdash; free to read online), Part&nbsp;II:
            The Waking, Part&nbsp;III: The Breaking, Part&nbsp;IV: The Chamber,
            and Part&nbsp;V: The Remembering. The complete novel spans 48
            chapters with a prologue and epilogue.
          </p>
          <p>
            Man Amongst the Clouds is{" "}
            <strong className="text-[#c4beb4]">
              epic fantasy in scope, literary fiction in voice
            </strong>
            . It features world-altering stakes, seven distinct regions, a fully
            realized magic system, and a quest structure &mdash; but the emotional
            engine is the intimate relationship between a guardian and the boy he
            raised. The climax is a man fighting a castle with a staff so his son
            can walk through a door.
          </p>
          <p>
            The manuscript is blockchain-verified on the Polygon network as proof
            of human authorship. Every word is Justin Cronk&rsquo;s. The magic
            system draws from Traditional Chinese Medicine&rsquo;s Five Element
            Theory, alchemical spagyrics, herbalism, and nine years of obsessive
            research. Published by Stillfire Press &mdash; an indie press where
            97% of every sale goes directly to the author.
          </p>
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://stillfirepress.com/read/matc"
            className="inline-block px-8 py-3 border border-[#c9a84c]/30 text-[#c9a84c] font-[family-name:var(--font-sans)] text-xs tracking-widest uppercase hover:border-[#c9a84c] hover:bg-[#c9a84c]/5 transition-all duration-300"
          >
            Read Part One Free
          </a>
        </div>
      </div>
    </article>
  );
}
