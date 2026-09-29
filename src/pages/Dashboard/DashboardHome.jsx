import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader";
import { useAuth } from "../../hooks/useAuth";

function StatCard({ label, value, note, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm text-neutral-500">{label}</p>
          <p className="mt-3 text-4xl font-bold text-neutral-900">{value}</p>
          <p className="mt-3 break-words text-xs text-neutral-400">{note}</p>
        </div>
        {Icon && <Icon className="h-6 w-6 flex-none text-primary-500/40" />}
      </div>
    </div>
  );
}

function ProgramItem({ title }) {
  return (
    <Link
      to="/dashboard/programs"
      className="block rounded-xl border border-neutral-200 bg-neutral-50 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
        Registered
      </p>
      <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-neutral-900">{title}</h3>
    </Link>
  );
}

function EmptyState({ message }) {
  return (
    <div className="rounded-xl border border-dashed border-neutral-200 p-6 text-sm leading-relaxed text-neutral-500">
      {message}
    </div>
  );
}

export default function DashboardHome() {
  const { user } = useAuth();
  const email = user?.email || user?.username || "";
  const { data: accessData, loading: accessLoading } = useFetch(
    email ? `/access-programs/?email=${encodeURIComponent(email)}` : null
  );
  const { loading: pubLoading } = useFetch("/publications/");

  if (accessLoading || pubLoading) return <Loader />;

  const accessList = accessData?.results || accessData || [];

  return (
    <div className="space-y-6 lg:space-y-8">
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">
              Overview
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 lg:text-3xl">
              Your learning dashboard
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-500">
              View programs registered to your email and open their related articles.
            </p>
          </div>
          <Link
            to="/dashboard/programs"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 focus-visible:ring-offset-2 lg:w-auto"
          >
            <BookOpen className="h-4 w-4" />
            View my programs
          </Link>
        </div>
      </section>

      <div className="mx-auto w-full max-w-md">
        <StatCard
          label="Registered Programs"
          value={accessData?.count ?? accessList.length ?? 0}
          note="Linked to your email"
          icon={BookOpen}
        />
      </div>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-neutral-900">My Registered Programs</h2>
            <p className="mt-1 text-sm text-neutral-500">
              Programs connected to your logged-in email.
            </p>
          </div>
          <Link
            to="/dashboard/programs"
            className="shrink-0 rounded text-sm font-semibold text-primary-600 transition-all duration-200 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 focus-visible:ring-offset-2"
          >
            See all
          </Link>
        </div>
        <div className="mt-5 space-y-4">
          {accessList.slice(0, 4).map((access) => (
            <ProgramItem key={access.id} title={access.program_title || "Program"} />
          ))}
          {accessList.length === 0 && (
            <EmptyState message="No registered programs found for your email." />
          )}
        </div>
      </section>
    </div>
  );
}
