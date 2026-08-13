import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { useAuth } from "../../hooks/useAuth";

const TYPE_ICONS = {
  text: "📝",
  pdf: "📄",
  link: "🔗",
  video: "🎬",
  photo: "🖼️",
};

function ArticleCard({ article }) {
  const href = article.url || article.file;

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
            Open article →
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

function RegisteredProgramCard({ access, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(access)}
      className={`rounded-3xl border bg-white p-5 text-left shadow-sm transition ${
        selected
          ? "border-forest-800 ring-2 ring-forest-800/15"
          : "border-ink/10 hover:border-forest-800/30 hover:shadow-md"
      }`}
    >
      <p className="eyebrow text-forest-800 mb-3">Registered Program</p>
      <h2 className="font-serif text-xl leading-tight text-ink">
        {access.program_title || "Program"}
      </h2>
      <p className="mt-3 text-sm text-ink-soft">
        Access created {access.created_at ? new Date(access.created_at).toLocaleDateString() : "recently"}
      </p>
      <span className="mt-5 inline-flex rounded-full bg-forest-50 px-4 py-2 text-sm font-semibold text-forest-800">
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
      <section className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.22em] text-ink-soft/70 font-semibold mb-2">
          My Programs
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-serif text-ink">Registered Programs</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
              These are the programs registered to your email. Select one to view its articles.
            </p>
          </div>
          <p className="w-fit rounded-full bg-forest-50 px-4 py-2 text-sm font-semibold text-forest-800">
            {accesses.length} program{accesses.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      {accesses.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-ink/15 bg-white p-10 text-center">
          <p className="font-serif text-2xl text-ink">No registered programs yet</p>
          <p className="mt-2 text-sm text-ink-soft">
            We did not find any program access for {email}.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
          <aside className="space-y-4">
            {accesses.map((access) => (
              <RegisteredProgramCard
                key={access.id}
                access={access}
                selected={selectedAccess?.id === access.id}
                onSelect={setSelectedAccess}
              />
            ))}
          </aside>

          <section className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm">
            {!selectedAccess ? (
              <div className="rounded-2xl border border-dashed border-ink/15 p-10 text-center text-sm text-ink-soft">
                Select a registered program to view its articles.
              </div>
            ) : (
              <div>
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-ink-soft/70 font-semibold">
                      Articles
                    </p>
                    <h2 className="mt-1 text-2xl font-serif text-ink">
                      {selectedAccess.program_title}
                    </h2>
                  </div>
                  <span className="w-fit rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                    Registered
                  </span>
                </div>

                {articlesLoading ? (
                  <Loader />
                ) : articlesError ? (
                  <ErrorMessage message={articlesError} />
                ) : articles.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-ink/15 p-8 text-center text-sm text-ink-soft">
                    No articles are attached to this program yet.
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
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
