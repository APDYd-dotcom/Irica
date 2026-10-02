import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { handleChange, handleSubmitMultipart, handlePatchMultipart } from "../../utils/formHandles";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import Loader from "../../components/Loader";
import UploadProgress from "../../components/UploadProgress";

// POST /testimonies/ reports name, position and content as required; photo is optional.
const initialFormState = {
  name: "",
  position: "",
  content: "",
  photo: null,
};

function AdminTestimonyForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const { data: existing, loading: loadingExisting } = useFetch(
    isEditing ? `/testimonies/${id}/` : null
  );

  const [formData, setFormData] = useState(initialFormState);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [uploadState, setUploadState] = useState(null);

  useEffect(() => {
    if (existing) {
      setFormData({
        name: existing.name || "",
        position: existing.position || "",
        content: existing.content || "",
        photo: null,
      });
    }
  }, [existing]);

  function handleFormSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setUploadState(null);

    const uploadFileName = formData.photo?.name || formData.name || "Testimonial";
    const updateUploadProgress = (progress) => {
      setUploadState((prev) => ({ ...prev, type: "photo", fileName: uploadFileName, progress }));
    };

    setUploadState({ type: "photo", fileName: uploadFileName, progress: 0 });

    const action = isEditing
      ? handlePatchMultipart(
          `/testimonies/${id}/`,
          setSending,
          setSuccess,
          setError,
          formData,
          updateUploadProgress
        )
      : handleSubmitMultipart(
          "/testimonies/",
          setSending,
          setSuccess,
          setError,
          formData,
          setFormData,
          initialFormState,
          updateUploadProgress
        );

    action
      .then(() => {
        setUploadState((prev) => (prev ? { ...prev, progress: 100 } : prev));
        setTimeout(() => navigate("/admin/testimonies"), 700);
      })
      .catch(() => {
        setUploadState(null);
      });
  }

  if (isEditing && loadingExisting) return <Loader />;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-ink/10 p-6 max-w-lg">
      <h1 className="text-base font-serif text-ink mb-4">
        {isEditing ? "Edit Testimonial" : "Add New Testimonial"}
      </h1>

      {success && (
        <div className="mb-4">
          <SuccessMessage message="Saved successfully!" />
        </div>
      )}
      {error && (
        <div className="mb-4">
          <ErrorMessage message={error} />
        </div>
      )}
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
        <div>
          <label className="block text-xs font-medium text-ink mb-1">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={(e) => handleChange(e, setFormData)}
            required
            className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-ink mb-1">Position</label>
          <input
            name="position"
            value={formData.position}
            onChange={(e) => handleChange(e, setFormData)}
            required
            placeholder="e.g. Research Fellow, IRICA"
            className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-ink mb-1">Content</label>
          <textarea
            name="content"
            rows="6"
            value={formData.content}
            onChange={(e) => handleChange(e, setFormData)}
            required
            className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-ink mb-1">Photo (optional)</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={(e) => handleChange(e, setFormData)}
            className="w-full text-xs text-ink-soft"
          />
          {isEditing && (
            <p className="text-xs text-ink-soft/70 mt-1">Leave empty to keep the current photo.</p>
          )}
        </div>

        <button
          type="submit"
          disabled={sending}
          className="w-full mt-2 bg-forest-800 hover:bg-forest-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg"
        >
          {sending ? "Saving..." : isEditing ? "Save Changes" : "Add Testimonial"}
        </button>
      </form>
    </div>
  );
}

export default AdminTestimonyForm;
