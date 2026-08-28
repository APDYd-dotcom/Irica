import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { handleDelete } from "../../utils/formHandles";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { FileText } from "lucide-react";

function AdminPublicationsList() {
  const { data, loading, error } = useFetch("/publications/");
  const [items, setItems] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const publications = items ?? data?.results ?? data ?? [];

  function handleRemove(id) {
    if (!window.confirm("Delete this publication? This can't be undone.")) return;

    handleDelete(
      `/publications/${id}/`,
      () => setItems((publications ?? data).filter((item) => item.id !== id)),
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
            Publication management
          </p>
          <h1 className="text-3xl font-serif text-ink">Publications</h1>
          <p className="mt-2 text-sm text-ink-soft max-w-2xl">
            View and manage the latest publications available on the site.
          </p>
        </div>

        <Link
          to="/admin/publications/new"
          className="inline-flex items-center justify-center rounded-full bg-forest-800 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-forest-700"
        >
          + Add publication
        </Link>
      </div>

      {deleteError && (
        <div className="rounded-3xl border border-red-100 bg-red-50 p-4 text-red-700">
          <ErrorMessage message={deleteError} />
        </div>
      )}

      <div className="rounded-3xl border border-ink/10 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-ink-soft">Total publications</p>
            <p className="text-4xl font-semibold text-ink">{publications?.length ?? 0}</p>
          </div>
          <p className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-ink-soft w-fit">
            Keep your publication library current
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm">
        <div className="grid grid-cols-[56px_1.5fr_1fr_90px_90px] gap-4 px-5 py-4 text-xs uppercase tracking-[0.25em] text-ink-soft bg-slate-50 border-b border-ink/10">
          <span>#</span>
          <span>Title</span>
          <span>Category</span>
          <span className="text-right">Edit</span>
          <span className="text-right">Delete</span>
        </div>

        {publications?.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-ink-soft">No publications found yet.</div>
        ) : (
          publications.map((publication, index) => (
            <div key={publication.id} className="grid grid-cols-[56px_1.5fr_1fr_90px_90px] gap-4 items-center px-5 py-4 hover:bg-slate-50 transition">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-ink">{publication.title || publication.name}</p>
                <p className="text-sm text-ink-soft/70 line-clamp-1">{publication.description || "No description available."}</p>
              </div>
              <div className="text-sm text-ink-soft capitalize">{publication.category || publication.type || "Publication"}</div>
              <Link
                to={`/admin/publications/${publication.id}/edit`}
                className="text-sm font-medium text-forest-800 hover:underline text-right"
              >
                Edit
              </Link>
              <button
                onClick={() => handleRemove(publication.id)}
                className="text-sm font-medium text-red-600 hover:underline text-right"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminPublicationsList;
