import { useAuth } from "../../hooks/useAuth";

function Profile() {
  const { user } = useAuth();
  const email = user?.email || user?.username || "No email saved";

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.22em] text-ink-soft/70 font-semibold mb-2">
          Account
        </p>
        <h1 className="text-3xl font-serif text-ink">Profile</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Your account email.
        </p>
      </section>

      <div className="max-w-xl rounded-3xl border border-ink/10 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-serif text-ink">Email</h2>
        <p className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 font-semibold text-ink">
          {email}
        </p>
      </div>
    </div>
  );
}

export default Profile;
