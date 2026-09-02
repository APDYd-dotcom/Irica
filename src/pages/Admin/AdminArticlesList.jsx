import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { handleDelete } from "../../utils/formHandles";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { ArrowRight, FileText, GraduationCap, Image, Inbox, Link as LinkIcon, Video } from "lucide-react";

const TYPE_ICONS = {
  text: FileText,
  pdf: FileText,
  link: LinkIcon,
  video: Video,
  photo: Image,
};

const TYPE_LABELS = {
  text:  "Text",
  pdf:   "Document",
  link:  "Link",
  video: "Video",
  photo: "Photo",
};

const STATUS_COLORS = {
  enrollment: "bg-emerald-50 text-emerald-700 border-emerald-200",
  inprogress: "bg-amber-50  text-amber-700  border-amber-200",
  completed:  "bg-slate-50  text-slate-500  border-slate-200",
};

function ProgramGrid({ programs, loading, error, onSelect }) {
  if (loading) return <Loader />;
  if (error)   return <ErrorMessage message={error} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-ink-soft/70 font-semibold mb-2">
          Content management
        </p>
        <h1 className="text-2xl font-serif text-ink">Articles</h1>
        <p className="mt-2 text-xs text-ink-soft max-w-2xl">
          Select a program to view and manage its articles.
        </p>
      </div>

      {/* Cards */}
      {programs.length === 0 ? (
        <div className="rounded-3xl border border-ink/10 bg-white p-10 text-center text-xs text-ink-soft">
          No programs found. Create a program first.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <button
              key={program.id}
              onClick={() => onSelect(program)}
              className="group text-left rounded-3xl border border-ink/10 bg-white shadow-sm overflow-hidden hover:border-forest-400 hover:shadow-md transition-all duration-200"
            >
              {/* Program photo */}
              {program.photo ? (
                <div className="h-36 overflow-hidden">
                  <img
                    src={program.photo}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="h-36 bg-gradient-to-br from-forest-50 to-forest-100 flex items-center justify-center text-4xl">
                  <GraduationCap className="h-10 w-10 text-primary-700" />
                </div>
              )}

              {/* Info */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h2 className="font-semibold text-xl text-ink leading-snug group-hover:text-forest-800 transition">
                    {program.title}
                  </h2>
                  <span
                    className={`shrink-0 inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide
                      ${STATUS_COLORS[program.status] ?? "bg-slate-50 text-slate-500 border-slate-200"}`}
                  >
                    {program.status}
                  </span>
                </div>

                <p className="text-xs text-ink-soft line-clamp-2 mb-4">
                  {program.descr || "No description."}
                </p>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-soft">
                    {program.articles_count ?? 0} article{program.articles_count !== 1 ? "s" : ""}
                  </span>
                  <span className="inline-flex items-center gap-2 text-forest-800 font-semibold group-hover:underline">
                    View articles
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ArticlesTable({ program, onBack }) {
  const { data, loading, error } = useFetch(`/articles/?program=${program.id}`);
  const [items, setItems]       = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const articles = items ?? data?.results ?? data ?? [];

  function handleRemove(id) {
    if (!window.confirm("Delete this article? This can't be undone.")) return;
    handleDelete(
      `/articles/${id}/`,
      () => setItems(articles.filter((a) => a.id !== id)),
      (msg) => setDeleteError(msg)
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="grid gap-4 md:grid-cols-[1fr_auto] items-start">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-ink-soft hover:text-forest-800 transition mb-3"
          >
            ← All programs
          </button>
          <p className="text-xs uppercase tracking-[0.24em] text-ink-soft/70 font-semibold mb-1">
            {program.title}
          </p>
          <h1 className="text-2xl font-serif text-ink">Articles</h1>
          <p className="mt-1 text-xs text-ink-soft">
            Manage articles linked to this program.
          </p>
        </div>

        <Link
          to={`/admin/articles/new?program=${program.id}`}
          className="inline-flex items-center justify-center rounded-full bg-forest-800 px-5 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-forest-700 whitespace-nowrap"
        >
          + Add article
        </Link>
      </div>

      {/* Selected program mini-card */}
      <div className="flex items-center gap-4 rounded-2xl border border-forest-200 bg-forest-50 p-4">
        {program.photo && (
          <img
            src={program.photo}
            alt={program.title}
            className="h-14 w-14 rounded-xl object-cover shrink-0"
          />
        )}
        <div className="min-w-0">
          <p className="font-semibold text-ink truncate">{program.title}</p>
          <p className="text-xs text-ink-soft line-clamp-1">{program.descr}</p>
        </div>
        <span className={`ml-auto shrink-0 rounded-full border px-3 py-1 text-xs font-semibold uppercase
          ${STATUS_COLORS[program.status] ?? "bg-slate-50 text-slate-500 border-slate-200"}`}>
          {program.status}
        </span>
      </div>

      {deleteError && (
        <div className="rounded-3xl border border-red-100 bg-red-50 p-4 text-red-700 text-xs">
          {deleteError}
        </div>
      )}

      {/* Count badge */}
      <div className="rounded-3xl border border-ink/10 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-ink-soft">Total articles</p>
            <p className="text-3xl font-semibold text-ink">
              {loading ? "…" : articles.length}
            </p>
          </div>
          <p className="rounded-full bg-forest-50 px-4 py-2 text-xs font-medium text-forest-800">
            {program.title}
          </p>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm">
          {/* Table header */}
          <div className="grid grid-cols-[48px_1.8fr_120px_100px_100px] gap-4 px-5 py-4 text-xs uppercase tracking-[0.25em] text-ink-soft bg-slate-50 border-b border-ink/10">
            <span>#</span>
            <span>Title</span>
            <span>Type</span>
            <span className="text-right">Edit</span>
            <span className="text-right">Delete</span>
          </div>

          {articles.length === 0 ? (
            <div className="px-5 py-14 text-center">
              <Inbox className="mx-auto mb-3 h-10 w-10 text-primary-700" />
              <p className="text-xs text-ink-soft">No articles yet for this program.</p>
              <Link
                to={`/admin/articles/new?program=${program.id}`}
                className="inline-block mt-4 text-xs font-semibold text-forest-800 hover:underline"
              >
                + Add the first article
              </Link>
            </div>
          ) : (
            articles.map((article) => (
              (() => {
                const Icon = TYPE_ICONS[article.type] || FileText;
                return (
              <div
                key={article.id}
                className="grid grid-cols-[48px_1.8fr_120px_100px_100px] gap-4 items-center px-5 py-4 border-b border-ink/5 last:border-0 hover:bg-slate-50 transition"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-forest-50 text-base">
                  <Icon className="h-5 w-5 text-primary-700" />
                </div>

                <div className="min-w-0">
                  <p className="font-medium text-ink truncate">{article.title || "Untitled"}</p>
                  <p className="text-xs text-ink-soft/70 line-clamp-1">
                    {article.description || "No description"}
                  </p>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-ink-soft capitalize">
                  <Icon className="h-3.5 w-3.5" />
                  {TYPE_LABELS[article.type] ?? article.type}
                </span>

                <Link
                  to={`/admin/articles/${article.id}/edit`}
                  className="text-xs font-medium text-forest-800 hover:underline text-right"
                >
                  Edit
                </Link>

                {/* Delete */}
                <button
                  onClick={() => handleRemove(article.id)}
                  className="text-xs font-medium text-red-600 hover:underline text-right"
                >
                  Delete
                </button>
              </div>
                );
              })()
            ))
          )}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   ROOT — wires the two steps together
═════════════════════════════════════════════════════════════ */
function AdminArticlesList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, loading, error } = useFetch("/programs/");
  const programs = data?.results ?? data ?? [];
  const selectedProgramId = searchParams.get("program");
  const selectedProgram = selectedProgramId
    ? programs.find((program) => String(program.id) === selectedProgramId)
    : null;

  function handleSelectProgram(program) {
    setSearchParams({ program: String(program.id) });
  }

  function handleBackToPrograms() {
    setSearchParams({});
  }

  if (selectedProgram) {
    return (
      <ArticlesTable
        program={selectedProgram}
        onBack={handleBackToPrograms}
      />
    );
  }

  return (
    <ProgramGrid
      programs={programs}
      loading={loading}
      error={error}
      onSelect={handleSelectProgram}
    />
  );
}

export default AdminArticlesList;
