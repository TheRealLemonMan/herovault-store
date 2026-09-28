import { getSpecsForCollectible, ProductSpecifications } from "./collectible-specs"

export type BadgeType = "info" | "exclusive" | "limited"

export type CollectibleDefinition = {
  id: string
  title: string
  handle: string
  sku: string
  description: string
  categoryName: "Marvel" | "DC" | "Anime" | "Sci-Fi" | "Star Wars" | "Video Games"
  universe: string
  scale: string
  condition: string
  badgeType: BadgeType
  usd: number
  stock: number
  image: string
  specifications: ProductSpecifications
}

export const APPAREL_PRODUCT_HANDLES = [
  "t-shirt",
  "sweatshirt",
  "sweatpants",
  "shorts",
]

export const APPAREL_CATEGORY_HANDLES = [
  "shirts",
  "sweatshirts",
  "pants",
  "merch",
]

export const LEGACY_COLLECTIBLE_HANDLES = [
  "batman-dark-knight-returns",
  "iron-man-mark-lxxxv",
  "spider-man-symbiote-suit",
  "wolverine-weapon-x",
  "darth-vader-mustafar",
  "son-goku-super-saiyan",
]

export const getFigureImageBaseUrl = () =>
  (
    process.env.STOREFRONT_URL ||
    process.env.MEDUSA_STOREFRONT_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:8000"
  ).replace(/\/$/, "")

