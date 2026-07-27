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

  // Keep a LOCAL copy we can remove from instantly, instead of re-fetching
  // the whole list every time something is deleted.
  const programs = items ?? data;

  function handleRemove(id) {
    if (!window.confirm("Delete this program? This can't be undone.")) return;

    handleDelete(
      `/programs/${id}/`,
      () => setItems((programs ?? data).filter((p) => p.id !== id)),
      (message) => setDeleteError(message)
    );
  }

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-serif text-ink">Programs</h1>
        <Link
          to="/admin/programs/new"
          className="bg-forest-800 hover:bg-forest-700 text-white text-sm px-4 py-2 rounded-lg font-medium"
        >
          + Add Program
        </Link>
      </div>

      {deleteError && <div className="mb-4"><ErrorMessage message={deleteError} /></div>}

      <div className="bg-white rounded-2xl border border-ink/10 shadow-sm divide-y divide-ink/10 overflow-hidden">
        {programs?.length === 0 && (
          <p className="p-6 text-ink-soft/70 text-sm">No programs yet — add your first one.</p>
        )}

        {programs?.map((program) => (
          <div key={program.id} className="flex items-center justify-between p-4 hover:bg-forest-50/30 transition">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-medium text-ink">{program.title}</h3>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-[0.08em] ${
                    STATUS_COLORS[program.status]
                  }`}
                >
                  {program.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-ink-soft/70">
                <span>{program.is_free ? "🎁 Free" : `💰 $${parseFloat(program.price).toFixed(2)}`}</span>
                <span>📅 {new Date(program.created_at).toLocaleDateString("fr-FR")}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/admin/programs/${program.id}/edit`}
                className="text-sm text-forest-800 hover:underline font-medium"
              >
                Edit
              </Link>

              <button
                onClick={() => handleRemove(program.id)}
                className="text-sm text-red-500 hover:underline font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProgramsList;
