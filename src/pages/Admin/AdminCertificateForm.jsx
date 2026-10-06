import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BadgeCheck, Copy } from "lucide-react";
import axiosClient from "../../api/axiosClient";
import { handleChange, handleSubmit, handlePatchMultipart } from "../../utils/formHandles";
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
  type_of_program: "",
};

function verifyUrlFor(id) {
  const origin = typeof window === "undefined" ? "" : window.location.origin;
  return `${origin}/certificate/${id}`;
}

function AdminCertificateForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormState);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [created, setCreated] = useState(null);
  const [copied, setCopied] = useState(false);
  const [dateError, setDateError] = useState(null);
  const [choices, setChoices] = useState(null);
  const [choicesError, setChoicesError] = useState(null);

  // Load the program type choices from the API (OPTIONS request) so the
  // dropdown always reflects the model's real choices.
  useEffect(() => {
    let active = true;
    axiosClient
      .options("/certified/")
      .then((response) => {
        const field = response?.data?.actions?.POST?.type_of_program;
        const list = Array.isArray(field?.choices) ? field.choices : null;
        if (!active) return;
        if (list) {
          setChoices(list);
          setChoicesError(null);
        } else {
          setChoices([]);
          setChoicesError(
            "Program type choices are unavailable. Check the Django serializer for type_of_program."
          );
        }
      })
      .catch((err) => {
        if (!active) return;
        setChoicesError(err?.response?.data?.detail || err?.message || "Unable to load program types.");
      });
    return () => {
      active = false;
    };
  }, []);

  // Edit mode: load the existing certificate so the form can be prefilled.
  useEffect(() => {
    if (!id) return;
    let active = true;
    axiosClient.get(`/certified/${id}/`).then((response) => {
      const data = response?.data;
      if (!active || !data) return;
      setFormData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        telephone: data.telephone || "",
        email: data.email || "",
        start_date: data.start_date || "",
        end_date: data.end_date || "",
        type_of_program: data.type_of_program || "",
      });
    });
    return () => {
      active = false;
    };
  }, [id]);

  function programTypeOptions() {
    const known = new Set(choices?.map((c) => c.value));
    const options = (choices || []).map((c) => (
      <option key={c.value} value={c.value}>
        {c.display_name}
      </option>
    ));
    // Edit mode: keep an unknown saved value visible instead of clearing it.
    const saved = formData.type_of_program;
    if (saved && !known.has(saved)) {
      options.unshift(<option key={saved} value={saved}>{saved}</option>);
    }
    return options;
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setError(null);
    setCreated(null);
    setCopied(false);

    if (formData.end_date && formData.start_date && formData.end_date < formData.start_date) {
      const msg = "End date must not be before the start date.";
      setDateError(msg);
      setError(msg);
      return;
    }
    setDateError(null);

    const action = isEditing
      ? handlePatchMultipart(`/certified/${id}/`, setSending, () => {}, setError, formData)
      : handleSubmit(
          "/certified/",
          setSending,
          () => {},
          setError,
          formData,
          setFormData,
          initialFormState
        );

    action
      .then((data) => {
        if (isEditing) return;
        setCreated(data);
      })
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
      <h1 className="text-base font-serif text-ink mb-1">
        {isEditing ? "Edit Certificate" : "Add New Certificate"}
      </h1>
      <p className="text-xs text-ink-soft mb-4">
        {isEditing
          ? "Update the certificate details below."
          : "Creates a certificate and its public verification page."}
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
              min={formData.start_date || undefined}
              className={`${fieldClass} ${dateError ? "border-red-400 focus:ring-2 focus:ring-red-500/40" : ""}`}
            />
            {dateError && (
              <p className="text-xs text-red-600 mt-1">{dateError}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-ink mb-1">Type of program</label>
          <select
            name="type_of_program"
            value={formData.type_of_program}
            onChange={(e) => handleChange(e, setFormData)}
            required
            disabled={!choices}
            className={fieldClass}
          >
            <option value="" disabled>
              {choices ? "Select a program type" : "Loading..."}
            </option>
            {programTypeOptions()}
          </select>
          {choicesError && (
            <p className="text-xs text-red-600 mt-1">{choicesError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={sending}
          className="w-full mt-2 bg-forest-800 hover:bg-forest-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg"
        >
          {sending ? "Saving..." : isEditing ? "Save Changes" : "Create Certificate"}
        </button>
      </form>
    </div>
  );
}

export default AdminCertificateForm;
