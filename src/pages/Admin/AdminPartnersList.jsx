import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Handshake, Plus } from "lucide-react";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { getPartners } from "../../api/partners";
import api from "../../api/axiosClient";

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function AdminPartnersList() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteError, setDeleteError] = useState(null);

  // GET /partners/ is paginated — follow `next` so no partner is hidden.
  useEffect(() => {
    let active = true;

    async function fetchAll() {
      try {
        const all = [];
        let url = "/partners/";
        while (url) {
          const response = await getPartners(url);
          all.push(...(response.data?.results || response.data || []));
          url = response.data?.next;
        }
        if (active) setPartners(all);
      } catch (err) {
        if (active) setDeleteError(err?.message || "Unable to load partners.");
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
    if (!window.confirm("Delete this partner? This can't be undone.")) return;

    api.delete(`/partners/${id}/`)
      .then(() => setPartners((prev) => prev.filter((item) => item.id !== id)))
      .catch((err) =>
        setDeleteError(
          err?.response?.data?.detail || err?.message || "Unable to delete partner."
        )
      );
  }

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-[1fr_220px] items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-ink-soft/70 font-semibold mb-2">
            Partner management
          </p>
          <h1 className="text-2xl font-serif text-ink">Partners</h1>
          <p className="mt-2 text-xs text-ink-soft max-w-2xl">
            Manage the partners shown in the partners section of the homepage.
          </p>
        </div>

        <Link
          to="/admin/partners/new"
          className="inline-flex items-center justify-center rounded-full bg-forest-800 px-5 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-forest-700"
        >
          <Plus className="h-4 w-4" />
          + Add Partner
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
            <p className="text-xs text-ink-soft">Total partners</p>
            <p className="text-3xl font-semibold text-ink">{partners.length}</p>
          </div>
          <p className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-ink-soft w-fit">
            Keep your partners current
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-ink/10 bg-white shadow-sm">
        <div className="grid grid-cols-[56px_1.6fr_120px_80px_70px] gap-4 px-5 py-4 text-xs uppercase tracking-[0.25em] text-ink-soft bg-slate-50 border-b border-ink/10">
          <span>#</span>
          <span>Name</span>
          <span>Date</span>
          <span className="text-right">Edit</span>
          <span className="text-right">Delete</span>
        </div>

        {partners.length === 0 ? (
          <div className="px-5 py-10 text-center text-xs text-ink-soft">
            No partners found yet — add your first one.
          </div>
        ) : (
          partners.map((partner) => (
            <div
              key={partner.id}
              className="grid grid-cols-[56px_1.6fr_120px_80px_70px] gap-4 items-center px-5 py-4 hover:bg-slate-50 transition"
            >
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-primary-50 text-primary-700">
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-full w-full object-contain p-1"
                  />
                ) : (
                  <Handshake className="h-5 w-5" />
                )}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-ink truncate">{partner.name}</p>
              </div>
              <div className="text-xs text-ink-soft">{formatDate(partner.created_at)}</div>
              <Link
                to={`/admin/partners/${partner.id}/edit`}
                className="text-xs font-medium text-forest-800 hover:underline text-right"
              >
                Edit
              </Link>
              <button
                onClick={() => handleRemove(partner.id)}
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

export default AdminPartnersList;
