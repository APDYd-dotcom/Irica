import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader";
import MaterialCard from "../../components/MaterialCard";
import { Link } from "react-router-dom";

function SmallItem({ title, subtitle, href }) {
  return (
    <Link to={href} className="block p-3 bg-white border border-ink/10 rounded-lg hover:shadow-sm">
      <p className="text-sm text-ink-soft mb-1">{subtitle}</p>
      <h3 className="font-medium text-ink">{title}</h3>
    </Link>
  );
}

export default function DashboardHome() {
  const { data: materials, loading: mLoading } = useFetch("/materials/");
  const { data: programs, loading: pLoading } = useFetch("/programs/");
  const { data: publications, loading: pubLoading } = useFetch("/publications/");
  const { data: activities, loading: aLoading } = useFetch("/activities/");

  const loading = mLoading || pLoading || pubLoading || aLoading;

  if (loading) return <Loader />;

  const matList = materials?.results || materials || [];
  const progList = programs?.results || programs?.results || [];
  const pubList = publications?.results || publications?.results || [];
  const actList = activities?.results || activities?.results || [];

  return (
    <div className="space-y-8">
      {/* Header / stats */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-ink">Dashboard</h1>
          <p className="text-sm text-ink-soft">Quick summary and recent items</p>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white border border-ink/10 rounded-lg">
          <p className="text-sm text-ink-soft">Materials</p>
          <p className="text-2xl font-semibold text-ink">{materials?.count ?? matList.length ?? 0}</p>
          <p className="text-sm text-ink-soft mt-2">Your resources available</p>
        </div>

        <div className="p-5 bg-white border border-ink/10 rounded-lg">
          <p className="text-sm text-ink-soft">Programs</p>
          <p className="text-2xl font-semibold text-ink">{programs?.count ?? progList.length ?? 0}</p>
          <p className="text-sm text-ink-soft mt-2">Active programs</p>
        </div>

        <div className="p-5 bg-white border border-ink/10 rounded-lg">
          <p className="text-sm text-ink-soft">Publications</p>
          <p className="text-2xl font-semibold text-ink">{publications?.count ?? pubList.length ?? 0}</p>
          <p className="text-sm text-ink-soft mt-2">Recent reports & papers</p>
        </div>
      </div>

      {/* Recent items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif">Recent Materials</h2>
            <Link to="materials" className="text-sm text-forest-800">See all</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {matList.slice(0, 4).map((m) => (
              <MaterialCard key={m.id} material={m} unlocked={Boolean(m.url || m.file)} />
            ))}
            {matList.length === 0 && <p className="text-sm text-ink-soft">No materials yet.</p>}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif">Latest Publications & Programs</h2>
            <Link to="/" className="text-sm text-forest-800">View on site</Link>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {pubList.slice(0, 3).map((p) => (
              <SmallItem key={p.id} title={p.title || p.name} subtitle={p.category || "Publication"} href={p.url || p.file || "/"} />
            ))}

            {progList.slice(0, 3).map((p) => (
              <SmallItem key={`prog-${p.id}`} title={p.title || p.name} subtitle={p.type || "Program"} href={`/programs/${p.id}`} />
            ))}

            {actList.slice(0, 2).map((a) => (
              <SmallItem key={`act-${a.id}`} title={a.title || a.name || a.activity} subtitle={a.date || "Activity"} href={a.url || "/"} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
