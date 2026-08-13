import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

const TYPE_ICONS = {
  text: "📝",
  pdf: "📄",
  link: "🔗",
  video: "🎬",
  photo: "🖼️",
};

function SmallItem({ title, subtitle, href }) {
  return (
    <Link to={href} className="block rounded-2xl border border-ink/10 bg-white p-4 transition hover:border-forest-800/30 hover:shadow-sm">
      <p className="text-xs uppercase tracking-[0.18em] text-ink-soft/70 font-semibold mb-2">{subtitle}</p>
      <h3 className="font-medium text-ink leading-snug">{title}</h3>
    </Link>
  );
}

function StatCard({ label, value, note }) {
  return (
    <div className="rounded-3xl border border-ink/10 bg-white p-5 shadow-sm">
      <p className="text-sm text-ink-soft">{label}</p>
      <p className="mt-2 text-4xl font-semibold text-ink">{value}</p>
      <p className="mt-2 text-sm text-ink-soft/80">{note}</p>
    </div>
  );
}

export default function DashboardHome() {
  const { data: articles, loading: aLoading } = useFetch("/articles/");
  const { data: programs, loading: pLoading } = useFetch("/programs/");
  const { data: publications, loading: pubLoading } = useFetch("/publications/");

  const loading = aLoading || pLoading || pubLoading;

  if (loading) return <Loader />;

  const articleList = articles?.results || articles || [];
  const progList = programs?.results || programs || [];
  const pubList = publications?.results || publications || [];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm">
        <div className="grid gap-5 lg:grid-cols-[1fr_220px] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-ink-soft/70 font-semibold mb-2">
              Overview
            </p>
            <h2 className="text-3xl font-serif text-ink">Your learning dashboard</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
              Browse available programs, unlock access with your code, and keep up with latest articles.
            </p>
          </div>

          <Link
            to="materials"
            className="inline-flex items-center justify-center rounded-full bg-forest-800 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-forest-700"
          >
            Unlock articles
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Articles"
          value={articles?.count ?? articleList.length ?? 0}
          note="Published learning content"
        />
        <StatCard
          label="Programs"
          value={programs?.count ?? progList.length ?? 0}
          note="Published learning programs"
        />
        <StatCard
          label="Publications"
          value={publications?.count ?? pubList.length ?? 0}
          note="Reports and papers"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_0.9fr] gap-6">
        <section className="rounded-3xl border border-ink/10 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-serif text-ink">Recent Articles</h2>
              <p className="text-sm text-ink-soft">Latest articles published across programs.</p>
            </div>
            <Link to="materials" className="text-sm font-semibold text-forest-800 hover:underline">See all</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articleList.slice(0, 4).map((article) => (
              <SmallItem
                key={article.id}
                title={article.title || "Untitled article"}
                subtitle={`${TYPE_ICONS[article.type] || "📄"} ${article.program_title || article.type || "Article"}`}
                href="materials"
              />
            ))}
            {articleList.length === 0 && (
              <div className="rounded-2xl border border-dashed border-ink/15 p-6 text-sm text-ink-soft">
                No articles are available yet.
              </div>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-ink/10 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-serif text-ink">Latest Updates</h2>
              <p className="text-sm text-ink-soft">Programs, publications, and activities.</p>
            </div>
            <Link to="/" className="text-sm font-semibold text-forest-800 hover:underline">View site</Link>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {pubList.slice(0, 3).map((p) => (
              <SmallItem key={p.id} title={p.title || p.name} subtitle={p.category || "Publication"} href={p.url || p.file || "/"} />
            ))}

            {progList.slice(0, 3).map((p) => (
              <SmallItem key={`prog-${p.id}`} title={p.title || p.name} subtitle={p.status || "Program"} href="materials" />
            ))}

            {pubList.length + progList.length === 0 && (
              <div className="rounded-2xl border border-dashed border-ink/15 p-6 text-sm text-ink-soft">
                No updates yet.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
