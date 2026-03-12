export type Category =
  | "characters"
  | "magic"
  | "regions"
  | "creatures"
  | "organizations"
  | "herbs"
  | "objects"
  | "terms";

export interface WorldEntry {
  name: string;
  category: Category;
  subtitle?: string;
  summary: string;
  detail?: string;
  meta?: Record<string, string>;
}

export const categories: { key: Category; label: string }[] = [
  { key: "characters", label: "Characters" },
  { key: "magic", label: "Magic" },
  { key: "regions", label: "Regions" },
  { key: "creatures", label: "Creatures" },
  { key: "organizations", label: "Orders & Forces" },
  { key: "herbs", label: "Herbs & Healing" },
  { key: "objects", label: "Objects" },
  { key: "terms", label: "Terms & Phrases" },
];

export const entries: WorldEntry[] = [
  // ─── CHARACTERS ────────────────────────────────────────
  {
    name: "Aelo",
    category: "characters",
    subtitle: "The Boy Who Hears",
    summary:
      'A small, underfed boy of fifteen living in a forgotten village at the edge of the Canopy. The name means "breath of remembering" in the old tongue.',
    detail:
      "Small for his age — shorter than every boy by a head, thin enough to count ribs through his shirt. Angular face with sharp cheekbones and wide-set dark eyes that absorb attention rather than reflecting it. He moves carefully, takes up less space than he needs to, as if he has been practicing the art of being small for so long it has become structural. On the inside of his left wrist, barely visible in most light, an amber mark he has had as long as he can remember. He does not know what it is. He eats porridge every morning that makes the world quieter. He has never known the world at full volume.",
  },
  {
    name: "Jalo Soturi",
    category: "characters",
    subtitle: "The Guardian",
    summary:
      'Aelo\u2019s caretaker. A limping, scarred man known in the village as a passable healer and a steady drinker. His name means "noble warrior."',
    detail:
      "Broad-shouldered, heavy-framed, with the build of someone who was once powerful. His left knee grinds with every step \u2014 tap-step-drag, tap-step-drag. Half his face is wrapped in stained linen. The visible half is weathered, ordinary. The hidden half is not. His grey-green eyes hold a quality of permanent, lopsided grief when both sides are visible. He carries a cane of dark wood carved with marks that glow faintly in certain light. He says the marks are decorative. They are not decorative. He drinks root wine in the evenings \u2014 not recklessly, but with the precise calculation of a man who knows exactly how much numbness he requires to get through the night.",
  },
  {
    name: "The Knife",
    category: "characters",
    subtitle: "The King\u2019s Weapon",
    summary:
      "The King\u2019s enforcer. Tall, lean, fast. Born Baara \u2014 a sound without meaning in any known language. He carries a single smooth stone as his weapon.",
    detail:
      "Constructed for speed rather than force. Angular face, dark watchful eyes, a mouth that defaults to a line so straight it appears drawn. He had killed eleven men before his fifteenth birthday. He keeps a wooden box under his cot containing five objects: a blue feather from a bird he saw in the Canopy at nine, a smooth river stone from Bahar, a piece of sea glass green as springtime, a dried flower from a crack in the prison floor, and a scrap of cloth from a woman who smiled at him once. He does not know why he keeps them. He has begun to forget things \u2014 small things, without pattern, without explanation. He holds the feather for eleven seconds each morning, counted against his pulse.",
  },
  {
    name: "King Varas",
    category: "characters",
    subtitle: "The Deaf King",
    summary:
      "The ruler of the realm. No one alive has seen him clearly in over a decade. He speaks softly. He is unfailingly polite. He is the most dangerous person in the world.",
    detail:
      "His skin has thickened over decades, darkened, taken on a texture closer to bark than flesh. His eyes are the color of Elder Stone: flat, lightless amber. He is connected to his obsidian throne by Blood Vine that runs from the armrests into his forearms, from the seat into his spine. Born without the ability to hear the Song in a world where everything sings, he discovered the Drain \u2014 the process of forcibly ripping memory from others \u2014 and for half a second felt what everyone else feels. That half-second is his addiction. He tells himself he is a god. He is a deaf man in a concert hall, stealing instruments he cannot play.",
  },
  {
    name: "Sereth",
    category: "characters",
    subtitle: "The Snake",
    summary:
      "A figure from the oldest stories. An information broker who appears in every region under a different name and a different face. She sells information to everyone and loyalty to no one.",
    detail:
      "She has no fixed appearance \u2014 dozens of faces, each complete, each native. Beneath them, her eyes are the constant: a depth that does not belong to the body around them, as if the person behind the eyes has been watching the world for longer than the world has been watching itself. She is aging \u2014 actually aging, from the inside. She has lost two teeth in the last century. She bruises easily. She gets cold. She fell in love once, centuries ago, with a mortal woman named Essa \u2014 a Healer of the Sea People. They lived together for forty years. She has not loved since.",
  },
  {
    name: "Queen Maera",
    category: "characters",
    subtitle: "A Cloud Singer of the Old Kingdom",
    summary:
      "Wife of King Aldric. A Cloud Singer who could hold five disciplines simultaneously in a single throat \u2014 a feat no one else alive could match.",
    detail:
      "There are no portraits \u2014 the histories were burned. Those who knew her agree she was beautiful in the way singers are beautiful: not in the arrangement of features but in the quality of presence, the sense that the woman before you was producing a sound even when silent. Slight, dark-haired, with quick hands and an internal rhythm. She used her gift not as a weapon but to grow flowers \u2014 a living archive of blooming at the Cloud Palace, each petal carrying the memory of every petal before it. She sang an old lullaby to her children, passed down through generations of Cloud Singers.",
  },
  {
    name: "King Aldric",
    category: "characters",
    subtitle: "The Entombed Father",
    summary:
      "A just king who ruled the Cloud Kingdom before its fall. He possessed the Know and believed magic was a shared resource.",
    detail:
      "Tall, thin, the opposite of Varas in every way \u2014 light, moving, leaning forward. Grey-green eyes that carried the depth of someone who has felt too many truths. He ruled from a garden more often than a throne room. He was not a strong king. He was a good one. He loved both his sons. He failed one of them \u2014 not through cruelty but through fear.",
  },
  {
    name: "Prince Vero",
    category: "characters",
    subtitle: "A Prince of the Cloud Kingdom",
    summary:
      "Kind, open, and said to carry a faint echo of the Song in his blood.",
    detail:
      "Everything Varas was not. He was joyful, open, instinctively generous. Their father\u2019s love for him was obvious and devastating to Varas.",
  },
  {
    name: "Mira",
    category: "characters",
    subtitle: "The Silent Monk",
    summary:
      "A warrior-monk of the Pure Ones. Seventy years old. She has not spoken in twenty years and teaches through gesture and demonstration.",
    detail:
      "Moves like water. Small \u2014 smaller than Aelo \u2014 with a frame refined by decades of discipline into something that is less a body than a statement. Her face is lined deeply, etched into a quality of carved wood, as if the forest she serves has been slowly Molding her into its own image. Her silence is not a vow \u2014 it is a consequence. She Knew someone once, too deeply, and their personality overwrote part of hers. She is no longer certain which words are her own.",
  },
  {
    name: "Torvus",
    category: "characters",
    subtitle: "The Numb Giant",
    summary:
      "A Molder who lives alone in a cavern he carved himself over forty years. Enormous, gregarious, and completely numb from the shoulders down.",
    detail:
      "The largest human being most people have ever seen \u2014 not tall, but wide, the way tree trunks are wide. His face is in constant motion: every emotion produced immediately, without edit. Limestone-pale skin. Small, bright eyes \u2014 the last fully sensate things in a body going progressively numb. He cannot feel anything below his ears. His tongue remains, and he savors food with the intensity of someone who knows the savoring is finite. He laughs constantly, because the laugh is the only sensation he can still feel in his chest. He married a woman named Bren, a Molder who died twelve years ago. He carved her likeness from memory, and discovered the stone wants to hold the shape of the people we love.",
  },
  {
    name: "Laine",
    category: "characters",
    subtitle: "The Sea Guide",
    summary:
      "A young woman of the Sea People and a rare Guide who can sense the trajectory of the future. She is terrified of her own gift.",
    detail:
      "Early twenties, dark-skinned, compact Sea People build. Short dark hair, calloused hands from rope and net. Her eyes carry a quality of distance that people mistake for dreaminess \u2014 she is not dreaming, she is seeing the faint shape of what comes next. She compensates with practicality: lists, direct sentences, organizational efficiency. She always knows which way the ocean is. She also knows which way the future is, and the future is the direction she tries hardest not to look.",
  },
  {
    name: "Essa",
    category: "characters",
    subtitle: "A Name From the Oldest Stories",
    summary: "A Healer of the Sea People, remembered as one who was deeply loved.",
    detail:
      "Dark-skinned, with hands that moved through water the way music moves through air. She could hold a bowl of seawater and ask it to remember being rain, and the salt would separate from the fresh. She lived for eighty-one years. Her death taught someone what memory meant to mortals: finite, fragile, unbearably precious.",
  },

  // ─── MAGIC ─────────────────────────────────────────────
  {
    name: "The Know",
    category: "magic",
    subtitle: "The First Discipline",
    summary:
      "Listening to the memory of living things \u2014 their truth, intent, emotion, and history.",
    detail:
      "A Knower can feel whether someone is lying. A powerful Knower can read the shape of a person\u2019s past by touching them. The greatest Knowers can feel the emotional residue left in places \u2014 the sorrow soaked into a battlefield, the joy embedded in a wedding hall.",
    meta: { cost: "Your emotional boundaries" },
  },
  {
    name: "The Mold",
    category: "magic",
    subtitle: "The Second Discipline",
    summary:
      "Speaking to stone, earth, metal, and wood \u2014 asking it to remember a different shape.",
    detail:
      "A Molder can reshape a wall into a doorway, coax iron into a blade without a forge, raise pillars from bedrock. The greatest Molders built the underground cities of the Core. You cannot Mold living flesh. You cannot Mold what you cannot touch or see.",
    meta: { cost: "The feeling in your hands" },
  },
  {
    name: "The Heal",
    category: "magic",
    subtitle: "The Third Discipline",
    summary:
      "Reminding flesh and bone of wholeness \u2014 what it was before the wound.",
    detail:
      "A Healer places hands on the wounded and listens to the body\u2019s memory of health. Bones knit. Skin closes. Poison is remembered as foreign and expelled. You cannot Heal death. You cannot Heal yourself \u2014 you cannot be both the listener and the speaker. This is the cruelest rule of Healing.",
    meta: { cost: "You carry every wound you mend" },
  },
  {
    name: "The Move",
    category: "magic",
    subtitle: "The Fourth Discipline",
    summary:
      "Asking space and air to remember a different arrangement of things.",
    detail:
      "Objects lifted, hurled, rearranged. A skilled Mover can redirect arrows in flight or hold a person immobile by asking the air around them to remember being solid. You cannot Move something you cannot perceive. Weight matters. You cannot Move magic itself.",
    meta: { cost: "Your sense of where you are" },
  },
  {
    name: "The Guide",
    category: "magic",
    subtitle: "The Fifth Discipline",
    summary:
      "Listening to the memory of paths \u2014 where things have been and where they are going.",
    detail:
      "A Guide always knows which direction they face. A skilled Guide can track a person across a continent. The greatest Guides can sense the trajectory of the future \u2014 not prophecy, but the world\u2019s momentum. The future is not fixed. Deliberate unpredictability clouds Guide-sight entirely.",
    meta: { cost: "Your memory of home" },
  },
  {
    name: "The Burn",
    category: "magic",
    subtitle: "The Sixth Discipline",
    summary:
      "Speaking to fire and heat \u2014 awakening the world\u2019s memory of the first flame.",
    detail:
      "Flame summoned from nothing. Temperatures raised or lowered \u2014 cold is the memory of fire\u2019s absence. Fire is hungry and remembers being fed. It always wants more. Burners who lose concentration are consumed by their own flame. This is the loneliest magic.",
    meta: { cost: "The warmth inside you" },
  },
  {
    name: "The Sing",
    category: "magic",
    subtitle: "The Rarest Discipline",
    summary:
      "Speaking to all memory at once. Harmony. The music the world makes when every memory resonates together.",
    detail:
      "No one alive has seen it in centuries. Legend says King Fletcher could Sing \u2014 and that the Great Elder Stone is a crystallized Song, a single perfect note frozen in time. To Sing is to pour your entire self into the world\u2019s memory. You don\u2019t lose specific memories \u2014 you lose yourself. Only those of Fletcher\u2019s bloodline can hear the Song.",
    meta: { cost: "Everything" },
  },
  {
    name: "The Drain",
    category: "magic",
    subtitle: "Stolen Magic",
    summary:
      "The process of forcibly ripping memory from a living person through Blood Vine and Elder Stones, then consuming it as fuel.",
    detail:
      "Stolen memory is corrupted \u2014 a memory given freely retains its shape and power, but a memory ripped away is damaged, like a page torn from a book. Each transfer degrades it further. Corrupted memory also corrupts the user physically, over time. It costs the practitioner nothing of themselves \u2014 they spend other people\u2019s memories instead. In a system where magic demands sacrifice, this is the cheat code, and it is destroying the one who uses it.",
  },
  {
    name: "The Weave",
    category: "magic",
    subtitle: "Desert Discipline",
    summary:
      "The art of braiding weak fragments of multiple disciplines together into something functional. Unique to the Desert People.",
    detail:
      "The most technically demanding form of magic in the world. It requires an intimacy with failure that only the Desert teaches. Practitioners from other regions cannot do it.",
  },
  {
    name: "The Greensong",
    category: "magic",
    subtitle: "Canopy Trance-Running",
    summary:
      "A form of trance-running where warriors synchronize their heartbeat with the forest\u2019s rhythm.",
    detail:
      "A Greensinger can travel at extraordinary speed for days without rest, moving through the forest as if the trees themselves carry them. Branches extend. Roots surface to form steps. They feel no hunger, no fatigue, no pain. When they stop, the debt hits all at once. A runner who goes a week will sleep for a month.",
  },

  // ─── REGIONS ───────────────────────────────────────────
  {
    name: "The Canopy",
    category: "regions",
    subtitle: "Lehti \u2014 Wood / Life",
    summary:
      "An ancient forest so vast the floor has not seen sunlight in centuries. Life is vertical. The forest floor is sacred, reserved for the dead.",
    detail:
      "People live in the mid-canopy, connected by rope bridges and carved stairways. Home of the Pure Ones, who follow a code of honor above survival, silence above speech, service above self. At age twelve, children descend to the forest floor in the Listening \u2014 they sit in the dark among the roots and the dead and try to hear the Know for the first time. The hardest region to subjugate: the forest itself resists intrusion.",
    meta: { magic: "The Know, The Greensong" },
  },
  {
    name: "The Core",
    category: "regions",
    subtitle: "Syv\u00e4 \u2014 Earth / Stone",
    summary:
      "The true Core is underground \u2014 cities carved deep beneath the crust, lit by bioluminescent fungi and crystal veins.",
    detail:
      "Practical, communal, loud. They value craft above all else. Meals are always eaten together; solitude is considered a mild form of illness. Arguments are settled by building contests. Core people are the largest, densest people in the world. Conquered through its own tunnels \u2014 Varas collapsed the three main shafts, trapping thousands below.",
    meta: { magic: "The Mold" },
  },
  {
    name: "The Clouds",
    category: "regions",
    subtitle: "Pilvi \u2014 Air / Sky",
    summary:
      "The Cloud People live on floating formations of stone held aloft by Move magic so old the air itself remembers them being there.",
    detail:
      "Some formations are small family platforms; others carry entire towns. They drift across the sky following currents that Cloud Guides read like roads. The view is endless. Sunrises last for hours. They speak softly \u2014 sound carries differently at altitude. Their elders are called Seers. In combat, Cloud warriors fight like hummingbirds: darting, striking, disappearing.",
    meta: { magic: "The Sing (ancestral), The Move, The Guide" },
  },
  {
    name: "The Sea",
    category: "regions",
    subtitle: "Bahar \u2014 Water / Tide",
    summary:
      "A vast coastline around a dark, cold ocean. The Sea People are the world\u2019s best Healers.",
    detail:
      "Everything follows rhythms \u2014 schedules, moods, decisions. They measure time by the sun and moon, whom they worship as the Twin Gods. Their Healers work with water, asking it to remind flesh of wholeness. Every Sea Person always knows which way the ocean is, even blindfolded. The deep ocean is unexplored and feared.",
    meta: { magic: "The Guide, The Heal" },
  },
  {
    name: "The Volcano",
    category: "regions",
    subtitle: "Kuuma \u2014 Fire / Heat",
    summary:
      "A chain of active and dormant volcanoes. The Volcano People are the world\u2019s smiths, with thick, heat-adapted skin.",
    detail:
      "Direct to the point of bluntness. Once committed, they walk through literal fire. Their weakness is cold \u2014 it stiffens their bodies and makes their thickened skin brittle. Many serve Varas willingly. The Mrak Patrol\u2019s shock troops are overwhelmingly Volcano People.",
    meta: { magic: "The Burn" },
  },
  {
    name: "The Desert",
    category: "regions",
    subtitle: "Kuiva \u2014 Sand / Absence",
    summary:
      "An endless expanse where the world\u2019s memory has been damaged. Magic behaves unpredictably here.",
    detail:
      "The Desert People are survivors defined by scarcity. They waste nothing. Their magic is a patchwork of weak fragments braided together in The Weave. They are nomadic, following underground water. Their greatest treasures are stories told around fires. The Weave-Roads are invisible trade routes braided with small magics \u2014 always cool, always flat, always pointing toward water.",
    meta: { magic: "The Weave" },
  },
  {
    name: "The Ming",
    category: "regions",
    subtitle: "Mieli \u2014 Mind / Thought",
    summary:
      "Rolling hills and still lakes, perpetually shrouded in mist. The land itself is semi-conscious. The mist is the region thinking.",
    detail:
      "The Ming are scholars, philosophers, and psychics. Their advanced Know allows them to enter another person\u2019s memories and walk through them like rooms. They prize emotional equilibrium above all \u2014 the ideal practitioner feels everything and shows nothing. Not suppression, but integration.",
    meta: { magic: "The Know (advanced), psychic disciplines" },
  },
  {
    name: "The Murkr",
    category: "regions",
    subtitle: "Old Norse: Darkness \u2014 The Convergence",
    summary:
      "Where all seven regions meet. Once the brightest place on earth. Now a dead zone of perpetual twilight.",
    detail:
      "The grass is grey. The trees are petrified. The rivers are dry. The sky is permanent dusk. The castle was originally a modest stone keep; Varas has Molded it over centuries into an organic nightmare \u2014 towers that curve like ribs, walls that pulse with stolen magic, corridors that rearrange according to his will.",
  },
  {
    name: "The Rememberings",
    category: "regions",
    subtitle: "The Walls Between Worlds",
    summary:
      "Natural walls of crystallized elemental magic that separate the seven regions. Each wall is a monument to its element.",
    detail:
      "The wall surrounding the Sea region is a towering curtain of perpetually falling water that never reaches the ground. The wall of the Core is a ridge of stone so dense that sound cannot pass through it. Before Varas, they had gates maintained by joint magical effort. Under Varas, the gates were sealed.",
  },

  // ─── CREATURES ─────────────────────────────────────────
  {
    name: "Flash Rat",
    category: "creatures",
    summary:
      "A hairless, fox-sized creature from the Core\u2019s deep caverns that pulses with blue-white bioluminescence when it detects magic.",
    detail:
      "Navigates by scent and vibration through extraordinary wire-like whiskers. Once it acquires a magical signature, it cannot be redirected \u2014 it will pursue until the source is found or the animal dies. It screams: a thin, sustained keen audible from a quarter mile. Not aggressive; it simply wants to be near the source. Bred by the Mrak Patrol as trackers. Most survive three or four pursuits before burning out.",
  },
  {
    name: "Saddle Bird",
    category: "creatures",
    summary:
      "A large avian beast used for medium-distance travel, primarily by the Cloud People. Temperamental. Bonds with a single rider.",
    detail:
      "A blue feather from a Saddle Bird is among the most beautiful things in the world.",
  },
  {
    name: "Hollow Whale",
    category: "creatures",
    summary:
      "The largest living things in the world. They surface occasionally in the deep ocean off Bahar.",
    detail:
      "Their memory is so ancient it resists all communion \u2014 the Know cannot read them, the Sing cannot reach them. The Sea People consider them sacred and unknowable. Their bones wash ashore and are used as building material for the floating platforms.",
  },
  {
    name: "Armored Ants",
    category: "creatures",
    summary:
      "Ancient insects that march in slow columns through the loam. Patient, enduring, older than human memory.",
    detail:
      "Among the first creatures mentioned in the world\u2019s song. They are survivors in the deepest sense \u2014 enduring beneath the surface through decades of silence, emerging when the earth remembers how to hold them.",
  },
  {
    name: "Hopper",
    category: "creatures",
    summary: "A small, common brown bird of the Canopy with a bright black eye.",
  },

  // ─── ORGANIZATIONS ─────────────────────────────────────
  {
    name: "The Vael Guard",
    category: "organizations",
    summary:
      "An ancient order of warrior-healers sworn to protect King Fletcher\u2019s bloodline across generations.",
    detail:
      'Members were chosen for their willingness to sacrifice \u2014 every member was both a fighter and a Healer, absorbing the phantom pain of every wound they mended while being unable to heal their own. Their oath: "I am the wall between the fire and the song. I will burn before the song goes silent." Hunted to near-extinction during Varas\u2019s purge. Their blood-mark \u2014 an amber symbol on the inner wrist \u2014 connects Guardian to charge across any distance.',
  },
  {
    name: "The Mrak Patrol",
    category: "organizations",
    summary:
      "King Varas\u2019s military force. Dark-armored soldiers stamped with the double-stone sigil.",
    detail:
      "They guard the sealed gates between regions and carry out the King\u2019s orders, including the Knower Ceremonies. Standard weapons include diamond-tipped spears for Volcano infantry and long, curved blades. They breed Flash Rats for pursuit operations and travel in kennel wagons \u2014 iron-barred cages on wheels.",
  },
  {
    name: "The Pure Ones",
    category: "organizations",
    summary:
      "Warrior-monks of the Canopy. Honor above survival, silence above speech, service above self.",
  },
  {
    name: "Cloud Singers",
    category: "organizations",
    summary:
      "Women of the Cloud People who carry the Song in their blood, passed from mother to daughter through an unbroken maternal line stretching back to King Fletcher.",
  },

  // ─── HERBS ─────────────────────────────────────────────
  {
    name: "Breedlebuck",
    category: "herbs",
    summary: "For inflammation. Reminds the body\u2019s tissue that swelling is not its natural state.",
  },
  {
    name: "Fiddleroot",
    category: "herbs",
    summary:
      "For fever and trembling. Interrupts the body\u2019s rehearsal of fighting by offering a newer memory of being cool.",
  },
  {
    name: "Ironbark",
    category: "herbs",
    summary:
      "For bone pain. Honors the bone\u2019s record of carrying weight, so the bone stops rehearsing the pain because the pain has been heard.",
  },
  {
    name: "Vigor Leaf",
    category: "herbs",
    summary: "For mental fog. Clears the haze after difficult nights.",
  },
  {
    name: "Blackthorn",
    category: "herbs",
    summary: "For nerve pain. Good for shaking and withdrawal.",
  },
  {
    name: "Root Wine",
    category: "herbs",
    summary: "A fermented drink. Not a remedy, though it is used as one.",
  },

  // ─── OBJECTS ───────────────────────────────────────────
  {
    name: "Elder Stones",
    category: "objects",
    summary:
      "Ancient stones at the intersection of all seven disciplines \u2014 the world\u2019s oldest memories crystallized into physical form.",
    detail:
      "They can store memory willingly given. Under Varas, they extract memory by force. They amplify magical ability when in contact with a practitioner. They resonate with Fletcher\u2019s bloodline \u2014 literally hum in their presence.",
  },
  {
    name: "The Great Elder Stone",
    category: "objects",
    summary:
      "The most powerful object in the world. Created by King Fletcher through the Sing.",
    detail:
      "Hidden among the clouds, it sings a single, perfect note that has not faded in three hundred years. It contains the complete memory of the Sing \u2014 the music of creation itself.",
  },
  {
    name: "Blood Vine",
    category: "objects",
    summary:
      "A parasitic plant that grows only in darkness and feeds on magical residue.",
    detail:
      "In nature, it attaches to Elder Stones and slowly siphons ambient memory. Varas weaponized it as a conduit for forced extraction. It latches onto the nervous system through the skin, creating a bridge between the victim\u2019s memory and the Elder Stone. Prolonged exposure leaves the victim in a vegetative state \u2014 alive but empty.",
  },
  {
    name: "Calibration Stone",
    category: "objects",
    summary:
      "A small, inert Elder Stone stripped of capacity, used by surveyors to measure ambient magical density. They do not normally produce sound.",
  },
  {
    name: "Cloudmilk",
    category: "objects",
    summary:
      "A substance distilled from condensation gathered at extreme altitude. Mild restorative properties. A controlled substance under the current regime.",
  },

  // ─── TERMS ─────────────────────────────────────────────
  {
    name: "The Prophecy",
    category: "terms",
    summary:
      "Carved into the base of the Great Elder Stone in the language of memory:",
    detail:
      "One will come who carries the Song in his blood. He will hear the stone. He will find the note. And in Singing, he will remember what the world forgot.",
  },
  {
    name: "The Knower Ceremony",
    category: "terms",
    subtitle: "The Knowing",
    summary:
      "Once a year, under the Blue Sun, children are tested for magical ability. In the old days, it was a celebration. Under Varas, it has become something else entirely.",
  },
  {
    name: "The Listening",
    category: "terms",
    summary:
      "The Canopy ceremony in which twelve-year-old children descend to the sacred forest floor and sit in the dark among the roots and the dead, trying to hear the Know for the first time.",
  },
  {
    name: "The Blue Sun",
    category: "terms",
    summary:
      "A celestial event that occurs once each year, during which the Knower Ceremonies are traditionally held.",
  },
  {
    name: "The Blood Moon",
    category: "terms",
    summary:
      "The astronomical event that precedes the Blue Sun. Once a time of celebration; now a night of dread.",
  },
  {
    name: "Blood-mark",
    category: "terms",
    summary:
      "An amber mark that sometimes appears on the inner wrist, visible only in certain light. It pulses with a rhythm like a heartbeat. Its origin and meaning are tied to the oldest orders of the realm.",
  },
  {
    name: "The Vael Guard Oath",
    category: "terms",
    summary:
      '"I am the wall between the fire and the song. I will burn before the song goes silent."',
  },
  {
    name: "Aelo",
    category: "terms",
    subtitle: "The Name",
    summary:
      'Means "breath of remembering" in the old tongue of the Vael Guard. A prayer disguised as a name.',
  },
];
