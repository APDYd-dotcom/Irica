import { useAuth } from "../../hooks/useAuth";

function Profile() {
  const { user } = useAuth();
  const displayName = user?.full_name || user?.username || user?.email || "IRICA member";

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.22em] text-ink-soft/70 font-semibold mb-2">
          Account
        </p>
        <h1 className="text-3xl font-serif text-ink">Profile</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Your current dashboard identity.
        </p>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-serif text-ink">Member Details</h2>
          <dl className="mt-5 space-y-4">
            <div>
              <dt className="text-sm text-ink-soft">Name</dt>
              <dd className="mt-1 font-semibold text-ink">{displayName}</dd>
            </div>
            {user?.email && (
              <div>
                <dt className="text-sm text-ink-soft">Email</dt>
                <dd className="mt-1 font-semibold text-ink">{user.email}</dd>
              </div>
            )}
            {user?.username && (
              <div>
                <dt className="text-sm text-ink-soft">Username</dt>
                <dd className="mt-1 font-semibold text-ink">{user.username}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-serif text-ink">Access Codes</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Program access is verified with your email and access code. The documented API does not expose profile editing endpoints, so account updates should be handled by the site administrator.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
