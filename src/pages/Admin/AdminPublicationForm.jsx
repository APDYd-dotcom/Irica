import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { handleChange, handleSubmitMultipart, handlePatchMultipart } from "../../utils/formHandles";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import Loader from "../../components/Loader";
import UploadProgress from "../../components/UploadProgress";

const initialFormState = {
  title: "",
  description: "",
  category: "employabilite", // default category
  published_date: "",        // formatted as YYYY-MM-DD
  file: null,                // multipart File object
};

function AdminPublicationForm() {
  const { id } = useParams(); // present only when editing
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  // Fetch existing publication details if editing
  const { data: existing, loading: loadingExisting } = useFetch(
    isEditing ? `/publications/${id}/` : null
  );

  const [formData, setFormData] = useState(initialFormState);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [uploadState, setUploadState] = useState(null);

  // Fill form when existing data is loaded
  useEffect(() => {
    if (existing) {
      setFormData({
        title: existing.title || "",
        description: existing.description || "",
        category: existing.category || "employabilite",
        published_date: existing.published_date || "",
        file: null, // leave null unless user wants to upload a new one
      });
    }
  }, [existing]);

  function handleFormSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setUploadState(null);

    const uploadFileName = formData.file?.name || formData.title || "Publication";
    const updateUploadProgress = (progress) => {
      setUploadState((prev) => ({
        ...prev,
        type: "publication",
        fileName: uploadFileName,
        progress,
      }));
    };

    setUploadState({
      type: "publication",
      fileName: uploadFileName,
      progress: 0,
    });

    const action = isEditing
      ? handlePatchMultipart(`/publications/${id}/`, setSending, setSuccess, setError, formData, updateUploadProgress)
      : handleSubmitMultipart("/publications/", setSending, setSuccess, setError, formData, setFormData, initialFormState, updateUploadProgress);

    action
      .then(() => {
        setUploadState((prev) => prev ? { ...prev, progress: 100 } : prev);
        setTimeout(() => navigate("/admin/publications"), 700);
      })
      .catch(() => {
        // error handled in form handles helpers
        setUploadState(null);
      });
  }

  if (isEditing && loadingExisting) return <Loader />;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-ink/10 p-6 max-w-lg">
      <h1 className="text-lg font-serif text-ink mb-4">
        {isEditing ? "Edit Publication" : "Add New Publication"}
      </h1>

      {success && <div className="mb-4"><SuccessMessage message="Saved successfully!" /></div>}
      {error && <div className="mb-4"><ErrorMessage message={error} /></div>}
      {uploadState && (
        <div className="mb-4">
          <UploadProgress
            progress={uploadState.progress}
            fileName={uploadState.fileName}
            type={uploadState.type}
          />
        </div>
      )}

      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* Title */}
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

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={(e) => handleChange(e, setFormData)}
            required
            className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={(e) => handleChange(e, setFormData)}
            required
            className="w-full border border-ink/15 rounded-lg px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-forest-800/40"
          >
            <option value="employabilite">Employabilité</option>
            <option value="suivi-evaluation">Suivi & Évaluation</option>
            <option value="audit-pme">Audit PME</option>
          </select>
        </div>

        {/* Published Date */}
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Published Date</label>
          <input
            type="date"
            name="published_date"
            value={formData.published_date}
            onChange={(e) => handleChange(e, setFormData)}
            required
            className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Document File (PDF / Word)</label>
          <input
            type="file"
            name="file"
            onChange={(e) => handleChange(e, setFormData)}
            className="w-full text-sm text-ink-soft"
          />
          {isEditing && (
            <p className="text-xs text-ink-soft/70 mt-1">Leave empty to keep the current file.</p>
          )}
        </div>

        <button
          type="submit"
          disabled={sending}
          className="w-full mt-2 bg-forest-800 hover:bg-forest-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg"
        >
          {sending ? "Saving..." : isEditing ? "Save Changes" : "Add Publication"}
        </button>
      </form>
    </div>
  );
}

export default AdminPublicationForm;
