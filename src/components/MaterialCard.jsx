const TYPE_LABELS = {
  book: "Book",
  video: "Video",
  link: "Online Link",
};

const TYPE_ICONS = {
  book: "📘",
  video: "🎬",
  link: "🔗",
};

// unlocked = true → real file/url link shown
// unlocked = false → styled as locked, with a "Subscribe to unlock" line
function MaterialCard({ material, unlocked }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-ink/10 bg-white transition hover:border-forest-800/30 hover:shadow-sm">
      {/* Thumbnail band — duotone-style forest block standing in for real imagery */}
      <div className="relative flex h-32 items-center justify-center bg-forest-800">
        <span className="text-4xl opacity-90">{TYPE_ICONS[material.material_type] || "📄"}</span>
        {!unlocked && (
          <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-forest-800 shadow-sm">
            🔒 Locked
          </span>
        )}
      </div>

      <div className="p-5">
        <p className="eyebrow text-forest-800 mb-2">{TYPE_LABELS[material.material_type] || "Resource"}</p>
        <h3 className="font-serif text-lg text-ink mb-2 leading-snug">{material.title}</h3>
        <p className="text-sm text-ink-soft leading-relaxed mb-4 line-clamp-2">
          {material.description}
        </p>

        {unlocked ? (
          <a
            href={material.url || material.file}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-forest-800 group-hover:underline"
          >
            Read more →
          </a>
        ) : (
          <span className="text-sm font-medium text-ink-soft/50 cursor-not-allowed">
            Subscribe to unlock →
          </span>
        )}
      </div>
    </article>
  );
}

export default MaterialCard;
