"use client"

import { usePathname } from "next/navigation"

import { PRICE_CEILING } from "@lib/util/filter-catalog-products"

type CollectibleFiltersProps = {
  selectedScale: string | null
  onScaleChange: (value: string | null) => void
  selectedUniverses: string[]
  onUniversesChange: (value: string[]) => void
  selectedCondition: string | null
  onConditionChange: (value: string | null) => void
  maxPrice: number
  onMaxPriceChange: (value: number) => void
  sortBy: string
  onSortChange: (value: string) => void
}

const UNIVERSES = ["Marvel", "DC Comics", "Anime", "Star Wars", "Video Games"]
const SCALES = ["1/6", "1/7", "1/8", "1/12"]
const CONDITIONS = ["Nuevo en Caja", "Exclusivo", "Limited Drop"]

const CollectibleFilters = ({
  selectedScale,
  onScaleChange,
  selectedUniverses,
  onUniversesChange,
  selectedCondition,
  onConditionChange,
  maxPrice,
  onMaxPriceChange,
  sortBy,
  onSortChange,
}: CollectibleFiltersProps) => {
  const pathname = usePathname()
  const isSpecificCategoryPage =
    pathname.includes("/categories/") &&
    !pathname.includes("/all-figures") &&
    !pathname.includes("/limited-drops")

  const toggleUniverse = (universe: string) => {
    onUniversesChange(
      selectedUniverses.includes(universe)
        ? selectedUniverses.filter((item) => item !== universe)
        : [...selectedUniverses, universe]
    )
  }

  return (
    <aside className="flex flex-col gap-8 py-4 mb-8 small:min-w-[250px] small:ml-0">
      <label className="flex flex-col gap-2 text-sm text-slate-300">
        Sort by
        <select
          className="h-11 rounded-md border border-white/10 bg-[#0b111e] px-3 text-slate-100 focus:border-vault-neon focus:outline-none"
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option key="sort-latest" value="latest">
            Latest arrivals
          </option>
          <option key="sort-price-asc" value="price_asc">
            Price: low to high
          </option>
          <option key="sort-price-desc" value="price_desc">
            Price: high to low
          </option>
        </select>
      </label>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-1">
          Scale
        </legend>
        {SCALES.map((scale) => (
          <label
            key={`scale-${scale}`}
            className="flex items-center gap-2 text-sm text-slate-200"
          >
            <input
              type="radio"
              name="scale"
              checked={selectedScale === scale}
              onChange={() => onScaleChange(scale)}
            />
            {scale}
          </label>
        ))}
        <button
          type="button"
          className="text-left text-xs text-vault-neon"
          onClick={() => onScaleChange(null)}
        >
          Clear scale
        </button>
      </fieldset>

      {!isSpecificCategoryPage && (
        <fieldset className="flex flex-col gap-2 filter-group">
          <legend className="text-xs uppercase tracking-wider text-cyan-400 font-semibold mb-3">
            Universe
          </legend>
          {UNIVERSES.map((universe) => (
            <label
              key={`universe-${universe}`}
              className="flex items-center gap-2 text-sm text-slate-200"
            >
              <input
                type="checkbox"
                checked={selectedUniverses.includes(universe)}
                onChange={() => toggleUniverse(universe)}
              />
              {universe}
            </label>
          ))}
        </fieldset>
      )}

      <fieldset className="flex flex-col gap-2">
        <legend className="text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-1">
          Condition
        </legend>
        {CONDITIONS.map((condition) => (
          <label
            key={`condition-${condition}`}
            className="flex items-center gap-2 text-sm text-slate-200"
          >
            <input
              type="radio"
              name="condition"
              checked={selectedCondition === condition}
              onChange={() => onConditionChange(condition)}
            />
            {condition}
          </label>
        ))}
        <button
          type="button"
          className="text-left text-xs text-vault-neon"
          onClick={() => onConditionChange(null)}
        >
          Clear condition
        </button>
      </fieldset>

      <label className="flex flex-col gap-2 text-sm text-slate-300">
        Max price (USD)
        <input
          type="range"
          min={0}
          max={PRICE_CEILING}
          step={1}
          value={maxPrice}
          onInput={(event) =>
            onMaxPriceChange(Number((event.target as HTMLInputElement).value))
          }
          onChange={(event) => onMaxPriceChange(Number(event.target.value))}
          className="w-full cursor-pointer accent-[#00D2FF]"
        />
        <span className="text-vault-neon">${maxPrice.toFixed(2)}</span>
      </label>
    </aside>
  )
}

export default CollectibleFilters
