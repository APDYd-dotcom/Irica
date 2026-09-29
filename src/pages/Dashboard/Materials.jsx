import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { useAuth } from "../../hooks/useAuth";
import { useLanguage } from "../../i18n/LanguageContext";
import { ArrowRight, FileText, Image as ImageIcon, Link as LinkIcon, Video } from "lucide-react";

const TYPE_ICONS = {
  text: FileText,
  pdf: FileText,
  link: LinkIcon,
  video: Video,
  photo: ImageIcon,
};

function MicroLabel({ children }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">
      {children}
    </p>
  );
}

function ArticleCard({ article }) {
  const { t } = useLanguage();
  const href = article.url || article.file;
  const Icon = TYPE_ICONS[article.type] || FileText;
  const typeLabel = article.type
    ? t(`dashboard.articles.types.${article.type}`)
    : t("dashboard.articles.types.text");

  return (
    <article className="overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex h-24 items-center justify-center bg-primary-500 sm:h-28">
        <Icon className="h-9 w-9 text-white" />
      </div>
      <div className="p-5">
        <MicroLabel>{typeLabel}</MicroLabel>
        <h3 className="mt-2 break-words text-base font-semibold leading-snug text-neutral-900">
          {article.title || t("dashboard.articles.untitled")}
        </h3>
        <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-neutral-500">
          {article.description || t("dashboard.articles.noDescription")}
        </p>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded text-sm font-semibold text-primary-600 transition-all duration-200 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 focus-visible:ring-offset-2"
          >
            {t("dashboard.articles.open")}
            <ArrowRight className="h-4 w-4" />
          </a>
        ) : (
          <span className="mt-4 inline-flex text-sm font-semibold text-neutral-400">
            {t("dashboard.articles.saved")}
          </span>
        )}
      </div>
    </article>
  );
}

function RegisteredProgramCard({ access, selected, onSelect }) {
  const { t, language } = useLanguage();
  const createdLabel = access.created_at
    ? t("dashboard.programs.accessCreatedOn", {
        date: new Date(access.created_at).toLocaleDateString(
          language === "en" ? "en-US" : "fr-FR"
        ),
      })
    : t("dashboard.programs.accessCreatedRecently");

  return (
    <button
      type="button"
      onClick={() => onSelect(access)}
      aria-pressed={selected}
      className={`w-full rounded-2xl border bg-white p-5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 ${
        selected
          ? "border-primary-500 shadow-sm ring-2 ring-primary-500/15"
          : "border-neutral-200 hover:-translate-y-0.5 hover:shadow-md"
      }`}
    >
      <MicroLabel>{t("dashboard.programs.registeredTag")}</MicroLabel>
      <h2 className="mt-2 break-words text-lg font-bold leading-tight tracking-tight text-neutral-900">
        {access.program_title || t("dashboard.programs.emptyTitle")}
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed text-neutral-500">{createdLabel}</p>
      <span className="mt-5 inline-flex rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700">
        {selected
          ? t("dashboard.programs.viewingArticles")
          : t("dashboard.programs.viewArticles")}
      </span>
    </button>
  );
}

function EmptyState({ title, message }) {
  return (
    <div className="rounded-2xl border border-dashed border-neutral-200 p-6 text-center sm:p-10">
      {title && <p className="text-lg font-bold text-neutral-900">{title}</p>}
      {message && (
        <p className="mt-2 break-words text-[15px] leading-relaxed text-neutral-500">
          {message}
        </p>
      )}
    </div>
  );
}

function Materials() {
  const { user } = useAuth();
  const { t } = useLanguage();
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

  const countLabel =
    accesses.length === 1
      ? t("dashboard.programs.countSingular", { count: accesses.length })
      : t("dashboard.programs.countPlural", { count: accesses.length });

  return (
    <div className="space-y-6 lg:space-y-8">
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:p-8">
        <MicroLabel>{t("dashboard.nav.programs")}</MicroLabel>
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 lg:text-3xl">
              {t("dashboard.programs.sectionTitle")}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-500">
              {t("dashboard.programs.sectionSubtitle")}
            </p>
          </div>
          <p className="w-fit rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700">
            {countLabel}
          </p>
        </div>
      </section>

      {accesses.length === 0 ? (
        <EmptyState
          title={t("dashboard.programs.noneTitle")}
          message={t("dashboard.programs.noneMessage", { email: email || "—" })}
        />
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

          <section className="min-w-0 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            {!selectedAccess ? (
              <EmptyState message={t("dashboard.programs.selectPrompt")} />
            ) : (
              <div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <MicroLabel>{t("dashboard.programs.articlesLabel")}</MicroLabel>
                    <h2 className="mt-2 break-words text-lg font-bold tracking-tight text-neutral-900">
                      {selectedAccess.program_title}
                    </h2>
                  </div>
                  <span className="w-fit rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700">
                    {t("dashboard.programs.registeredChip")}
                  </span>
                </div>

                <div className="mt-5">
                  {articlesLoading ? (
                    <Loader />
                  ) : articlesError ? (
                    <ErrorMessage message={articlesError} />
                  ) : articles.length === 0 ? (
                    <EmptyState message={t("dashboard.programs.noArticles")} />
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
                      {articles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default Materials;
