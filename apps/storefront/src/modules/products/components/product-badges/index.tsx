import { clx } from "@modules/common/components/ui"
import { CollectibleMetadata } from "@lib/util/product-metadata"

type ProductBadgesProps = {
  meta: CollectibleMetadata
  className?: string
}

const ProductBadges = ({ meta, className }: ProductBadgesProps) => {
  const badges = [
    meta.universe
      ? { key: "universe", label: meta.universe, tone: "universe" as const }
      : null,
    meta.scale
      ? { key: "scale", label: meta.scale, tone: "scale" as const }
      : null,
    meta.condition
      ? {
          key: "condition",
          label: meta.condition,
          tone:
            meta.badgeType === "exclusive"
              ? ("exclusive" as const)
              : meta.badgeType === "limited"
              ? ("limited" as const)
              : /exclusiv/i.test(meta.condition)
              ? ("exclusive" as const)
              : /limit/i.test(meta.condition)
              ? ("limited" as const)
              : ("new" as const),
        }
      : null,
  ].filter(Boolean) as {
    key: string
    label: string
    tone: "universe" | "scale" | "exclusive" | "limited" | "new"
  }[]

  if (!badges.length) {
    return null
  }

  return (
    <div className={clx("flex flex-wrap gap-1.5", className)}>
      {badges.map((badge) => (
        <span
          key={badge.key}
          className={clx(
            "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
            {
              "border-vault-neon/50 bg-vault-neon/10 text-vault-neon":
                badge.tone === "universe",
              "border-white/15 bg-white/5 text-slate-300": badge.tone === "scale",
              "border-vault-accent/60 bg-vault-accent/15 text-vault-accent":
                badge.tone === "exclusive",
              "border-amber-400/50 bg-amber-400/10 text-amber-300":
                badge.tone === "limited",
              "border-sky-400/50 bg-sky-400/10 text-sky-300": badge.tone === "new",
            }
          )}
        >
          {badge.label}
        </span>
      ))}
    </div>
  )
}

export default ProductBadges
