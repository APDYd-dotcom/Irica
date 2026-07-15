import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { handleChange, handleSubmitMultipart, handlePatchMultipart } from "../../utils/formHandles";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import Loader from "../../components/Loader";

const initialFormState = {
  title: "",
  description: "",
  material_type: "book",
  thumbnail: null, // File object, or null
  file: null,      // File object — used for books
  url: "",         // used for videos/links
};

function AdminMaterialForm() {
  const { id } = useParams(); // present only when editing (e.g. /admin/materials/12/edit)
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  // Only fetch existing data if we're editing
  const { data: existing, loading: loadingExisting } = useFetch(isEditing ? `/materials/${id}/` : null);

  const [formData, setFormData] = useState(initialFormState);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Once the existing material loads, fill the form with its current values
  useEffect(() => {
    if (existing) {
      setFormData({
        title: existing.title || "",
        description: existing.description || "",
        material_type: existing.material_type || "book",
        thumbnail: null, // leave empty — user only picks a NEW file if they want to replace it
        file: null,
        url: existing.url || "",
      });
    }
  }, [existing]);

  function handleFormSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const action = isEditing
      ? handlePatchMultipart(`/materials/${id}/`, setSending, setSuccess, setError, formData)
      : handleSubmitMultipart("/materials/", setSending, setSuccess, setError, formData, setFormData, initialFormState);

    action.then(() => {
      // Small delay so the user actually SEES the success message before leaving
      setTimeout(() => navigate("/admin/materials"), 700);
    }).catch(() => {
      // error already set inside handleSubmitMultipart/handlePatchMultipart
    });
  }

  if (isEditing && loadingExisting) return <Loader />;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-ink/10 p-6 max-w-lg">
      <h1 className="text-lg font-serif text-ink mb-4">
        {isEditing ? "Edit Material" : "Add New Material"}
      </h1>

      {success && <div className="mb-4"><SuccessMessage message="Saved successfully!" /></div>}
      {error && <div className="mb-4"><ErrorMessage message={error} /></div>}

      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={(e) => handleChange(e, setFormData)}
            required
            className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1">Description</label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={(e) => handleChange(e, setFormData)}
            className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1">Type</label>
          <select
            name="material_type"
            value={formData.material_type}
            onChange={(e) => handleChange(e, setFormData)}
            className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
          >
            <option value="book">Book</option>
            <option value="video">Video</option>
            <option value="link">Online Link</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1">Thumbnail Image</label>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={(e) => handleChange(e, setFormData)}
            className="w-full text-sm text-ink-soft"
          />
          {isEditing && (
            <p className="text-xs text-ink-soft/70 mt-1">Leave empty to keep the current thumbnail.</p>
          )}
        </div>

        {/* Book type needs an uploaded FILE (PDF) */}
        {formData.material_type === "book" && (
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Book File (PDF)</label>
            <input
              type="file"
              name="file"
              accept="application/pdf"
              onChange={(e) => handleChange(e, setFormData)}
              className="w-full text-sm text-ink-soft"
            />
            {isEditing && (
              <p className="text-xs text-ink-soft/70 mt-1">Leave empty to keep the current file.</p>
            )}
          </div>
        )}

        {/* Video/link types just need a URL, not an uploaded file */}
        {(formData.material_type === "video" || formData.material_type === "link") && (
          <div>
            <label className="block text-sm font-medium text-ink mb-1">
              {formData.material_type === "video" ? "Video URL" : "Link URL"}
            </label>
            <input
              type="url"
              name="url"
              placeholder="https://..."
              value={formData.url}
              onChange={(e) => handleChange(e, setFormData)}
              className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={sending}
          className="w-full mt-2 bg-forest-800 hover:bg-forest-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg"
        >
          {sending ? "Saving..." : isEditing ? "Save Changes" : "Add Material"}
        </button>
      </form>
    </div>
  );
}

export default AdminMaterialForm;
