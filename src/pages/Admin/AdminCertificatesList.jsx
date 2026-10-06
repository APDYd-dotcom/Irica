import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BadgeCheck, Copy, Plus } from "lucide-react";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { getCertificates, deleteCertificate } from "../../api/certified";

// Display pages don't fetch the OPTIONS metadata, so map known values to
// their display_name and fall back to a capitalized value otherwise.
const PROGRAM_TYPE_LABELS = {
  certification: "Certification",
  internship: "Internship",
  training: "Training",
  workshop: "Workshop",
  capstone: "Capstone",
  other: "Other",
};

function programTypeLabel(value) {
  if (!value) return "—";
  if (PROGRAM_TYPE_LABELS[value]) return PROGRAM_TYPE_LABELS[value];
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function verifyUrlFor(id) {
  const origin = typeof window === "undefined" ? "" : window.location.origin;
  return `${origin}/certificate/${id}`;
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function AdminCertificatesList() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Follow `next` so every certificate is listed, not just the first page.
  useEffect(() => {
    let active = true;

    async function fetchAll() {
      try {
        const all = [];
        let url = "/certified/";
        while (url) {
          const response = await getCertificates(url);
          all.push(...(response.data?.results || response.data || []));
          url = response.data?.next;
        }
        if (active) setCertificates(all);
      } catch (err) {
        if (active) setError(err?.message || "Unable to load certificates.");
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchAll();
    return () => {
      active = false;
    };
  }, []);

  function handleCopy(id) {
    const url = verifyUrlFor(id);

    // navigator.clipboard needs a secure context (https / localhost).
    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setCopiedId(id);
          setTimeout(() => setCopiedId((cur) => (cur === id ? null : cur)), 2000);
        })
        .catch(() => setError("Could not copy the link. Copy it manually from the address bar."));
    } else {
      setError("Clipboard unavailable. Open the certificate page and copy its address.");
    }
  }

  function handleRemove(id) {
    if (!window.confirm("Delete this certificate? This can't be undone.")) return;

    deleteCertificate(id)
      .then(() => setCertificates((prev) => prev.filter((item) => item.id !== id)))
      .catch((err) =>
        setError(
          err?.response?.data?.detail || err?.message || "Unable to delete certificate."
        )
      );
  }

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-[1fr_220px] items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-ink-soft/70 font-semibold mb-2">
            Certificate management
          </p>
          <h1 className="text-2xl font-serif text-ink">Certificates</h1>
          <p className="mt-2 text-xs text-ink-soft max-w-2xl">
            Issue certificates and share their public verification link (one URL per certificate,
            ideal for a QR code).
          </p>
        </div>

        <Link
          to="/admin/certificates/new"
          className="inline-flex items-center justify-center gap-1 rounded-full bg-forest-800 px-5 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-forest-700"
        >
          <Plus className="h-4 w-4" />
          + Add certificate
        </Link>
      </div>

      {error && (
        <div className="rounded-3xl border border-red-100 bg-red-50 p-4 text-red-700">
          <ErrorMessage message={error} />
        </div>
      )}

      <div className="rounded-3xl border border-ink/10 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs text-ink-soft">Total certificates</p>
            <p className="text-3xl font-semibold text-ink">{certificates.length}</p>
          </div>
          <p className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-ink-soft w-fit">
            Copy a link to build a QR code
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-ink/10 bg-white shadow-sm">
        <div className="grid grid-cols-[56px_1.6fr_1fr_1.4fr_1.2fr_150px_70px] gap-4 px-5 py-4 text-xs uppercase tracking-[0.25em] text-ink-soft bg-slate-50 border-b border-ink/10">
          <span>#</span>
          <span>Full name</span>
          <span>Type</span>
          <span>Period</span>
          <span>Email</span>
          <span className="text-right">Link</span>
          <span className="text-right">Delete</span>
        </div>

        {certificates.length === 0 ? (
          <div className="px-5 py-10 text-center text-xs text-ink-soft">No certificates found yet.</div>
        ) : (
          certificates.map((certificate) => {
            const fullName = [certificate.first_name, certificate.last_name]
              .filter(Boolean)
              .join(" ");

            return (
              <div
                key={certificate.id}
                className="grid grid-cols-[56px_1.6fr_1fr_1.4fr_1.2fr_150px_70px] gap-4 items-center px-5 py-4 hover:bg-slate-50 transition"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-ink truncate">{fullName || "—"}</p>
                  <p className="text-xs text-ink-soft/70 truncate">{certificate.telephone}</p>
                </div>
                <div className="text-xs text-ink-soft truncate">
                  {programTypeLabel(certificate.type_of_program)}
                </div>
                <div className="text-xs text-ink-soft">
                  {formatDate(certificate.start_date)} → {formatDate(certificate.end_date)}
                </div>
                <div className="text-xs text-ink-soft truncate">{certificate.email || "—"}</div>
                <div className="text-right">
                  <button
                    onClick={() => handleCopy(certificate.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-forest-800 hover:underline"
                  >
                    {copiedId === certificate.id ? (
                      <>
                        <BadgeCheck className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copier le lien
                      </>
                    )}
                  </button>
                </div>
                <button
                  onClick={() => handleRemove(certificate.id)}
                  className="text-xs font-medium text-red-600 hover:underline text-right"
                >
                  Delete
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default AdminCertificatesList;
