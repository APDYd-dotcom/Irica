import { CheckCircle2, FileText, Image, Link as LinkIcon, Library, Video } from "lucide-react";

const TYPE_META = {
  video: { icon: Video, color: "from-primary-500 to-primary-300", label: "Uploading video" },
  pdf: { icon: FileText, color: "from-primary-500 to-primary-300", label: "Uploading document" },
  text: { icon: FileText, color: "from-primary-500 to-primary-300", label: "Saving article" },
  photo: { icon: Image, color: "from-primary-500 to-primary-300", label: "Uploading image" },
  link: { icon: LinkIcon, color: "from-primary-500 to-primary-300", label: "Saving link" },
  publication: { icon: Library, color: "from-primary-500 to-primary-300", label: "Uploading publication" },
};

function UploadProgress({ progress = 0, fileName = "", type = "text" }) {
  const meta = TYPE_META[type] ?? TYPE_META.text;
  const Icon = done ? CheckCircle2 : meta.icon;
  const pct  = Math.min(100, Math.max(0, Math.round(progress)));
  const done = pct >= 100;

  return (
    <div className="rounded-2xl border border-ink/10 bg-white shadow-sm p-5 space-y-3 animate-fade-in">

      {/* Top row — icon + label + % */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
          <Icon className="h-5 w-5" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-ink">
            {done ? "Upload complete!" : meta.label}
          </p>
          {fileName && (
            <p className="text-xs text-ink-soft truncate mt-0.5">{fileName}</p>
          )}
        </div>

        <span
          className={`text-sm font-bold tabular-nums transition-all ${
            done ? "text-primary-700" : "text-ink"
          }`}
        >
          {done ? "100%" : `${pct}%`}
        </span>
      </div>

      {/* Progress track */}
      <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${meta.color} transition-all duration-300 ease-out ${
            !done ? "animate-pulse-subtle" : ""
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Bottom hint */}
      <p className="text-xs text-ink-soft/70">
        {done
          ? "Upload finished. Processing and redirecting..."
          : pct < 30
          ? "Starting upload..."
          : pct < 70
          ? "Transferring file to server..."
          : "Almost done, processing on server..."}
      </p>
    </div>
  );
}

export default UploadProgress;
