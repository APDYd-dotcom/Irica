import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquareQuote, Plus } from "lucide-react";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { getTestimonies, deleteTestimony } from "../../api/testimonies";

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function AdminTestimoniesList() {
  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteError, setDeleteError] = useState(null);

  // Follow `next` so every testimonial is listed, not just the first page.
  useEffect(() => {
    let active = true;

    async function fetchAll() {
      try {
        const all = [];
        let url = "/testimonies/";
        while (url) {
          const response = await getTestimonies(url);
          all.push(...(response.data?.results || response.data || []));
          url = response.data?.next;
        }
        if (active) setTestimonies(all);
      } catch (err) {
        if (active) setDeleteError(err?.message || "Unable to load testimonials.");
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchAll();
    return () => {
      active = false;
    };
  }, []);

  function handleRemove(id) {
    if (!window.confirm("Delete this testimonial? This can't be undone.")) return;

    deleteTestimony(id)
      .then(() => setTestimonies((prev) => prev.filter((item) => item.id !== id)))
      .catch((err) =>
        setDeleteError(
          err?.response?.data?.detail ||
            err?.response?.data?.[Object.keys(err.response.data)[0]]?.[0] ||
            err?.message ||
            "Unable to delete testimonial."
        )
      );
  }

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-[1fr_220px] items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-ink-soft/70 font-semibold mb-2">
            Testimonial management
          </p>
          <h1 className="text-2xl font-serif text-ink">Testimonials</h1>
          <p className="mt-2 text-xs text-ink-soft max-w-2xl">
            Manage the testimonials shown in the homepage testimonial carousel.
          </p>
        </div>

        <Link
          to="/admin/testimonies/new"
          className="inline-flex items-center justify-center rounded-full bg-forest-800 px-5 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-forest-700"
        >
          <Plus className="h-4 w-4" />
          + Add testimonial
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
            <p className="text-xs text-ink-soft">Total testimonials</p>
            <p className="text-3xl font-semibold text-ink">{testimonies.length}</p>
          </div>
          <p className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-ink-soft w-fit">
            Keep your testimonials current
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-ink/10 bg-white shadow-sm">
        <div className="grid grid-cols-[56px_1.6fr_1fr_90px_80px_70px] gap-4 px-5 py-4 text-xs uppercase tracking-[0.25em] text-ink-soft bg-slate-50 border-b border-ink/10">
          <span>#</span>
          <span>Name</span>
          <span>Position</span>
          <span>Date</span>
          <span className="text-right">Edit</span>
          <span className="text-right">Delete</span>
        </div>

        {testimonies.length === 0 ? (
          <div className="px-5 py-10 text-center text-xs text-ink-soft">No testimonials found yet.</div>
        ) : (
          testimonies.map((testimony, index) => (
            <div
              key={testimony.id}
              className="grid grid-cols-[56px_1.6fr_1fr_90px_80px_70px] gap-4 items-center px-5 py-4 hover:bg-slate-50 transition"
            >
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-primary-50 text-primary-700">
                {testimony.photo ? (
                  <img
                    src={testimony.photo}
                    alt={testimony.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <MessageSquareQuote className="h-5 w-5" />
                )}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-ink truncate">{testimony.name}</p>
                <p className="text-xs text-ink-soft/70 line-clamp-1">
                  {testimony.content || "No content available."}
                </p>
              </div>
              <div className="text-xs text-ink-soft truncate">
                {testimony.position || "—"}
              </div>
              <div className="text-xs text-ink-soft">{formatDate(testimony.created_at)}</div>
              <Link
                to={`/admin/testimonies/${testimony.id}/edit`}
                className="text-xs font-medium text-forest-800 hover:underline text-right"
              >
                Edit
              </Link>
              <button
                onClick={() => handleRemove(testimony.id)}
                className="text-xs font-medium text-red-600 hover:underline text-right"
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

export default AdminTestimoniesList;
