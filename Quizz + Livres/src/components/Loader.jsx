export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-20 animate-fadeUp">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse3"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
      <p className="font-mono text-xs tracking-widest text-muted">Chargement des questions…</p>
    </div>
  )
}
