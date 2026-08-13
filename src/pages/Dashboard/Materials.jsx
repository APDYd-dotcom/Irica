import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axiosClient from "../../api/axiosClient";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { getErrorMessage } from "../../utils/getErrorMessage";

const TYPE_ICONS = {
  text: "📝",
  pdf: "📄",
  link: "🔗",
  video: "🎬",
  photo: "🖼️",
};

const STATUS_LABELS = {
  enrollment: "Enrollment",
  inprogress: "In Progress",
  completed: "Completed",
};

function ArticleCard({ article }) {
  const href = article.url || article.file;
  const isMedia = article.type === "video" || article.type === "photo";

  return (
    <article className="overflow-hidden rounded-2xl border border-ink/10 bg-white transition hover:border-forest-800/30 hover:shadow-sm">
      <div className="flex h-28 items-center justify-center bg-forest-800 text-4xl">
        {TYPE_ICONS[article.type] || "📄"}
      </div>
      <div className="p-5">
        <p className="eyebrow text-forest-800 mb-2">{article.type || "Article"}</p>
        <h3 className="font-serif text-lg leading-snug text-ink">
          {article.title || "Untitled article"}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
          {article.description || "No description available."}
        </p>

        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex text-sm font-semibold text-forest-800 hover:underline"
          >
            {isMedia ? "Open media" : "Open article"} →
          </a>
        ) : (
          <span className="mt-4 inline-flex text-sm font-semibold text-ink-soft/60">
            Content saved
          </span>
        )}
      </div>
    </article>
  );
}

function ProgramCard({ program, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(program)}
      className={`group overflow-hidden rounded-3xl border bg-white text-left shadow-sm transition ${
        selected
          ? "border-forest-800 ring-2 ring-forest-800/15"
          : "border-ink/10 hover:border-forest-800/30 hover:shadow-md"
      }`}
    >
      {program.photo ? (
        <img src={program.photo} alt={program.title} className="h-40 w-full object-cover" />
      ) : (
        <div className="flex h-40 items-center justify-center bg-forest-800 text-5xl text-white">
          🎓
        </div>
      )}

      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h2 className="font-serif text-xl leading-tight text-ink group-hover:text-forest-800">
            {program.title}
          </h2>
          <span className="shrink-0 rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-800">
            {program.is_free ? "Free" : `${program.price || 0} FBU`}
          </span>
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-ink-soft">
          {program.descr || "No description available."}
        </p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-ink-soft">
            {program.articles_count ?? 0} article{program.articles_count === 1 ? "" : "s"}
          </span>
          <span className="font-semibold text-forest-800">
            {selected ? "Selected" : "Unlock"}
          </span>
        </div>
      </div>
    </button>
  );
}

function Materials() {
  const { data, loading, error } = useFetch("/programs/");
  const programs = data?.results ?? data ?? [];
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [formData, setFormData] = useState({ email: "", access_code: "" });
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState(null);
  const [unlocked, setUnlocked] = useState(null);

  function handleSelect(program) {
    setSelectedProgram(program);
    setUnlocked(null);
    setVerifyError(null);
  }

  function handleVerify(e) {
    e.preventDefault();
    if (!selectedProgram) {
      setVerifyError("Please select a program first.");
      return;
    }

    setVerifying(true);
    setVerifyError(null);

    axiosClient
      .post("/access-programs/verify/", formData)
      .then((response) => {
        const payload = response.data || {};
        setUnlocked({
          program: payload.program || selectedProgram,
          articles: payload.articles || payload.program?.articles || [],
        });
      })
      .catch((err) => setVerifyError(getErrorMessage(err)))
      .finally(() => setVerifying(false));
  }

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  const articles = unlocked?.articles || [];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.22em] text-ink-soft/70 font-semibold mb-2">
          Program Access
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-serif text-ink">Programs & Articles</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
              Select a program, enter the email and access code you received, then view its articles.
            </p>
          </div>
          <p className="w-fit rounded-full bg-forest-50 px-4 py-2 text-sm font-semibold text-forest-800">
            {programs.length} program{programs.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="space-y-4">
          <h2 className="text-lg font-serif text-ink">Choose a program</h2>
          {programs.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-ink/15 bg-white p-10 text-center text-sm text-ink-soft">
              No programs are available yet.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {programs.map((program) => (
                <ProgramCard
                  key={program.id}
                  program={program}
                  selected={selectedProgram?.id === program.id}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          )}
        </section>

        <aside className="rounded-3xl border border-ink/10 bg-white p-5 shadow-sm h-fit">
          <h2 className="text-lg font-serif text-ink">Unlock Articles</h2>
          <p className="mt-1 text-sm text-ink-soft">
            {selectedProgram ? selectedProgram.title : "Select a program to continue."}
          </p>

          {verifyError && <div className="mt-4"><ErrorMessage message={verifyError} /></div>}

          <form onSubmit={handleVerify} className="mt-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
                className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Access Code</label>
              <input
                value={formData.access_code}
                onChange={(e) => setFormData((prev) => ({ ...prev, access_code: e.target.value }))}
                required
                className="w-full rounded-lg border border-ink/15 px-4 py-2.5 uppercase tracking-[0.16em] focus:outline-none focus:ring-2 focus:ring-forest-800/40"
              />
            </div>
            <button
              type="submit"
              disabled={verifying || !selectedProgram}
              className="w-full rounded-full bg-forest-800 py-3 font-semibold text-white transition hover:bg-forest-700 disabled:opacity-50"
            >
              {verifying ? "Verifying..." : "View Articles"}
            </button>
          </form>
        </aside>
      </div>

      {unlocked && (
        <section className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-ink-soft/70 font-semibold">
                {STATUS_LABELS[unlocked.program?.status] || "Unlocked"}
              </p>
              <h2 className="mt-1 text-2xl font-serif text-ink">
                {unlocked.program?.title || selectedProgram?.title}
              </h2>
            </div>
            <span className="w-fit rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              Access granted
            </span>
          </div>

          {articles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-ink/15 p-8 text-center text-sm text-ink-soft">
              No articles are attached to this program yet.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default Materials;
