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
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-serif text-ink">Materials</h1>
        <Link
          to="/admin/materials/new"
          className="bg-forest-800 hover:bg-forest-700 text-white text-sm px-4 py-2 rounded-lg font-medium"
        >
          + Add Material
        </Link>
      </div>

      {deleteError && <div className="mb-4"><ErrorMessage message={deleteError} /></div>}

      <div className="bg-white rounded-2xl border border-ink/10 shadow-sm divide-y divide-ink/10">
        {materials?.length === 0 && (
          <p className="p-6 text-ink-soft/70 text-sm">No materials yet — add your first one.</p>
        )}

        {materials?.map((material) => (
          <div key={material.id} className="flex items-center gap-4 p-4">
            <span className="text-2xl">{TYPE_ICONS[material.material_type] || "📄"}</span>

            <div className="flex-1">
              <p className="font-medium text-ink">{material.title}</p>
              <p className="text-sm text-ink-soft/70 capitalize">{material.material_type}</p>
            </div>

            <Link
              to={`/admin/materials/${material.id}/edit`}
              className="text-sm text-forest-800 hover:underline"
            >
              Edit
            </Link>

            <button
              onClick={() => handleRemove(material.id)}
              className="text-sm text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminMaterialsList;
