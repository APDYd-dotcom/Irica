import { Link } from "react-router-dom";
import { KeyRound, Sparkles } from "lucide-react";

function Subscription() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">
          Access
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 lg:text-3xl">
          Program Access
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-500">
          IRICA programs are unlocked with the email and access code sent after registration or
          payment.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
            <KeyRound className="h-5 w-5 text-primary-500" />
          </span>
          <h2 className="mt-4 text-lg font-bold text-neutral-900">Already Have a Code?</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-neutral-500">
            Sign in with your email and access code, then open your registered programs to view
            the attached articles.
          </p>
          <Link
            to="/dashboard/programs"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 focus-visible:ring-offset-2 lg:w-auto"
          >
            Unlock articles
          </Link>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
            <Sparkles className="h-5 w-5 text-primary-500" />
          </span>
          <h2 className="mt-4 text-lg font-bold text-neutral-900">Need Access?</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-neutral-500">
            Free programs use an admin-issued access code. Paid programs start payment with
            Vovotapesa and send the code after approval.
          </p>
          <Link
            to="/#programs"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-primary-200 bg-white px-6 py-3 text-sm font-semibold text-primary-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 focus-visible:ring-offset-2 lg:w-auto"
          >
            View programs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Subscription;
