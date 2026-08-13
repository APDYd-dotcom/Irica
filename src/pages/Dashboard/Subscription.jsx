import { Link } from "react-router-dom";

function Subscription() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-ink/10 bg-white p-4 shadow-sm sm:p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-ink-soft/70 font-semibold mb-2 sm:text-sm sm:tracking-[0.22em]">
          Access
        </p>
        <h1 className="text-2xl font-serif text-ink sm:text-3xl">Program Access</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
          IRICA programs are unlocked with the email and access code sent after registration or payment.
        </p>
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl border border-ink/10 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="text-xl font-serif text-ink">Already Have a Code?</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Go to Programs, select your program, enter your email and access code, then view the attached articles.
          </p>
          <Link
            to="/dashboard/programs"
            className="mt-5 inline-flex w-full justify-center rounded-full bg-forest-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-forest-700 sm:w-auto"
          >
            Unlock articles
          </Link>
        </div>

        <div className="rounded-3xl border border-ink/10 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="text-xl font-serif text-ink">Need Access?</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Free programs use an admin-issued access code. Paid programs start payment with Vovotapesa and send the code after approval.
          </p>
          <Link
            to="/#programs"
            className="mt-5 inline-flex w-full justify-center rounded-full border border-forest-800 px-5 py-3 text-sm font-semibold text-forest-800 transition hover:bg-forest-50 sm:w-auto"
          >
            View programs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Subscription;
