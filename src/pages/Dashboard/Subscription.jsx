import { Link } from "react-router-dom";

function Subscription() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.22em] text-ink-soft/70 font-semibold mb-2">
          Access
        </p>
        <h1 className="text-3xl font-serif text-ink">Program Access</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
          IRICA programs are unlocked with the email and access code sent after registration or payment.
        </p>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-serif text-ink">Already Have a Code?</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Go to Programs, select your program, enter your email and access code, then view the attached articles.
          </p>
          <Link
            to="/dashboard/materials"
            className="mt-5 inline-flex rounded-full bg-forest-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-forest-700"
          >
            Unlock articles
          </Link>
        </div>

        <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-serif text-ink">Need Access?</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Free programs use an admin-issued access code. Paid programs start payment with Vovotapesa and send the code after approval.
          </p>
          <Link
            to="/#programs"
            className="mt-5 inline-flex rounded-full border border-forest-800 px-5 py-3 text-sm font-semibold text-forest-800 transition hover:bg-forest-50"
          >
            View programs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Subscription;
