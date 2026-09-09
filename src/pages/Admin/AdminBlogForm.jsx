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
  desc: "",
  file: null,
  photo: null,
};

function AdminBlogForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const { data: existing, loading: loadingExisting } = useFetch(
    isEditing ? `/blogs/${id}/` : null
  );

  const [formData, setFormData] = useState(initialFormState);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [uploadState, setUploadState] = useState(null);

  useEffect(() => {
    if (existing) {
      setFormData({
        title: existing.title || "",
        desc: existing.desc || "",
        file: null,
        photo: null,
      });
    }
  }, [existing]);

  function handleFormSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setUploadState(null);

    const uploadFileName = formData.file?.name || formData.photo?.name || formData.title || "Blog";
    const updateUploadProgress = (progress) => {
      setUploadState((prev) => ({
        ...prev,
        type: "blog",
        fileName: uploadFileName,
        progress,
      }));
    };

    setUploadState({
      type: "blog",
      fileName: uploadFileName,
      progress: 0,
    });

    const action = isEditing
      ? handlePatchMultipart(`/blogs/${id}/`, setSending, setSuccess, setError, formData, updateUploadProgress)
      : handleSubmitMultipart("/blogs/", setSending, setSuccess, setError, formData, setFormData, initialFormState, updateUploadProgress);

    action
      .then(() => {
        setUploadState((prev) => prev ? { ...prev, progress: 100 } : prev);
        setTimeout(() => navigate("/admin/blogs"), 700);
      })
      .catch(() => {
        setUploadState(null);
      });
  }

  if (isEditing && loadingExisting) return <Loader />;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-ink/10 p-6 max-w-lg">
      <h1 className="text-base font-serif text-ink mb-4">
        {isEditing ? "Edit Blog Post" : "Add New Blog Post"}
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
          <label className="block text-xs font-medium text-ink mb-1">Title</label>
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
          <label className="block text-xs font-medium text-ink mb-1">Description</label>
          <textarea
            name="desc"
            rows="4"
            value={formData.desc}
            onChange={(e) => handleChange(e, setFormData)}
            required
            className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-xs font-medium text-ink mb-1">File (optional)</label>
          <input
            type="file"
            name="file"
            onChange={(e) => handleChange(e, setFormData)}
            className="w-full text-xs text-ink-soft"
          />
          {isEditing && (
            <p className="text-xs text-ink-soft/70 mt-1">Leave empty to keep the current file.</p>
          )}
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-xs font-medium text-ink mb-1">Photo (optional)</label>
          {/* TODO: Verify with backend whether image upload is supported on POST/PATCH /blogs/ */}
          <input
            type="file"
            name="photo"
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
          {sending ? "Saving..." : isEditing ? "Save Changes" : "Add Blog Post"}
        </button>
      </form>
    </div>
  );
}

export default AdminBlogForm;
