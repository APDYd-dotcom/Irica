import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { handleChange, handleSubmitMultipart, handlePatchMultipart } from "../../utils/formHandles";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import Loader from "../../components/Loader";

const initialFormState = {
  title: "",
  photo: null, // File object for image upload
  link: "",    // URL to program details page
  status: "enrollment", // enrollment, inprogress, completed
  is_free: true,
  price: 0,
};

function AdminProgramForm() {
  const { id } = useParams(); // present only when editing (e.g. /admin/programs/12/edit)
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  // Only fetch existing data if we're editing
  const { data: existing, loading: loadingExisting } = useFetch(isEditing ? `/programs/${id}/` : null);

  const [formData, setFormData] = useState(initialFormState);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Once the existing program loads, fill the form with its current values
  useEffect(() => {
    if (existing) {
      setFormData({
        title: existing.title || "",
        photo: null, // leave empty — user only picks a NEW file if they want to replace it
        link: existing.link || "",
        status: existing.status || "enrollment",
        is_free: existing.is_free ?? true,
        price: existing.price || 0,
      });
    }
  }, [existing]);

  function handleFormSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validate price when not free
    if (!formData.is_free && (!formData.price || formData.price <= 0)) {
      setError("Price must be greater than 0 for paid programs");
      return;
    }

    const action = isEditing
      ? handlePatchMultipart(`/programs/${id}/`, setSending, setSuccess, setError, formData)
      : handleSubmitMultipart("/programs/", setSending, setSuccess, setError, formData, setFormData, initialFormState);

    action.then(() => {
      // Small delay so the user actually SEES the success message before leaving
      setTimeout(() => navigate("/admin/programs"), 700);
    }).catch(() => {
      // error already set inside handleSubmitMultipart/handlePatchMultipart
    });
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
          <label className="block text-sm font-medium text-ink mb-1">Program Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={(e) => handleChange(e, setFormData)}
            required
            placeholder="e.g., Capstone Program"
            className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
          />
        </div>

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
          <label className="block text-sm font-medium text-ink mb-1">Program Link</label>
          <input
            type="url"
            name="link"
            placeholder="https://..."
            value={formData.link}
            onChange={(e) => handleChange(e, setFormData)}
            className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
          />
          <p className="text-xs text-ink-soft/70 mt-1">URL to program details page</p>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={(e) => handleChange(e, setFormData)}
            className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
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
            onChange={(e) => {
              handleChange(e, setFormData);
              if (e.target.checked) {
                setFormData((prev) => ({ ...prev, price: 0 }));
              }
            }}
            className="w-4 h-4 text-forest-800 rounded"
          />
          <label htmlFor="is_free" className="text-sm font-medium text-ink">
            This is a free program
          </label>
        </div>

        {/* Price (only if not free) */}
        {!formData.is_free && (
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Price (USD)</label>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => handleChange(e, setFormData)}
              required={!formData.is_free}
              placeholder="0.00"
              className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
            />
          </div>
        )}

        {/* Summary */}
        <div className="mt-6 p-4 bg-forest-50 rounded-lg">
          <p className="text-xs font-semibold text-forest-800 uppercase tracking-wide mb-2">Summary</p>
          <div className="space-y-1 text-sm text-ink-soft">
            <p><span className="font-medium">Status:</span> {formData.status}</p>
            <p><span className="font-medium">Type:</span> {formData.is_free ? "Free" : `Paid - $${parseFloat(formData.price).toFixed(2)}`}</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={sending}
          className="w-full mt-6 bg-forest-800 hover:bg-forest-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg"
        >
          {sending ? "Saving..." : isEditing ? "Save Changes" : "Add Program"}
        </button>
      </form>
    </div>
  );
}

export default AdminProgramForm;
