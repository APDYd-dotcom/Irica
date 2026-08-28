import { ArrowRight, BookOpen, FileText, Link as LinkIcon, LockKeyhole, Video } from "lucide-react";

const TYPE_LABELS = {
  book: "Book",
  video: "Video",
  link: "Online Link",
};

const TYPE_ICONS = {
  book: BookOpen,
  video: Video,
  link: LinkIcon,
};

function MaterialCard({ material, unlocked }) {
  const Icon = TYPE_ICONS[material.material_type] || FileText;

  return (
    <article className="group overflow-hidden rounded-2xl border border-ink/10 bg-white transition hover:border-forest-800/30 hover:shadow-sm">
      <div className="relative flex h-32 items-center justify-center bg-forest-800">
        <Icon className="h-10 w-10 text-white opacity-90" />
        {!unlocked && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-forest-800 shadow-sm">
            <LockKeyhole className="h-3.5 w-3.5" />
            Locked
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
            className="inline-flex items-center gap-2 text-sm font-medium text-forest-800 group-hover:underline"
          >
            Read more
            <ArrowRight className="h-4 w-4" />
          </a>
        ) : (
          <span className="inline-flex cursor-not-allowed items-center gap-2 text-sm font-medium text-ink-soft/50">
            Subscribe to unlock
            <LockKeyhole className="h-4 w-4" />
          </span>
        )}
      </div>
    </article>
  );
}

export default MaterialCard;
