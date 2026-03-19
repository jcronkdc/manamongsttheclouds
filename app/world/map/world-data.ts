export interface RegionData {
  id: string;
  name: string;
  nativeName: string;
  element: string;
  magic: string;
  color: string;
  emissive: string;
  lat: number;
  lng: number;
  size: number;
  description: string;
  people: string;
  culture: string;
  landscape: string;
  underVaras: string;
  mentor: string;
  distances: { to: string; leagues: string; note: string }[];
  keyLocations: string[];
  creatures: string[];
}

export const regions: RegionData[] = [
  {
    id: "clouds",
    name: "The Clouds",
    nativeName: "Pilvi",
    element: "Air / Sky",
    magic: "The Sing, The Move, The Guide",
    color: "#9ac8e8",
    emissive: "#4a88b8",
    lat: 65,
    lng: 0,
    size: 0.14,
    description:
      "The Cloud People live on floating formations — masses of stone held aloft by ancient Move magic so old the air remembers them being there. Some are small family platforms; others carry entire towns. They drift across the sky following currents that Cloud Guides read like roads.",
    people:
      "Light, quick, and widely considered strange by everyone else. They speak softly — sound carries differently at altitude. Their elders are called Seers. In combat, Cloud warriors fight like hummingbirds — darting, striking, disappearing.",
    culture:
      "They value vision above all else. They carry vials of Cloudmilk, distilled from condensation at extreme altitude. The Blue Sun is visible from the Clouds for a full day longer than anywhere else.",
    landscape:
      "Floating formations of stone, some carrying entire towns. The view is endless. Sunrises last for hours. The air is thin and cold. Light behaves differently here.",
    underVaras:
      "Varas uses Burn practitioners to create storms that destabilize the floating stones. Several formations have been crashed. A resistance operates from formations that drift through unclaimed sky.",
    mentor: "Cael — ancient Cloud Seer who teaches Aelo about the Sing",
    distances: [
      { to: "The Murkr", leagues: "~400", note: "Downward through mountain passes" },
      { to: "The Desert", leagues: "~300", note: "Mountains separate the two; The Ascent connects them" },
      { to: "The Sea", leagues: "~600", note: "Across open sky and the eastern ranges" },
    ],
    keyLocations: [
      "The Refuge — hidden resistance base in perpetual fog",
      "The Great Elder Stone — suspended in the highest formation",
      "The Summit — peak where the air road begins",
    ],
    creatures: ["Saddle Birds — bond with a single rider, carry the Song in their bones"],
  },
  {
    id: "ming",
    name: "The Ming",
    nativeName: "Mieli",
    element: "Mind / Thought",
    magic: "The Know (advanced), psychic disciplines",
    color: "#8878a8",
    emissive: "#5a4a8a",
    lat: 40,
    lng: -70,
    size: 0.12,
    description:
      "Rolling hills and still lakes, perpetually shrouded in mist. The concentration of Know magic is so dense that the land itself has become semi-conscious. The mist is the region thinking.",
    people:
      "Scholars, philosophers, and psychics. Their advanced Know allows them to enter another person's memories and walk through them like rooms. They prize emotional equilibrium above all.",
    culture:
      "The ideal practitioner feels everything and shows nothing — not suppression, but integration. They believe all emotions are memories of past experiences. Outbursts are a sign of underdeveloped practice.",
    landscape:
      "Rolling hills and still lakes shrouded in perpetual mist. Colors are muted, sounds dampened, time moves differently. The mist is not weather — it is the region thinking.",
    underVaras:
      "The first region targeted — the only people who could Know Varas for what he is. Many were killed. Survivors went underground, into caves beneath the still lakes where the mist is too thick for draining stones.",
    mentor: "The Ming elder — teaches Aelo advanced Know techniques",
    distances: [
      { to: "The Murkr", leagues: "~250", note: "Closest region to the center" },
      { to: "The Canopy", leagues: "~200", note: "Through the mist border" },
      { to: "The Clouds", leagues: "~350", note: "Northeast through the highlands" },
    ],
    keyLocations: [
      "The Still Lakes — mirrors for deep meditation",
      "The Ming Monasteries — centers of Know practice",
      "The Underground Caves — where survivors hide",
    ],
    creatures: ["Ming Bear — (mysterious, undocumented)"],
  },
  {
    id: "canopy",
    name: "The Canopy",
    nativeName: "Lehti",
    element: "Wood / Life",
    magic: "The Know, The Rootrun",
    color: "#3a7b28",
    emissive: "#1a4a0e",
    lat: 15,
    lng: -85,
    size: 0.13,
    description:
      "An ancient forest so vast that the floor has not seen sunlight in centuries. Trees with trunks wide enough to hold a village inside. Life is vertical — people live in the mid-canopy, connected by rope bridges and carved stairways.",
    people:
      "The Pure Ones. A society built on observation, philosophy, and restraint. They believe magic should be listened to, not commanded. Warriors follow a code similar to bushido — honor above survival, silence above speech.",
    culture:
      "Children raised communally. At age twelve, they descend to the sacred forest floor in The Listening — sitting in the dark among roots and the dead, trying to hear the Know for the first time.",
    landscape:
      "Enormous trees with trunks wide enough to hold villages. Rope bridges and carved stairways connect the mid-canopy. The forest floor is sacred — where the dead are laid and the oldest memories live.",
    underVaras:
      "The hardest region to subjugate. The forest itself resists intrusion — paths shift, markers vanish. Mrak Patrols sent into the deep Canopy tend not to return.",
    mentor: "Mira — the silent warrior-monk who teaches Aelo The Know",
    distances: [
      { to: "The Murkr", leagues: "~350", note: "East through dense forest to the deadlands" },
      { to: "The Ming", leagues: "~200", note: "North through the mist border" },
      { to: "The Core", leagues: "~250", note: "South along the forest edge" },
    ],
    keyLocations: [
      "The Listening Ground — sacred forest floor",
      "The High Canopy — where the Pure Ones live",
      "Rootrun Paths — trance-running routes through the forest",
    ],
    creatures: [
      "Hopper — small brown bird with a bright black eye",
      "Armored Ants — ancient insects, older than human memory",
    ],
  },
  {
    id: "core",
    name: "The Core",
    nativeName: "Syvä",
    element: "Earth / Stone",
    magic: "The Mold",
    color: "#7a6a55",
    emissive: "#4a3a2a",
    lat: -25,
    lng: -75,
    size: 0.13,
    description:
      "A vast, rocky continent of canyons, mesas, and caverns on the surface. The true Core is underground — cities carved deep beneath the crust over thousands of years, cathedrals of stone lit by bioluminescent fungi and crystal veins.",
    people:
      "Practical, communal, loud. They value craft above all else. Meals always eaten together; solitude is considered a mild form of illness. Arguments settled by building contests. The largest, densest people in the world.",
    culture:
      "The greatest artists are Molders who reshape stone into sculptures so detailed they seem alive. Engineers build structures that withstand earthquakes by asking the stone to remember being unbroken.",
    landscape:
      "Wind-scoured stone surface with canyons and mesas. Underground: cathedrals of stone lit by bioluminescent fungi and crystal veins that pulse with ambient magical memory. Deeper stone holds stronger Mold magic.",
    underVaras:
      "Conquered through its own tunnels. Varas collapsed the three main shafts, trapping thousands below. Entire communities survive in sealed caverns on fungus and recycled water.",
    mentor: "Torvus — the numb giant who can reshape mountains but can't feel his own skin",
    distances: [
      { to: "The Murkr", leagues: "~300", note: "East through canyon systems" },
      { to: "The Canopy", leagues: "~250", note: "North along the forest edge" },
      { to: "The Desert", leagues: "~280", note: "Southeast across the barrens" },
    ],
    keyLocations: [
      "The Deep Cities — underground cathedrals of stone",
      "The Three Main Shafts — collapsed by Varas",
      "Crystal Vein Caverns — pulse with magical memory",
    ],
    creatures: [
      "Flash Rat — bioluminescent tracker, bred by the Mrak Patrol",
    ],
  },
  {
    id: "desert",
    name: "The Desert",
    nativeName: "Kuiva",
    element: "Sand / Absence",
    magic: "The Weave",
    color: "#d4a574",
    emissive: "#a87a44",
    lat: -45,
    lng: 0,
    size: 0.15,
    description:
      "An endless expanse of sand where the elemental memory has been damaged. Magic behaves unpredictably — spells fizzle, the Know returns false readings. The world's memory here is scrambled.",
    people:
      "Survivors defined by scarcity. They waste nothing — not water, not food, not words, not magic. Nomadic, following underground water. Their greatest treasures are stories, told around fires.",
    culture:
      "Their magic is a patchwork — weak fragments of every discipline braided together in The Weave, the most technically demanding form of magic in the world. They believe the Desert will remember what it was when someone tells it the right story.",
    landscape:
      "Endless pale sand dunes, underground water sources, no visible life on the surface. Once green — a catastrophic event burned the memory of life out of the land. The sand remembers being something else but has forgotten what.",
    underVaras:
      "Mostly ignored. Too large, too hostile, too magically unreliable. Varas considers it a wasteland. This is his mistake — the resistance's supply lines run through the Desert.",
    mentor: "The Desert Elder — teaches Aelo about reminding broken memory",
    distances: [
      { to: "The Murkr", leagues: "~500", note: "North through the wastes and mountain passes" },
      { to: "The Clouds", leagues: "~300", note: "North over The Ascent mountains" },
      { to: "The Sea", leagues: "~400", note: "Northeast along the coastal road" },
      { to: "The Volcano", leagues: "~350", note: "East across the barrens" },
    ],
    keyLocations: [
      "The Weave-Roads — invisible trade routes, always cool, always pointing toward water",
      "The Ascent — mountain pass to the Clouds",
      "Underground Wells — the Desert People's lifeline",
    ],
    creatures: [],
  },
  {
    id: "volcano",
    name: "The Volcano",
    nativeName: "Kuuma",
    element: "Fire / Heat",
    magic: "The Burn",
    color: "#c83a10",
    emissive: "#8a2000",
    lat: -30,
    lng: 75,
    size: 0.12,
    description:
      "A chain of active and dormant volcanoes connected by rivers of slowly cooling lava. Obsidian plains, sulfur vents, basalt cliffs. Beautiful in a terrifying way.",
    people:
      "The world's smiths and metalworkers. Their thick skin — a generational adaptation to centuries of Burn magic — makes them uniquely suited to molten metal. Direct to the point of bluntness. Deeply loyal.",
    culture:
      "They value action over words, heat over light, the present over past or future. Once committed to a cause, they walk through literal fire. Betrayal is the only unforgivable crime. Weakness is cold.",
    landscape:
      "Chain of active and dormant volcanoes, lava rivers, obsidian plains, sulfur vents, basalt cliffs. Settlements built into calderas of dormant volcanoes, using geothermal heat for everything.",
    underVaras:
      "Many serve willingly. Varas offered them purpose beyond the forge — titles, authority, enemies. The Mrak Patrol's shock troops are overwhelmingly Volcano People. This complicity is the region's great shame.",
    mentor: "Volcano training — Aelo learns about the Burn through exposure",
    distances: [
      { to: "The Murkr", leagues: "~280", note: "West through the ashlands" },
      { to: "The Sea", leagues: "~220", note: "North along the coast" },
      { to: "The Desert", leagues: "~350", note: "West across the barrens" },
    ],
    keyLocations: [
      "The Calderas — dormant volcano settlements",
      "Obsidian Plains — vast stretches of volcanic glass",
      "The Forge Districts — where the finest blades are made",
    ],
    creatures: [],
  },
  {
    id: "sea",
    name: "The Sea",
    nativeName: "Bahar",
    element: "Water / Tide",
    magic: "The Guide, The Heal",
    color: "#2868a0",
    emissive: "#1a4d7b",
    lat: 20,
    lng: 80,
    size: 0.14,
    description:
      "A vast coastline around a dark, cold ocean. The Sea People live on shore and on floating platforms anchored to the seabed that rise and fall with the tide. The deep ocean is unexplored and feared.",
    people:
      "Tidal. Everything follows rhythms — schedules, moods, decisions. Slow to act and slow to anger, but when roused, relentless. The world's best Healers. Every Sea Person always knows which way the ocean is.",
    culture:
      "They worship the sun and moon as the Twin Gods. Their Healers work with water, asking it to remind flesh of wholeness. Time measured by tides. The rare Guides can sense the trajectory of the future — momentum, not prophecy.",
    landscape:
      "Vast dark coastline, floating platforms anchored to the seabed, deep unexplored ocean. Things live in the depths that predate magic — creatures whose memory is so old it resists all communion.",
    underVaras:
      "Conquered by controlling the narwhal harvest. Narwhal horn resonates with memory, key to Elder Stone construction. By the time the Sea People agreed resistance was necessary, every port was fortified.",
    mentor: "Laine — young Guide who can see the future and wishes she couldn't",
    distances: [
      { to: "The Murkr", leagues: "~350", note: "West through coastal lowlands" },
      { to: "The Volcano", leagues: "~220", note: "South along the coast" },
      { to: "The Clouds", leagues: "~600", note: "West and upward" },
      { to: "The Desert", leagues: "~400", note: "Southwest along the coastal road" },
    ],
    keyLocations: [
      "The Floating Platforms — communities that rise and fall with the tide",
      "The Narwhal Grounds — controlled by Varas",
      "The Deep Ocean — feared, unexplored",
    ],
    creatures: [
      "Hollow Whales — largest living things in the world, memory resists all communion",
      "Narwhals — horn resonates with memory, key to Elder Stone construction",
    ],
  },
  {
    id: "murkr",
    name: "The Murkr",
    nativeName: "Darkness",
    element: "Void / Absence",
    magic: "Stolen magic — drained and corrupted",
    color: "#2a2228",
    emissive: "#1a1518",
    lat: 10,
    lng: 5,
    size: 0.1,
    description:
      "The convergence point where all seven regions meet. Once the brightest, most magically resonant place on earth. Under Varas, it has become a dead zone — the land drained of all elemental memory.",
    people:
      "No free people remain. Only Varas's court, the Mrak Patrol, and the drained prisoners. The castle is alive — fed by the same Blood Vine network that feeds the King.",
    culture:
      "A perversion of all seven cultures. Varas has Molded the castle into an organic nightmare — towers that curve like ribs, walls that pulse with stolen magic, corridors that rearrange according to his will.",
    landscape:
      "Grey grass, petrified trees, dry rivers, permanent dusk. Not dark enough for stars, not light enough for shadows. A place where magic goes to die.",
    underVaras:
      "This IS Varas. The castle sits at the heart. Inside: The Chamber, the rows of drained prisoners, the Elder Stones, and behind the locked door — the entombed King Aldric and Prince Vero.",
    mentor: "None — this is where the journey ends",
    distances: [
      { to: "The Ming", leagues: "~250", note: "The closest region" },
      { to: "The Volcano", leagues: "~280", note: "East through the ashlands" },
      { to: "The Core", leagues: "~300", note: "West through canyons" },
    ],
    keyLocations: [
      "Varas's Castle — organic nightmare of stolen magic",
      "The Chamber — where prisoners are drained",
      "The Locked Door — entombed King Aldric and Prince Vero",
    ],
    creatures: [
      "Flash Rats — bred as trackers by the Mrak Patrol",
    ],
  },
];
