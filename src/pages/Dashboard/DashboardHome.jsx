import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, ChevronRight } from "lucide-react";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader";
import { useAuth } from "../../hooks/useAuth";

const PROGRAMS_ROUTE = "/dashboard/programs";

function ProgramCard({ title }) {
  return (
    <Link
      to={PROGRAMS_ROUTE}
      className="group flex items-center gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40"
    >
      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary-50 text-primary-600">
        <BookOpen className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
          Registered
        </p>
        <h3 className="mt-1 truncate text-base font-semibold text-neutral-900">{title}</h3>
      </div>
      <ChevronRight className="h-5 w-5 flex-none text-neutral-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary-600" />
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="py-12 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
        <BookOpen className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-neutral-900">No programs yet</h3>
      <p className="mt-2 text-sm text-neutral-500">
        Programs you register to will appear here.
      </p>
      <Link
        to={PROGRAMS_ROUTE}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 focus-visible:ring-offset-2"
      >
        Browse programs
        <ArrowRight className="h-4 w-4" />
      </Link>
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
  const programCount = accessData?.count ?? accessList.length ?? 0;
  const programLabel = programCount === 1 ? "program" : "programs";

  return (
    <div className="space-y-6 lg:space-y-8">
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">
              Overview
            </p>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 lg:text-3xl">
              My Learning Space
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500 lg:text-base">
              You have{" "}
              <span className="font-bold text-primary-600">
                {programCount} {programLabel}
              </span>{" "}
              registered to your email.
            </p>
          </div>
          <Link
            to={PROGRAMS_ROUTE}
            className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-900/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 focus-visible:ring-offset-2 lg:w-auto"
          >
            <BookOpen className="h-4 w-4" />
            Browse all programs
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-neutral-900">My Registered Programs</h2>
            <p className="mt-1 text-sm text-neutral-500">
              Programs connected to your logged-in email.
            </p>
          </div>
          <Link
            to={PROGRAMS_ROUTE}
            className="inline-flex shrink-0 items-center gap-1 rounded text-sm font-semibold text-primary-600 transition-all duration-200 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 focus-visible:ring-offset-2"
          >
            See all
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {accessList.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="mt-5 space-y-3">
            {accessList.slice(0, 4).map((access) => (
              <ProgramCard key={access.id} title={access.program_title || "Program"} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
