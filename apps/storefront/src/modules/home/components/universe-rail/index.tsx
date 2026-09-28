import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Heading } from "@modules/common/components/ui"

type UniverseRailProps = {
  categories: HttpTypes.StoreProductCategory[]
}

const SAGA_CARDS = [
  {
    handle: "marvel",
    href: "/categories/marvel",
    name: "Marvel",
    image: "/figures/marvel-logo.jpg",
    glow: "group-hover:border-red-500/60 group-hover:shadow-[0_0_30px_rgba(239,68,68,0.35)]",
  },
  {
    handle: "dc",
    href: "/categories/dc",
    name: "DC Comics",
    image: "/figures/dc-logo.jpg",
    glow: "group-hover:border-blue-500/60 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.35)]",
  },
  {
    handle: "anime",
    href: "/categories/anime",
    name: "Anime",
    image: "/figures/anime-logo.jpg",
    glow: "group-hover:border-rose-400/60 group-hover:shadow-[0_0_30px_rgba(244,63,94,0.35)]",
  },
  {
    handle: "star-wars",
    href: "/categories/star-wars",
    name: "Star Wars",
    image: "/figures/star-wars-logo.jpg",
    glow: "group-hover:border-amber-400/60 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.35)]",
  },
  {
    handle: "video-games",
    href: "/categories/video-games",
    name: "Video Games",
    image: "/figures/Mortal-Kombat-Logo.jpg",
    glow: "group-hover:border-yellow-500/70 group-hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]",
  },
]

const UniverseRail = ({ categories }: UniverseRailProps) => {
  const sagas = SAGA_CARDS.map((saga) => {
    const match = categories.find(
      (category) => (category.handle || "").toLowerCase() === saga.handle
    )
    return {
      ...saga,
      href: match ? `/categories/${match.handle}` : saga.href,
    }
  })

  return (
    <section className="content-container py-12 small:py-16">
      <div className="mb-8 flex flex-col gap-2">
        <p className="text-small-semi uppercase tracking-[0.28em] text-vault-neon">
          Universes
        </p>
        <Heading level="h2" className="font-display text-xl-semi text-ui-fg-base">
          Browse by saga
        </Heading>
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
        {sagas.map((saga) => (
          <li key={saga.href}>
            <LocalizedClientLink
              href={saga.href}
              className={`group relative h-48 md:h-56 rounded-2xl overflow-hidden cursor-pointer border border-white/10 transition-all duration-500 hover:-translate-y-2 block ${saga.glow}`}
            >
              <img
                src={saga.image}
                alt={saga.name}
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-75 transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/95 via-[#070b14]/40 to-transparent transition-opacity duration-300 group-hover:opacity-75" />
              <div className="relative z-10 p-5 flex flex-col justify-end h-full">
                <span className="text-xs font-mono tracking-widest text-[#38bdf8] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore Vault
                </span>
                <p className="text-white font-bold text-xl md:text-2xl tracking-wide flex items-center justify-between">
                  <span>{saga.name}</span>
                  <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">
                    →
                  </span>
                </p>
              </div>
            </LocalizedClientLink>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default UniverseRail
