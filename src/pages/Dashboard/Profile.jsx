import { Mail, UserRound } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

function Profile() {
  const { user } = useAuth();
  const email = user?.email || user?.username || "";

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">
          Account
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 lg:text-3xl">
          Profile
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-neutral-500">
          Your account email is used to match your registered programs and articles.
        </p>
      </section>

      <div className="max-w-xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-primary-50">
            <Mail className="h-5 w-5 text-primary-500" />
          </span>
          <h2 className="text-lg font-bold text-neutral-900">Email</h2>
        </div>
        <p className="mt-4 break-words rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-[15px] font-semibold text-neutral-900">
          {email || "No email saved"}
        </p>
        <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-neutral-500">
          <UserRound className="mt-0.5 h-4 w-4 flex-none text-neutral-400" />
          <span>Need to change this address? Contact the IRICA team.</span>
        </p>
      </div>
    </div>
  );
}

export default Profile;
