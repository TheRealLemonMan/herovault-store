export default function Loading() {
  return (
    <div className="content-container flex min-h-[50vh] flex-col items-center justify-center gap-4 py-24">
      <div className="h-11 w-11 rounded-full border-2 border-white/10 border-t-vault-neon animate-spin" />
      <p className="text-xs font-mono uppercase tracking-[0.28em] text-vault-neon">
        Loading vault
      </p>
    </div>
  )
}
