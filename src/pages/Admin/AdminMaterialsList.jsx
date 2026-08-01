import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { handleDelete } from "../../utils/formHandles";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";

const TYPE_ICONS = { book: "📘", video: "🎬", link: "🔗" };

// This calls the SAME /materials/ endpoint the dashboard uses, but since the
// logged-in user is_staff, your Django view can choose to always return full
// details here regardless of subscription — that's a backend decision, not this page's.
function AdminMaterialsList() {
  const { data, loading, error } = useFetch("/materials/");
  const [items, setItems] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  // Keep a LOCAL copy we can remove from instantly, instead of re-fetching
  // the whole list every time something is deleted.
  const materials = items ?? data;

  function handleRemove(id) {
    if (!window.confirm("Delete this material? This can't be undone.")) return;

    handleDelete(
      `/materials/${id}/`,
      () => setItems((materials ?? data).filter((m) => m.id !== id)),
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
            Content management
          </p>
          <h1 className="text-3xl font-serif text-ink">Resources</h1>
          <p className="mt-2 text-sm text-ink-soft max-w-2xl">
            Review, edit, or remove resources available in the platform.
          </p>
        </div>

        <Link
          to="/admin/materials/new"
          className="inline-flex items-center justify-center rounded-full bg-forest-800 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-forest-700"
        >
          + Add resource
        </Link>
      </div>

      {deleteError && <div className="rounded-3xl border border-red-100 bg-red-50 p-4 text-red-700"><ErrorMessage message={deleteError} /></div>}

      <div className="grid gap-4">
        <div className="rounded-3xl border border-ink/10 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-ink-soft">Total resources</p>
              <p className="text-4xl font-semibold text-ink">{materials?.length ?? 0}</p>
            </div>
            <p className="rounded-full bg-forest-50 px-4 py-2 text-sm font-medium text-forest-800 w-fit">
              Manage content with confidence
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm">
          <div className="grid grid-cols-[56px_1.5fr_1fr_110px_110px] gap-4 px-5 py-4 text-xs uppercase tracking-[0.25em] text-ink-soft bg-slate-50 border-b border-ink/10">
            <span>#</span>
            <span>Title</span>
            <span>Type</span>
            <span className="text-right">Edit</span>
            <span className="text-right">Delete</span>
          </div>

          {materials?.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-ink-soft">No materials yet — add your first one.</div>
          ) : (
            materials.map((material, index) => (
              <div key={material.id} className="grid grid-cols-[56px_1.5fr_1fr_110px_110px] gap-4 items-center px-5 py-4 hover:bg-slate-50 transition">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest-50 text-xl">{TYPE_ICONS[material.material_type] || "📄"}</div>
                <div>
                  <p className="font-medium text-ink">{material.title}</p>
                  <p className="text-sm text-ink-soft/70 capitalize">{material.material_type}</p>
                </div>
                <div className="text-sm text-ink-soft capitalize">{material.material_type}</div>
                <Link to={`/admin/materials/${material.id}/edit`} className="text-sm font-medium text-forest-800 hover:underline text-right">
                  Edit
                </Link>
                <button
                  onClick={() => handleRemove(material.id)}
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

export default AdminMaterialsList;
