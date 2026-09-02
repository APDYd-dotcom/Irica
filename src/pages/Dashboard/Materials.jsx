import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { useAuth } from "../../hooks/useAuth";
import { ArrowRight, FileText, Image, Link as LinkIcon, Video } from "lucide-react";

const TYPE_ICONS = {
  text: FileText,
  pdf: FileText,
  link: LinkIcon,
  video: Video,
  photo: Image,
};

function ArticleCard({ article }) {
  const href = article.url || article.file;
  const Icon = TYPE_ICONS[article.type] || FileText;

  return (
    <article className="overflow-hidden rounded-2xl border border-ink/10 bg-white transition hover:border-forest-800/30 hover:shadow-sm">
      <div className="flex h-24 items-center justify-center bg-forest-800 text-2xl sm:h-28 sm:text-3xl">
        <Icon className="h-9 w-9 text-white" />
      </div>
      <div className="p-4 sm:p-5">
        <p className="eyebrow text-forest-800 mb-2">{article.type || "Article"}</p>
        <h3 className="break-words font-serif text-base leading-snug text-ink">
          {article.title || "Untitled article"}
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-soft">
          {article.description || "No description available."}
        </p>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-forest-800 hover:underline"
          >
            Open article
            <ArrowRight className="h-4 w-4" />
          </a>
        ) : (
          <span className="mt-4 inline-flex text-xs font-semibold text-ink-soft/60">
            Content saved
          </span>
        )}
      </div>
    </article>
  );
}

function RegisteredProgramCard({ access, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(access)}
      className={`w-full rounded-3xl border bg-white p-4 text-left shadow-sm transition sm:p-5 ${
        selected
          ? "border-forest-800 ring-2 ring-forest-800/15"
          : "border-ink/10 hover:border-forest-800/30 hover:shadow-md"
      }`}
    >
      <p className="eyebrow text-forest-800 mb-3">Registered Program</p>
      <h2 className="break-words font-serif text-lg leading-tight text-ink">
        {access.program_title || "Program"}
      </h2>
      <p className="mt-3 text-xs text-ink-soft">
        Access created {access.created_at ? new Date(access.created_at).toLocaleDateString() : "recently"}
      </p>
      <span className="mt-5 inline-flex rounded-full bg-forest-50 px-4 py-2 text-xs font-semibold text-forest-800">
        {selected ? "Viewing articles" : "View articles"}
      </span>
    </button>
  );
}

function Materials() {
  const { user } = useAuth();
  const email = user?.email || user?.username || "";
  const { data, loading, error } = useFetch(
    email ? `/access-programs/?email=${encodeURIComponent(email)}` : null
  );
  const [selectedAccess, setSelectedAccess] = useState(null);
  const accesses = data?.results ?? data ?? [];
  const selectedProgramId = selectedAccess?.program;
  const {
    data: articlesData,
    loading: articlesLoading,
    error: articlesError,
  } = useFetch(selectedProgramId ? `/programs/${selectedProgramId}/articles/` : null);
  const articles = articlesData?.results ?? articlesData ?? [];

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-ink/10 bg-white p-4 shadow-sm sm:p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-ink-soft/70 font-semibold mb-2 sm:text-xs sm:tracking-[0.22em]">
          My Programs
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-xl font-serif text-ink sm:text-2xl">Registered Programs</h1>
            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-ink-soft">
              These are the programs registered to your email. Select one to view its articles.
            </p>
          </div>
          <p className="w-fit rounded-full bg-forest-50 px-4 py-2 text-xs font-semibold text-forest-800">
            {accesses.length} program{accesses.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      {accesses.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-ink/15 bg-white p-6 text-center sm:p-10">
          <p className="font-serif text-lg text-ink sm:text-xl">No registered programs yet</p>
          <p className="mt-2 break-words text-xs text-ink-soft">
            We did not find any program access for {email}.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(260px,340px)_1fr]">
          <aside className="grid gap-4 sm:grid-cols-2 lg:block lg:space-y-4">
            {accesses.map((access) => (
              <RegisteredProgramCard
                key={access.id}
                access={access}
                selected={selectedAccess?.id === access.id}
                onSelect={setSelectedAccess}
              />
            ))}
          </aside>

          <section className="min-w-0 rounded-3xl border border-ink/10 bg-white p-4 shadow-sm sm:p-6">
            {!selectedAccess ? (
              <div className="rounded-2xl border border-dashed border-ink/15 p-6 text-center text-xs text-ink-soft sm:p-10">
                Select a registered program to view its articles.
              </div>
            ) : (
              <div>
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.18em] text-ink-soft/70 font-semibold sm:text-xs sm:tracking-[0.22em]">
                      Articles
                    </p>
                    <h2 className="mt-1 break-words text-lg font-serif text-ink sm:text-xl">
                      {selectedAccess.program_title}
                    </h2>
                  </div>
                  <span className="w-fit rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
                    Registered
                  </span>
                </div>

                {articlesLoading ? (
                  <Loader />
                ) : articlesError ? (
                  <ErrorMessage message={articlesError} />
                ) : articles.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-ink/15 p-6 text-center text-xs text-ink-soft sm:p-8">
                    No articles are attached to this program yet.
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
                    {articles.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default Materials;
