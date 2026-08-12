/**
 * UploadProgress — shows an animated progress bar while a file is uploading.
 *
 * Props:
 *  progress  — number 0–100  (the upload % from XHR/Axios onUploadProgress)
 *  fileName  — string        (optional, shown next to the bar)
 *  type      — string        (article type label, e.g. "video", "pdf", "text")
 */

const TYPE_META = {
  video:  { icon: "🎬", color: "from-violet-500 to-purple-600", label: "Uploading video" },
  pdf:    { icon: "📄", color: "from-blue-500   to-indigo-600", label: "Uploading document" },
  text:   { icon: "📝", color: "from-teal-500   to-emerald-600", label: "Saving article" },
  photo:  { icon: "🖼️", color: "from-pink-500   to-rose-600",   label: "Uploading image" },
  link:   { icon: "🔗", color: "from-amber-500  to-orange-600", label: "Saving link" },
};

function UploadProgress({ progress = 0, fileName = "", type = "text" }) {
  const meta = TYPE_META[type] ?? TYPE_META.text;
  const pct  = Math.min(100, Math.max(0, Math.round(progress)));
  const done = pct >= 100;

  return (
    <div className="rounded-2xl border border-ink/10 bg-white shadow-sm p-5 space-y-3 animate-fade-in">

      {/* Top row — icon + label + % */}
      <div className="flex items-center gap-3">
        <div className="text-2xl">{meta.icon}</div>

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
            done ? "text-emerald-600" : "text-ink"
          }`}
        >
          {done ? "✓ 100%" : `${pct}%`}
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
          ? "Redirecting to articles list…"
          : pct < 30
          ? "Starting upload…"
          : pct < 70
          ? "Transferring file to server…"
          : "Almost done, processing on server…"}
      </p>
    </div>
  );
}

export default UploadProgress;