export const getFigureImageUrl = (thumbnail: string) => {
  const filename = thumbnail.replace(/^\/figures\//, "").replace(/^\//, "")
  return `${getFigureImageBaseUrl()}/figures/${filename}`
}

const stockFor = (badgeType: BadgeType) => {
  if (badgeType === "limited") {
    return 5
  }
  if (badgeType === "exclusive") {
    return 8
  }
  return 16
}

const skuFromId = (id: string) => id.replace("fig_", "FIG-").toUpperCase()

type CatalogInput = {
  id: string
  title: string
  handle: string
  universe: string
  scale: string
  badge: string
  badgeType: BadgeType
  price: number
  thumbnail: string
  categoryName: CollectibleDefinition["categoryName"]
  description: string
}

const define = (item: CatalogInput): CollectibleDefinition => ({
  id: item.id,
  title: item.title,
  handle: item.handle,
  sku: skuFromId(item.id),
  description: item.description,
  categoryName: item.categoryName,
  universe: item.universe,
  scale: item.scale,
  condition: item.badge,
  badgeType: item.badgeType,
  usd: item.price,
  stock: stockFor(item.badgeType),
  image: item.thumbnail.replace(/^\/figures\//, ""),
  specifications: getSpecsForCollectible(item.handle, item.scale),
})

export const COLLECTIBLES: CollectibleDefinition[] = [
  define({
    id: "fig_m01",
    title: "Spider-Man (Symbiote Suit)",
    handle: "spiderman-symbiote-suit",
    universe: "Marvel",
    scale: "1/12",
    badge: "Nuevo en Caja",
    badgeType: "info",
    price: 64.99,
    thumbnail: "/figures/spiderman-symbiote.jpeg",
    categoryName: "Marvel",
    description:
      "Classic black symbiote suit with web-swing articulation and a display stand built for a 1/12 Marvel vitrine.",
  }),
  define({
    id: "fig_m02",
    title: "Doctor Doom (Sovereign Edition)",
    handle: "doctor-doom-sovereign",
    universe: "Marvel",
    scale: "1/6",
    badge: "Exclusivo",
    badgeType: "exclusive",
    price: 145,
    thumbnail: "/figures/doctor-doom.jpeg",
    categoryName: "Marvel",
    description:
      "Latverian sovereign in sculpted armor, cape, and throne-ready 1/6 presence for collectors of Marvel villains.",
  }),
  define({
    id: "fig_m03",
    title: "Doctor Strange (Sorcerer Supreme)",
    handle: "doctor-strange-sorcerer-supreme",
    universe: "Marvel",
    scale: "1/6",
    badge: "Limited Drop",
    badgeType: "limited",
    price: 139.99,
    thumbnail: "/figures/doctor-strange.jpeg",
    categoryName: "Marvel",
    description:
      "Sorcerer Supreme with Cloak of Levitation and relic detailing, limited 1/6 drop for mystic Marvel displays.",
  }),
  define({
    id: "fig_m04",
    title: "Venom (Lethal Protector)",
    handle: "venom-lethal-protector",
    universe: "Marvel",
    scale: "1/12",
    badge: "Nuevo en Caja",
    badgeType: "info",
    price: 84.99,
    thumbnail: "/figures/venom-symbiote.jpeg",
    categoryName: "Marvel",
    description:
      "Lethal Protector sculpt with organic texture, tongue, and aggressive 1/12 posing for Spider-Man lore shelves.",
  }),
  define({
    id: "fig_m05",
    title: "Iron Man (Classic Armor - Ultron Protocol)",
    handle: "ironman-classic-ultron",
    universe: "Marvel",
    scale: "1/6",
    badge: "Limited Drop",
    badgeType: "limited",
    price: 165,
    thumbnail: "/figures/ironman-classic.jpeg",
    categoryName: "Marvel",
    description:
      "Classic gold-and-crimson armor with Ultron Protocol finish. Limited 1/6 statue for Avengers armor collectors.",
  }),
  define({
    id: "fig_m06",
    title: "Cyclops (X-Men 90s Jim Lee Era)",
    handle: "cyclops-xmen-90s",
    universe: "Marvel",
    scale: "1/6",
    badge: "Exclusivo",
    badgeType: "exclusive",
    price: 140,
    thumbnail: "/figures/cyclops-xmen.jpeg",
    categoryName: "Marvel",
    description:
      "90s Jim Lee Cyclops with visor beam ready pose. Exclusive 1/6 X-Men edition for comic-era displays.",
  }),
  define({
    id: "fig_m07",
    title: "Agent Venom (Tactical Symbiote)",
    handle: "agent-venom-tactical",
    universe: "Marvel",
    scale: "1/12",
    badge: "Nuevo en Caja",
    badgeType: "info",
    price: 74.99,
    thumbnail: "/figures/agent-venom.jpeg",
    categoryName: "Marvel",
    description:
      "Flash Thompson tactical symbiote loadout with military webbing and 1/12 articulation, sealed in box.",
  }),
  define({
    id: "fig_m08",
    title: "Silver Surfer (Sakaar Gladiator)",
    handle: "silver-surfer-sakaar-gladiator",
    universe: "Marvel",
    scale: "1/12",
    badge: "Exclusivo",
    badgeType: "exclusive",
    price: 69.99,
    thumbnail: "/figures/silver-surfer-gladiator.jpeg",
    categoryName: "Marvel",
    description:
      "Sakaar gladiator Surfer with chrome surfboard and cosmic 1/12 sculpt. Exclusive Marvel cosmic drop.",
  }),
  define({
    id: "fig_dc01",
    title: "Nightwing (Gotham Protector)",
    handle: "nightwing-gotham-protector",
    universe: "DC Comics",
    scale: "1/6",
    badge: "Nuevo en Caja",
    badgeType: "info",
    price: 110,
    thumbnail: "/figures/nightwing.jpeg",
    categoryName: "DC",
    description:
      "Gotham Protector Nightwing in escrima stance, 1/6 scale with satin blues for a Bat-family vitrine.",
  }),
  define({
    id: "fig_dc02",
    title: "The Batman Who Laughs (Dark Multiverse)",
    handle: "batman-who-laughs-dark-multiverse",
    universe: "DC Comics",
    scale: "1/6",
    badge: "Limited Drop",
    badgeType: "limited",
    price: 179.99,
    thumbnail: "/figures/batman-who-laughs.jpeg",
    categoryName: "DC",
    description:
      "Dark Multiverse Batman Who Laughs with grim grin and 1/6 cape drape. Limited collector statue.",
  }),
  define({
    id: "fig_dc03",
    title: "Red Hood (Outlaw Tactical Edition)",
    handle: "red-hood-outlaw-tactical",
    universe: "DC Comics",
    scale: "1/12",
    badge: "Nuevo en Caja",
    badgeType: "info",
    price: 72,
    thumbnail: "/figures/red-hood.jpeg",
    categoryName: "DC",
    description:
      "Outlaw tactical Red Hood with dual pistols and helmeted 1/12 sculpt, new in box for Gotham outlaws.",
  }),
  define({
    id: "fig_dc04",
    title: "John Constantine (Hellblazer Sorcery)",
    handle: "john-constantine-hellblazer",
    universe: "DC Comics",
    scale: "1/6",
    badge: "Exclusivo",
    badgeType: "exclusive",
    price: 155,
    thumbnail: "/figures/john-constantine.jpeg",
    categoryName: "DC",
    description:
      "Hellblazer Constantine in trench coat with occult relics. Exclusive 1/6 DC magic-line statue.",
  }),
  define({
    id: "fig_dc05",
    title: "Doctor Fate (Helmet of Nabu Maquette)",
    handle: "doctor-fate-helmet-nabu",
    universe: "DC Comics",
    scale: "1/6",
    badge: "Exclusivo",
    badgeType: "exclusive",
    price: 149.99,
    thumbnail: "/figures/doctor-fate.jpeg",
    categoryName: "DC",
    description:
      "Helmet of Nabu maquette with golden armor and mystic cape. Exclusive 1/6 Fate display piece.",
  }),
  define({
    id: "fig_an01",
    title: "Son Goku SSGSS Kaio-Ken",
    handle: "goku-ssgss-kaioken",
    universe: "Anime",
    scale: "1/12",
    badge: "Limited Drop",
    badgeType: "limited",
    price: 79.99,
    thumbnail: "/figures/goku-kaioken.jpeg",
    categoryName: "Anime",
    description:
      "Super Saiyan Blue Kaio-Ken Goku with aura effects. Limited 1/12 Dragon Ball drop.",
  }),
  define({
    id: "fig_an02",
    title: "Goku Super Saiyan 4 (Dragon Ball GT)",
    handle: "goku-super-saiyan-4-gt",
    universe: "Anime",
    scale: "1/12",
    badge: "Nuevo en Caja",
    badgeType: "info",
    price: 62.5,
    thumbnail: "/figures/goku-ssj4.jpeg",
    categoryName: "Anime",
    description:
      "GT Super Saiyan 4 Goku with crimson fur sculpt and 1/12 articulation, sealed for collectors.",
  }),
  define({
    id: "fig_an03",
    title: "Vegeta Super Saiyan Blue",
    handle: "vegeta-super-saiyan-blue",
    universe: "Anime",
    scale: "1/12",
    badge: "Nuevo en Caja",
    badgeType: "info",
    price: 59.99,
    thumbnail: "/figures/vegeta-blue.jpeg",
    categoryName: "Anime",
    description:
      "Prince of all Saiyans in Super Saiyan Blue with royal scowl and 1/12 battle stance.",
  }),
  define({
    id: "fig_an04",
    title: "Satoru Gojo - Infinite Void Diorama",
    handle: "satoru-gojo-infinite-void",
    universe: "Anime",
    scale: "1/7",
    badge: "Limited Drop",
    badgeType: "limited",
    price: 189,
    thumbnail: "/figures/satoru-gojo.jpeg",
    categoryName: "Anime",
    description:
      "Infinite Void diorama of Satoru Gojo at 1/7 scale. Limited Jujutsu Kaisen centerpiece.",
  }),
  define({
    id: "fig_an05",
    title: "Lucy (Cyberpunk: Edgerunners)",
    handle: "lucy-cyberpunk-edgerunners",
    universe: "Anime",
    scale: "1/7",
    badge: "Limited Drop",
    badgeType: "limited",
    price: 129.99,
    thumbnail: "/figures/lucy-edgerunners.jpeg",
    categoryName: "Anime",
    description:
      "Netrunner Lucy from Edgerunners, 1/7 scale with Night City styling. Limited anime drop.",
  }),
  define({
    id: "fig_an06",
    title: "Rebecca (Cyberpunk: Edgerunners)",
    handle: "rebecca-cyberpunk-edgerunners",
    universe: "Anime",
    scale: "1/7",
    badge: "Exclusivo",
    badgeType: "exclusive",
    price: 119.99,
    thumbnail: "/figures/rebecca-edgerunners.jpeg",
    categoryName: "Anime",
    description:
      "Rebecca of Edgerunners in exclusive 1/7 sculpt with chrome arms and chaotic energy.",
  }),
  define({
    id: "fig_an07",
    title: "Inuyasha (Tessaiga Unleashed Diorama)",
    handle: "inuyasha-tessaiga-diorama",
    universe: "Anime",
    scale: "1/7",
    badge: "Exclusivo",
    badgeType: "exclusive",
    price: 159,
    thumbnail: "/figures/inuyasha.jpeg",
    categoryName: "Anime",
    description:
      "Tessaiga Unleashed diorama of Inuyasha at 1/7. Exclusive feudal-demon display.",
  }),
  define({
    id: "fig_an08",
    title: "Jotaro Kujo & Star Platinum",
    handle: "jotaro-kujo-star-platinum",
    universe: "Anime",
    scale: "1/6",
    badge: "Limited Drop",
    badgeType: "limited",
    price: 185,
    thumbnail: "/figures/jotaro-star-platinum.jpeg",
    categoryName: "Anime",
    description:
      "Jotaro and Star Platinum dual sculpt at 1/6. Limited JoJo drop for Stand collectors.",
  }),
  define({
    id: "fig_an09",
    title: "Ken Kaneki (Awakened Half-Ghoul)",
    handle: "ken-kaneki-awakened-ghoul",
    universe: "Anime",
    scale: "1/8",
    badge: "Nuevo en Caja",
    badgeType: "info",
    price: 95,
    thumbnail: "/figures/kaneki-tokyo-ghoul.jpeg",
    categoryName: "Anime",
    description:
      "Awakened half-ghoul Kaneki with kakuhou effects. 1/8 scale, new in box.",
  }),
  define({
    id: "fig_sw01",
    title: "The Mandalorian & Grogu Deluxe",
    handle: "mandalorian-grogu-deluxe",
    universe: "Star Wars",
    scale: "1/6",
    badge: "Exclusivo",
    badgeType: "exclusive",
    price: 160,
    thumbnail: "/figures/mandalorian-grogu.jpeg",
    categoryName: "Star Wars",
    description:
      "Deluxe Mandalorian and Grogu 1/6 set with beskar weathering. Exclusive Star Wars drop.",
  }),
  define({
    id: "fig_sw02",
    title: "Darth Vader (Mustafar Duel)",
    handle: "darth-vader-mustafar-duel",
    universe: "Star Wars",
    scale: "1/6",
    badge: "Limited Drop",
    badgeType: "limited",
    price: 175,
    thumbnail: "/figures/darth-vader.jpeg",
    categoryName: "Star Wars",
    description:
      "Mustafar Duel Vader in lava-lit 1/6 armor. Limited Sith statue for sci-fi vaults.",
  }),
  define({
    id: "fig_sw03",
    title: "V - Mercenary of Night City",
    handle: "v-cyberpunk-2077",
    universe: "Video Games",
    scale: "1/6",
    badge: "Nuevo en Caja",
    badgeType: "info",
    price: 89.99,
    thumbnail: "/figures/cyberpunk-v.jpeg",
    categoryName: "Video Games",
    description:
      "V of Night City in mercenary chrome, 1/6 gaming statue sealed for Cyberpunk collectors.",
  }),
  define({
    id: "fig_sw04",
    title: "Stormtrooper (Imperial Infantry)",
    handle: "stormtrooper-imperial-infantry",
    universe: "Star Wars",
    scale: "1/12",
    badge: "Nuevo en Caja",
    badgeType: "info",
    price: 54.99,
    thumbnail: "/figures/stormtrooper.jpeg",
    categoryName: "Star Wars",
    description:
      "Imperial infantry Stormtrooper at 1/12 with clean armor finish. New in box army-builder.",
  }),
  define({
    id: "fig_sw05",
    title: "Boba Fett (Classic Bounty Hunter)",
    handle: "boba-fett-classic-hunter",
    universe: "Star Wars",
    scale: "1/12",
    badge: "Nuevo en Caja",
    badgeType: "info",
    price: 68,
    thumbnail: "/figures/boba-fett.jpeg",
    categoryName: "Star Wars",
    description:
      "Classic bounty hunter Boba Fett with weathered jetpack. 1/12 Star Wars figure, new in box.",
  }),
  define({
    id: "fig_sw06",
    title: "Scorpion (Shirai Ryu Vengeance)",
    handle: "scorpion-mortal-kombat",
    universe: "Video Games",
    scale: "1/6",
    badge: "Limited Drop",
    badgeType: "limited",
    price: 169.99,
    thumbnail: "/figures/scorpion-mk.jpeg",
    categoryName: "Video Games",
    description:
      "Shirai Ryu Scorpion with spear and hellfire 1/6 sculpt. Limited Mortal Kombat drop.",
  }),
  define({
    id: "fig_vg01",
    title: "Leon S. Kennedy (R.P.D. Tactical Edition)",
    handle: "leon-kennedy-rpd-tactical",
    universe: "Video Games",
    scale: "1/6",
    badge: "Nuevo en Caja",
    badgeType: "info",
    price: 149.99,
    thumbnail: "/figures/leon-kennedy.jpeg",
    categoryName: "Video Games",
    description:
      "R.P.D. tactical Leon with dual pistols and weathered 1/6 gear. Sealed Resident Evil collector edition.",
  }),
  define({
    id: "fig_vg02",
    title: "Tracer (Overwatch 2 Chronal Accelerator)",
    handle: "tracer-overwatch-chronal",
    universe: "Video Games",
    scale: "1/7",
    badge: "Exclusivo",
    badgeType: "exclusive",
    price: 129.99,
    thumbnail: "/figures/tracer-overwatch.jpeg",
    categoryName: "Video Games",
    description:
      "Overwatch 2 Tracer with Chronal Accelerator and pulse pistols. Exclusive 1/7 statue.",
  }),
  define({
    id: "fig_vg03",
    title: "Robot Heavy (Team Fortress 2 - Mann vs Machine)",
    handle: "robot-heavy-tf2-mvm",
    universe: "Video Games",
    scale: "1/6",
    badge: "Exclusivo",
    badgeType: "exclusive",
    price: 165,
    thumbnail: "/figures/heavy-tf2.jpeg",
    categoryName: "Video Games",
    description:
      "Mann vs Machine Robot Heavy with minigun mass and 1/6 industrial armor. Exclusive TF2 drop.",
  }),
  define({
    id: "fig_vg04",
    title: "Link (The Legend of Zelda - Royal Knight Armor)",
    handle: "link-zelda-royal-knight",
    universe: "Video Games",
    scale: "1/7",
    badge: "Limited Drop",
    badgeType: "limited",
    price: 189.99,
    thumbnail: "/figures/link-zelda.jpeg",
    categoryName: "Video Games",
    description:
      "Royal Knight Armor Link at 1/7 with Master Sword presence. Limited Zelda vault drop.",
  }),
  define({
    id: "fig_vg05",
    title: "Zero (Mega Man X Hunter Elite)",
    handle: "zero-megaman-x-hunter",
    universe: "Video Games",
    scale: "1/8",
    badge: "Nuevo en Caja",
    badgeType: "info",
    price: 89.5,
    thumbnail: "/figures/zero-megaman.jpeg",
    categoryName: "Video Games",
    description:
      "Hunter Elite Zero with Z-Saber and crimson 1/8 armor. New in box Mega Man X figure.",
  }),
  define({
    id: "fig_vg06",
    title: "Mega Man X (Full Armor Buster Charge)",
    handle: "megaman-x-full-armor",
    universe: "Video Games",
    scale: "1/8",
    badge: "Nuevo en Caja",
    badgeType: "info",
    price: 85,
    thumbnail: "/figures/megaman-x.jpeg",
    categoryName: "Video Games",
    description:
      "Full Armor X with charged buster stance at 1/8. Sealed Mega Man Maverick Hunter edition.",
  }),
  define({
    id: "fig_vg07",
    title: "Prince Goro (Mortal Kombat Shokan Champion)",
    handle: "goro-mk-shokan-champion",
    universe: "Video Games",
    scale: "1/6",
    badge: "Limited Drop",
    badgeType: "limited",
    price: 199.99,
    thumbnail: "/figures/goro-mk.jpeg",
    categoryName: "Video Games",
    description:
      "Four-armed Shokan champion Goro at 1/6. Limited Mortal Kombat Outworld drop.",
  }),
  define({
    id: "fig_vg08",
    title: "Johnny Cage (Mortal Kombat Hollywood Strike)",
    handle: "johnny-cage-hollywood-strike",
    universe: "Video Games",
    scale: "1/6",
    badge: "Nuevo en Caja",
    badgeType: "info",
    price: 115,
    thumbnail: "/figures/johnny-cage.jpeg",
    categoryName: "Video Games",
    description:
      "Hollywood Strike Johnny Cage with shadow kick ready 1/6 sculpt. New in box MK figure.",
  }),
  define({
    id: "fig_vg09",
    title: "Dante (Devil May Cry 5 - Son of Sparda)",
    handle: "dante-dmc5-son-of-sparda",
    universe: "Video Games",
    scale: "1/6",
    badge: "Limited Drop",
    badgeType: "limited",
    price: 179,
    thumbnail: "/figures/dante-dmc.jpeg",
    categoryName: "Video Games",
    description:
      "Son of Sparda Dante with Rebellion and 1/6 coat drape. Limited Devil May Cry 5 drop.",
  }),
]

export const STOCK_BY_SKU = Object.fromEntries(
  COLLECTIBLES.map((item) => [item.sku, item.stock])
) as Record<string, number>
