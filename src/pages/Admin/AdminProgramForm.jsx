import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { handleChange, handleSubmitMultipart, handlePatchMultipart } from "../../utils/formHandles";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import Loader from "../../components/Loader";

const initialFormState = {
  title: "",
  descr: "",        // API field name is "descr"
  photo: null,      // File object for image upload
  link: "",         // URL to program details page
  status: "enrollment", // enrollment | inprogress | completed
  is_free: true,
  price: "",
};

function AdminProgramForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const { data: existing, loading: loadingExisting } = useFetch(
    isEditing ? `/programs/${id}/` : null
  );

  const [formData, setFormData] = useState(initialFormState);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (existing) {
      setFormData({
        title: existing.title || "",
        descr: existing.descr || "",
        photo: null,
        link: existing.link || "",
        status: existing.status || "enrollment",
        is_free: existing.is_free ?? true,
        price: existing.price || "",
      });
    }
  }, [existing]);

  function handleFormSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!formData.is_free && (!formData.price || parseFloat(formData.price) <= 0)) {
      setError("Price must be greater than 0 for paid programs.");
      return;
    }

    const action = isEditing
      ? handlePatchMultipart(`/programs/${id}/`, setSending, setSuccess, setError, formData)
      : handleSubmitMultipart("/programs/", setSending, setSuccess, setError, formData, setFormData, initialFormState);

    action
      .then(() => {
        setTimeout(() => navigate("/admin/programs"), 700);
      })
      .catch(() => {});
  }

  if (isEditing && loadingExisting) return <Loader />;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-ink/10 p-6 max-w-lg">
      <h1 className="text-lg font-serif text-ink mb-4">
        {isEditing ? "Edit Program" : "Add New Program"}
      </h1>

      {success && <div className="mb-4"><SuccessMessage message="Saved successfully!" /></div>}
      {error && <div className="mb-4"><ErrorMessage message={error} /></div>}

      <form onSubmit={handleFormSubmit} className="space-y-4">

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Program Title *</label>
          <input
            name="title"
            value={formData.title}
            onChange={(e) => handleChange(e, setFormData)}
            required
            placeholder="e.g., Capstone Program"
            className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Description *</label>
          <textarea
            name="descr"
            value={formData.descr}
            onChange={(e) => handleChange(e, setFormData)}
            rows="4"
            required
            placeholder="Brief description of the program..."
            className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={(e) => handleChange(e, setFormData)}
            className="w-full border border-ink/15 rounded-lg px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-forest-800/40"
          >
            <option value="enrollment">Enrollment Open</option>
            <option value="inprogress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Is Free Toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="is_free"
            id="is_free"
            checked={formData.is_free}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                is_free: e.target.checked,
                price: e.target.checked ? "" : prev.price,
              }))
            }
            className="w-4 h-4 text-forest-800 rounded"
          />
          <label htmlFor="is_free" className="text-sm font-medium text-ink">
            This is a free program
          </label>
        </div>

        {/* Price (only if not free) */}
        {!formData.is_free && (
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Price (FCFA)</label>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => handleChange(e, setFormData)}
              required
              placeholder="e.g., 60000"
              className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
            />
          </div>
        )}

        {/* Photo */}
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Program Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={(e) => handleChange(e, setFormData)}
            className="w-full text-sm text-ink-soft"
          />
          {isEditing && (
            <p className="text-xs text-ink-soft/70 mt-1">Leave empty to keep the current photo.</p>
          )}
        </div>

        {/* Link */}
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Registration Link</label>
          <input
            type="url"
            name="link"
            placeholder="https://..."
            value={formData.link}
            onChange={(e) => handleChange(e, setFormData)}
            className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
          />
          <p className="text-xs text-ink-soft/70 mt-1">Registration or program details URL (optional)</p>
        </div>

        <button
          type="submit"
          disabled={sending}
          className="w-full mt-4 bg-forest-800 hover:bg-forest-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg"
        >
          {sending ? "Saving…" : isEditing ? "Save Changes" : "Add Program"}
        </button>
      </form>
    </div>
  );
}

export default AdminProgramForm;
