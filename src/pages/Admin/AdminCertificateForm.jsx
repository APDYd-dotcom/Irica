import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, Copy } from "lucide-react";
import { handleChange, handleSubmit } from "../../utils/formHandles";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage";

// POST /certified/ reports all of these as required. There is no file field on
// this resource, so creation posts plain JSON rather than multipart.
const initialFormState = {
  first_name: "",
  last_name: "",
  telephone: "",
  email: "",
  start_date: "",
  end_date: "",
  type_of_program: "certification",
};

function verifyUrlFor(id) {
  const origin = typeof window === "undefined" ? "" : window.location.origin;
  return `${origin}/certificate/${id}`;
}

function AdminCertificateForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormState);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [created, setCreated] = useState(null);
  const [copied, setCopied] = useState(false);

  function handleFormSubmit(e) {
    e.preventDefault();
    setError(null);
    setCreated(null);
    setCopied(false);

    // handleSubmit shares the state setters; we resolve the created record
    // ourselves so we can show its verification link.
    handleSubmit(
      "/certified/",
      setSending,
      () => {},
      setError,
      formData,
      setFormData,
      initialFormState
    )
      .then((data) => setCreated(data))
      .catch(() => {
        // error already surfaced via setError
      });
  }

  function handleCopy() {
    if (!created?.id) return;
    const url = verifyUrlFor(created.id);

    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => setError("Could not copy the link. Copy it manually below."));
    } else {
      setError("Clipboard unavailable. Copy the link manually below.");
    }
  }

  const fieldClass =
    "w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-ink/10 p-6 max-w-lg">
      <h1 className="text-base font-serif text-ink mb-1">Add New Certificate</h1>
      <p className="text-xs text-ink-soft mb-4">
        Creates a certificate and its public verification page.
      </p>

      {created && (
        <div className="mb-4 space-y-3">
          <SuccessMessage message="Certificate created successfully!" />
          <div className="rounded-2xl border border-ink/10 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft/70">
              Verification link
            </p>
            <p className="mt-2 break-all text-xs text-ink">{verifyUrlFor(created.id)}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-full bg-forest-800 px-4 py-2 text-xs font-semibold text-white transition hover:bg-forest-700"
              >
                {copied ? <BadgeCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copier le lien de vérification"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/certificates")}
                className="rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold text-ink-soft transition hover:bg-slate-100"
              >
                Back to certificates
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4">
          <ErrorMessage message={error} />
        </div>
      )}

      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-ink mb-1">First name</label>
            <input
              name="first_name"
              value={formData.first_name}
              onChange={(e) => handleChange(e, setFormData)}
              required
              className={fieldClass}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink mb-1">Last name</label>
            <input
              name="last_name"
              value={formData.last_name}
              onChange={(e) => handleChange(e, setFormData)}
              required
              className={fieldClass}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-ink mb-1">Telephone</label>
            <input
              name="telephone"
              value={formData.telephone}
              onChange={(e) => handleChange(e, setFormData)}
              required
              placeholder="+257 ..."
              className={fieldClass}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange(e, setFormData)}
              required
              className={fieldClass}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-ink mb-1">Start date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={(e) => handleChange(e, setFormData)}
              required
              className={fieldClass}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink mb-1">End date</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={(e) => handleChange(e, setFormData)}
              required
              className={fieldClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-ink mb-1">Type of program</label>
          <input
            name="type_of_program"
            value={formData.type_of_program}
            onChange={(e) => handleChange(e, setFormData)}
            required
            list="program-types"
            className={fieldClass}
          />
          <datalist id="program-types">
            <option value="certification" />
            <option value="internship" />
            <option value="capstone" />
          </datalist>
          <p className="text-xs text-ink-soft/70 mt-1">
            Free text, e.g. "certification", "internship", "capstone".
          </p>
        </div>

        <button
          type="submit"
          disabled={sending}
          className="w-full mt-2 bg-forest-800 hover:bg-forest-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg"
        >
          {sending ? "Saving..." : "Create Certificate"}
        </button>
      </form>
    </div>
  );
}

export default AdminCertificateForm;
