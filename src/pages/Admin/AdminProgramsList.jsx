import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { handleDelete } from "../../utils/formHandles";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";

const STATUS_COLORS = {
  enrollment: "bg-emerald-50 text-emerald-700",
  inprogress: "bg-amber-50 text-amber-700",
  completed: "bg-slate-50 text-slate-700",
};

function AdminProgramsList() {
  const { data, loading, error } = useFetch("/programs/");
  const [items, setItems] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  // Handle both paginated { count, results: [] } and flat array responses
  const programs = items ?? data?.results ?? data ?? [];

  function handleRemove(id) {
    if (!window.confirm("Delete this program? This can't be undone.")) return;

    handleDelete(
      `/programs/${id}/`,
      () => setItems((programs ?? []).filter((p) => p.id !== id)),
      (message) => setDeleteError(message)
    );
  }

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-[1fr_220px] items-start">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-ink-soft/70 font-semibold mb-2">
            Program management
          </p>
          <h1 className="text-3xl font-serif text-ink">Programs</h1>
          <p className="mt-2 text-sm text-ink-soft max-w-2xl">
            Manage course offerings and update program details with ease.
          </p>
        </div>

        <Link
          to="/admin/programs/new"
          className="inline-flex items-center justify-center rounded-full bg-forest-800 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-forest-700"
        >
          + Add program
        </Link>
      </div>

      {deleteError && <div className="rounded-3xl border border-red-100 bg-red-50 p-4 text-red-700"><ErrorMessage message={deleteError} /></div>}

      <div className="grid gap-4">
        <div className="rounded-3xl border border-ink/10 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-ink-soft">Total programs</p>
              <p className="text-4xl font-semibold text-ink">{programs?.length ?? 0}</p>
            </div>
            <p className="rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 w-fit">
              Keep your curriculum current
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm">
          <div className="grid grid-cols-[56px_1.8fr_1fr_100px_100px] gap-4 px-5 py-4 text-xs uppercase tracking-[0.25em] text-ink-soft bg-slate-50 border-b border-ink/10">
            <span>#</span>
            <span>Program</span>
            <span>Status</span>
            <span className="text-right">Edit</span>
            <span className="text-right">Delete</span>
          </div>

          {programs?.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-ink-soft">No programs yet — add your first one.</div>
          ) : (
            programs.map((program) => (
              <div key={program.id} className="grid grid-cols-[56px_1.8fr_1fr_100px_100px] gap-4 items-center px-5 py-4 hover:bg-slate-50 transition">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-xl">🎓</div>
                <div>
                  <p className="font-medium text-ink">{program.title}</p>
                  <p className="text-sm text-ink-soft/70 line-clamp-1">{program.descr || "No description"}</p>
                </div>
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${STATUS_COLORS[program.status] || "bg-slate-50 text-slate-700"}`}>
                  {program.status || "Draft"}
                </span>
                <Link to={`/admin/programs/${program.id}/edit`} className="text-sm font-medium text-forest-800 hover:underline text-right">
                  Edit
                </Link>
                <button
                  onClick={() => handleRemove(program.id)}
                  className="text-sm font-medium text-red-600 hover:underline text-right"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminProgramsList;
