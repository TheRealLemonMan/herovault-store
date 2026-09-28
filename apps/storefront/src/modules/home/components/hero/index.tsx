import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section className="relative flex w-full min-h-[600px] lg:min-h-[700px] items-center overflow-hidden bg-[#070b14]">
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figures/hero-group.png"
          alt="Hero Vault Collector Figures"
          className="h-full w-full object-cover object-right md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b14] via-[#070b14]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#070b14] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 lg:px-12">
        <div className="max-w-2xl">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-widest text-[#38bdf8]">
            Heroes & Legends Vault
          </span>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
            Collect the figures that defined the screen.
          </h1>
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-300">
            Marvel, DC, anime, and limited sci-fi drops. Premium 1/6 and 1/12
            statues, sealed and exclusive editions.
          </p>
          <LocalizedClientLink href="/store">
            <button
              type="button"
              data-testid="hero-cta"
              className="rounded-xl bg-red-600 px-8 py-3.5 font-semibold text-white shadow-[0_0_25px_rgba(225,29,72,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500"
            >
              Shop featured figures
            </button>
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

export default Hero
