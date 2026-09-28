export type ProductSpecifications = {
  material: string
  weight: string
  origin: string
  dimensions: string
}

export const SCALE_SPEC_DEFAULTS: Record<string, ProductSpecifications> = {
  "1/6": {
    material: "Premium ABS, PVC & Tailored Fabric",
    weight: "1200 g",
    origin: "Japan / Hong Kong",
    dimensions: "31.5 cm x 14.0 cm x 10.5 cm (12.4 in)",
  },
  "1/7": {
    material: "High-Grade Painted PVC & Polystone Resin",
    weight: "950 g",
    origin: "Japan",
    dimensions: "25.0 cm x 16.0 cm x 14.0 cm (9.8 in)",
  },
  "1/8": {
    material: "Pre-painted PVC & Solid Display Base",
    weight: "650 g",
    origin: "Japan",
    dimensions: "21.0 cm x 12.0 cm x 10.0 cm (8.2 in)",
  },
  "1/12": {
    material: "Flexible PVC, Injection ABS & Articulated Joints",
    weight: "450 g",
    origin: "Japan",
    dimensions: "16.5 cm x 8.0 cm x 5.0 cm (6.5 in)",
  },
}

export const SPECS_BY_HANDLE: Record<string, ProductSpecifications> = {
  "spiderman-symbiote-suit": {
    material: "High-Grade Articulated PVC & Flexible Weave",
    weight: "420 g",
    origin: "Japan",
    dimensions: "16.0 cm x 7.5 cm x 4.5 cm",
  },
  "doctor-doom-sovereign": {
    material: "Die-cast Metal, PVC & Microfiber Wired Cape",
    weight: "1450 g",
    origin: "Hong Kong",
    dimensions: "33.0 cm x 16.0 cm x 12.0 cm",
  },
  "doctor-strange-sorcerer-supreme": {
    material: "Translucent Acryl, PVC & Fabric Cloak of Levitation",
    weight: "1250 g",
    origin: "Japan",
    dimensions: "32.0 cm x 20.0 cm x 15.0 cm",
  },
  "venom-lethal-protector": {
    material: "Heavy Dense PVC & Gloss Finish",
    weight: "850 g",
    origin: "Japan",
    dimensions: "19.5 cm x 12.0 cm x 9.0 cm",
  },
  "ironman-classic-ultron": {
    material: "Die-cast Armor, Metallic Paint & Polystone Base",
    weight: "1600 g",
    origin: "Hong Kong",
    dimensions: "34.0 cm x 18.0 cm x 14.0 cm",
  },
  "cyclops-xmen-90s": {
    material: "Fabric Suit, ABS Articulated Skeleton & Visor Optic Effect",
    weight: "1100 g",
    origin: "Japan",
    dimensions: "30.5 cm x 12.0 cm x 9.0 cm",
  },
  "agent-venom-tactical": {
    material: "Reinforced PVC, ABS Arsenal Parts & Multi-Arm Symbiote",
    weight: "480 g",
    origin: "Japan",
    dimensions: "17.0 cm x 10.0 cm x 6.0 cm",
  },
  "silver-surfer-sakaar-gladiator": {
    material: "Chrome Electroplated PVC, Gladiator Armor & Cosmic Surfboard",
    weight: "800 g",
    origin: "Japan",
    dimensions: "17.5 cm x 22.0 cm (Board) x 7.0 cm",
  },
  "nightwing-gotham-protector": {
    material: "Articulated PVC, Tailored Bodysuit & Escrima Sticks",
    weight: "1050 g",
    origin: "Japan",
    dimensions: "30.0 cm x 12.0 cm x 8.5 cm",
  },
  "batman-who-laughs-dark-multiverse": {
    material: "Sculpted PVC, Dark Leatherette Coat & Spiked Visor",
    weight: "1350 g",
    origin: "Japan",
    dimensions: "33.0 cm x 15.0 cm x 11.0 cm",
  },
  "red-hood-outlaw-tactical": {
    material: "ABS Helm, Genuine Texture Fabric & Dual Pistols",
    weight: "490 g",
    origin: "Japan",
    dimensions: "16.5 cm x 7.5 cm x 5.0 cm",
  },
  "john-constantine-hellblazer": {
    material: "Textured Cloth Trench Coat, PVC Sculpt & Magic Circles",
    weight: "980 g",
    origin: "United States",
    dimensions: "30.5 cm x 11.5 cm x 8.0 cm",
  },
  "doctor-fate-helmet-nabu": {
    material: "Polished Gold Finish PVC, Polystone Pedestal & Cape",
    weight: "1400 g",
    origin: "United States",
    dimensions: "35.0 cm x 16.0 cm x 13.0 cm",
  },
  "goku-ssgss-kaioken": {
    material: "Translucent Multi-layered PVC & Kaio-Ken Aura Base",
    weight: "520 g",
    origin: "Japan",
    dimensions: "16.5 cm x 9.0 cm x 6.0 cm",
  },
  "goku-super-saiyan-4-gt": {
    material: "Textured Fur Sculpt PVC & Injection Molded ABS",
    weight: "460 g",
    origin: "Japan",
    dimensions: "17.0 cm x 8.5 cm x 5.5 cm",
  },
  "vegeta-super-saiyan-blue": {
    material: "Saiyan Armor Matte PVC & Shading Paint",
    weight: "430 g",
    origin: "Japan",
    dimensions: "15.5 cm x 7.5 cm x 5.0 cm",
  },
  "satoru-gojo-infinite-void": {
    material: "Polystone Resin, Acrylic Effects & LED-Ready Base",
    weight: "1800 g",
    origin: "Japan",
    dimensions: "28.0 cm x 22.0 cm x 19.0 cm",
  },
  "lucy-cyberpunk-edgerunners": {
    material: "High-Grade Painted PVC & Translucent Monowire",
    weight: "780 g",
    origin: "Japan",
    dimensions: "23.5 cm x 11.0 cm x 10.0 cm",
  },
  "rebecca-cyberpunk-edgerunners": {
    material: "Pre-painted PVC, Custom Shotguns & Decal Tattoos",
    weight: "720 g",
    origin: "Japan",
    dimensions: "21.0 cm x 13.0 cm x 11.0 cm",
  },
  "inuyasha-tessaiga-diorama": {
    material: "Cold Cast Porcelain / PVC & Stone Base Diorama",
    weight: "1650 g",
    origin: "Japan",
    dimensions: "27.0 cm x 18.0 cm x 16.0 cm",
  },
  "jotaro-kujo-star-platinum": {
    material: "Dual Figure Polystone Sculpture & Metallic Coat Paint",
    weight: "2100 g",
    origin: "Japan",
    dimensions: "34.0 cm x 20.0 cm x 18.0 cm",
  },
  "ken-kaneki-awakened-ghoul": {
    material: "Glossy Red Kagune Resin, Ripped Cloth Sculpt & Rubble Base",
    weight: "890 g",
    origin: "Japan",
    dimensions: "22.5 cm x 17.0 cm x 15.0 cm",
  },
  "mandalorian-grogu-deluxe": {
    material: "Chrome Beskar Plating, Genuine Leather & Hover-Pram",
    weight: "1500 g",
    origin: "Hong Kong",
    dimensions: "30.0 cm x 13.0 cm x 10.0 cm",
  },
  "darth-vader-mustafar-duel": {
    material: "Die-cast Chest Plate, Fabric Cape & LED Red Lightsaber",
    weight: "1750 g",
    origin: "Hong Kong",
    dimensions: "35.0 cm x 16.0 cm x 12.0 cm",
  },
  "stormtrooper-imperial-infantry": {
    material: "High-Gloss Injection Molded ABS & E-11 Blaster Rifle",
    weight: "420 g",
    origin: "Japan",
    dimensions: "15.5 cm x 7.0 cm x 4.5 cm",
  },
  "boba-fett-classic-hunter": {
    material: "Weathered Armor PVC, Fabric Cape & Jetpack Rocket",
    weight: "460 g",
    origin: "Japan",
    dimensions: "16.0 cm x 7.5 cm x 5.0 cm",
  },
  "v-cyberpunk-2077": {
    material: "Textured Leather Jacket, LED Collar & Mantis Blades",
    weight: "1150 g",
    origin: "Poland / Hong Kong",
    dimensions: "30.5 cm x 12.0 cm x 9.0 cm",
  },
  "scorpion-mortal-kombat": {
    material: "Layered Ninja Tunic, Metallic Kunai Chain & Display Base",
    weight: "1400 g",
    origin: "United States",
    dimensions: "32.0 cm x 15.0 cm x 11.0 cm",
  },
  "leon-kennedy-rpd-tactical": {
    material: "Tailored R.P.D. Uniform, Leather Holster & Tactical Gear",
    weight: "1300 g",
    origin: "Japan",
    dimensions: "31.0 cm x 13.0 cm x 9.5 cm",
  },
  "tracer-overwatch-chronal": {
    material: "PVC, Chronal Accelerator LED Light & Energy Trails",
    weight: "900 g",
    origin: "United States / China",
    dimensions: "26.0 cm x 15.0 cm x 13.0 cm",
  },
  "robot-heavy-tf2-mvm": {
    material: "Heavy Industrial ABS/PVC, Weathered Rust Finish & Minigun",
    weight: "1650 g",
    origin: "United States",
    dimensions: "31.0 cm x 18.0 cm x 16.0 cm",
  },
  "robot-heavy-tf2": {
    material: "Heavy Industrial ABS/PVC, Weathered Rust Finish & Minigun",
    weight: "1650 g",
    origin: "United States",
    dimensions: "31.0 cm x 18.0 cm x 16.0 cm",
  },
  "link-zelda-royal-knight": {
    material: "Engraved Knight Plate Metal Finish, Fabric Cape & Hylian Shield",
    weight: "1200 g",
    origin: "Japan",
    dimensions: "28.0 cm x 14.0 cm x 12.0 cm",
  },
  "link-royal-knight-armor": {
    material: "Engraved Knight Plate Metal Finish, Fabric Cape & Hylian Shield",
    weight: "1200 g",
    origin: "Japan",
    dimensions: "28.0 cm x 14.0 cm x 12.0 cm",
  },
  "zero-megaman-x-hunter": {
    material: "Gloss Armor PVC, Clear Acrylic Z-Saber & Hair Plume",
    weight: "580 g",
    origin: "Japan",
    dimensions: "20.5 cm x 11.0 cm x 9.0 cm",
  },
  "zero-megaman-hunter": {
    material: "Gloss Armor PVC, Clear Acrylic Z-Saber & Hair Plume",
    weight: "580 g",
    origin: "Japan",
    dimensions: "20.5 cm x 11.0 cm x 9.0 cm",
  },
  "megaman-x-full-armor": {
    material: "Metallic Luster PVC & Translucent Energy Charging Buster",
    weight: "550 g",
    origin: "Japan",
    dimensions: "19.5 cm x 10.0 cm x 8.5 cm",
  },
  "megaman-x-buster-charge": {
    material: "Metallic Luster PVC & Translucent Energy Charging Buster",
    weight: "550 g",
    origin: "Japan",
    dimensions: "19.5 cm x 10.0 cm x 8.5 cm",
  },
  "goro-mk-shokan-champion": {
    material: "Heavy Polystone Sculpture, Skull Pedestal & Leather Loincloth",
    weight: "2400 g",
    origin: "United States",
    dimensions: "36.0 cm x 24.0 cm x 20.0 cm",
  },
  "prince-goro-shokan-champion": {
    material: "Heavy Polystone Sculpture, Skull Pedestal & Leather Loincloth",
    weight: "2400 g",
    origin: "United States",
    dimensions: "36.0 cm x 24.0 cm x 20.0 cm",
  },
  "johnny-cage-hollywood-strike": {
    material: "Tactical Vest Fabric, PVC Body & Removable Sunglasses",
    weight: "1100 g",
    origin: "United States",
    dimensions: "31.0 cm x 13.0 cm x 8.0 cm",
  },
  "dante-dmc5-son-of-sparda": {
    material: "Crimson Faux-Leather Trench Coat, Rebellion Sword & Ebony/Ivory",
    weight: "1450 g",
    origin: "Japan",
    dimensions: "32.5 cm x 15.0 cm x 12.0 cm",
  },
  "dante-devil-may-cry-5": {
    material: "Crimson Faux-Leather Trench Coat, Rebellion Sword & Ebony/Ivory",
    weight: "1450 g",
    origin: "Japan",
    dimensions: "32.5 cm x 15.0 cm x 12.0 cm",
  },
}

export const getSpecsForCollectible = (
  handle: string,
  scale?: string
): ProductSpecifications => {
  return (
    SPECS_BY_HANDLE[handle] ||
    SCALE_SPEC_DEFAULTS[scale || ""] ||
    SCALE_SPEC_DEFAULTS["1/6"]
  )
}

export const parseWeightGrams = (weight: string) => {
  const match = weight.match(/(\d+)/)
  return match ? Number(match[1]) : undefined
}
