import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function SmallItem({ title, subtitle, href }) {
  return (
    <Link to={href} className="block rounded-2xl border border-ink/10 bg-white p-4 transition hover:border-forest-800/30 hover:shadow-sm">
      <p className="text-xs uppercase tracking-[0.18em] text-ink-soft/70 font-semibold mb-2">{subtitle}</p>
      <h3 className="break-words font-medium text-ink leading-snug">{title}</h3>
    </Link>
  );
}

function StatCard({ label, value, note }) {
  return (
    <div className="rounded-3xl border border-ink/10 bg-white p-5 shadow-sm">
      <p className="text-xs text-ink-soft">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">{value}</p>
      <p className="mt-2 break-words text-xs text-ink-soft/80">{note}</p>
    </div>
  );
}

export default function DashboardHome() {
  const { user } = useAuth();
  const email = user?.email || user?.username || "";
  const { data: accessData, loading: accessLoading } = useFetch(
    email ? `/access-programs/?email=${encodeURIComponent(email)}` : null
  );
  const { data: publications, loading: pubLoading } = useFetch("/publications/");

  const loading = accessLoading || pubLoading;

  if (loading) return <Loader />;

  const accessList = accessData?.results || accessData || [];
  const pubList = publications?.results || publications || [];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-ink/10 bg-white p-4 shadow-sm sm:p-6">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-ink-soft/70 font-semibold mb-2 sm:text-xs sm:tracking-[0.22em]">
              Overview
            </p>
            <h2 className="text-xl font-serif text-ink sm:text-2xl">Your learning dashboard</h2>
            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-ink-soft">
              View programs registered to your email and open their related articles.
            </p>
          </div>

          <Link
            to="programs"
            className="inline-flex w-full items-center justify-center rounded-full bg-forest-800 px-5 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-forest-700 sm:w-auto"
          >
            View my programs
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Registered Programs"
          value={accessData?.count ?? accessList.length ?? 0}
          note="Linked to your email"
        />
        <StatCard
          label="Email"
          value={email ? "1" : "0"}
          note={email || "No email saved"}
        />
        <StatCard
          label="Publications"
          value={publications?.count ?? pubList.length ?? 0}
          note="Reports and papers"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <section className="rounded-3xl border border-ink/10 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-base font-serif text-ink">My Registered Programs</h2>
              <p className="text-xs text-ink-soft">Programs connected to your logged-in email.</p>
            </div>
            <Link to="programs" className="text-xs font-semibold text-forest-800 hover:underline">See all</Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {accessList.slice(0, 4).map((access) => (
              <SmallItem
                key={access.id}
                title={access.program_title || "Program"}
                subtitle="Registered"
                href="programs"
              />
            ))}
            {accessList.length === 0 && (
              <div className="rounded-2xl border border-dashed border-ink/15 p-6 text-xs text-ink-soft">
                No registered programs found for your email.
              </div>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-ink/10 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-base font-serif text-ink">Latest Publications</h2>
              <p className="text-xs text-ink-soft">Recent reports and papers from IRICA.</p>
            </div>
            <Link to="/" className="text-xs font-semibold text-forest-800 hover:underline">View site</Link>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {pubList.slice(0, 3).map((p) => (
              <SmallItem key={p.id} title={p.title || p.name} subtitle={p.category || "Publication"} href={p.url || p.file || "/"} />
            ))}

            {pubList.length === 0 && (
              <div className="rounded-2xl border border-dashed border-ink/15 p-6 text-xs text-ink-soft">
                No updates yet.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
