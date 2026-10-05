import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { handleChange, handleSubmitMultipart, handlePatchMultipart } from "../../utils/formHandles";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import Loader from "../../components/Loader";
import UploadProgress from "../../components/UploadProgress";

const MAX_LOGO_BYTES = 2 * 1024 * 1024; // 2 MB

const initialFormState = {
  name: "",
  logo: null,
};

function AdminPartnerForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const { data: existing, loading: loadingExisting } = useFetch(
    isEditing ? `/partners/${id}/` : null
  );

  const [formData, setFormData] = useState(initialFormState);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [uploadState, setUploadState] = useState(null);

  // Preview: the newly picked file if any, otherwise the logo already stored.
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (existing) {
      setFormData({ name: existing.name || "", logo: null });
      setPreview(existing.logo || null);
    }
  }, [existing]);

  function handleLogoChange(e) {
    const file = e.target.files?.[0] || null;

    if (!file) {
      setFormData((prev) => ({ ...prev, logo: null }));
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("The logo must be an image file.");
      return;
    }

    if (file.size > MAX_LOGO_BYTES) {
      setError("The logo must be smaller than 2 MB.");
      return;
    }

    setError(null);
    setPreview(URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, logo: file }));
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setUploadState(null);

    if (!formData.name.trim()) {
      setError("Name is required.");
      return;
    }

    // A logo is mandatory when creating; on edit the existing one is kept.
    if (!isEditing && !formData.logo) {
      setError("A logo is required.");
      return;
    }

    const uploadFileName = formData.logo?.name || "Partner logo";
    const updateUploadProgress = (progress) => {
      setUploadState((prev) => ({ ...prev, type: "logo", fileName: uploadFileName, progress }));
    };

    setUploadState({ type: "logo", fileName: uploadFileName, progress: 0 });

    const action = isEditing
      ? handlePatchMultipart(
          `/partners/${id}/`,
          setSending,
          setSuccess,
          setError,
          formData,
          updateUploadProgress
        )
      : handleSubmitMultipart(
          "/partners/",
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
        setTimeout(() => navigate("/admin/partners"), 700);
      })
      .catch(() => {
        setUploadState(null);
      });
  }

  if (isEditing && loadingExisting) return <Loader />;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-ink/10 p-6 max-w-lg">
      <h1 className="text-base font-serif text-ink mb-4">
        {isEditing ? "Edit Partner" : "Add New Partner"}
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
          <label className="block text-xs font-medium text-ink mb-1">
            Logo {isEditing ? "(optional)" : ""}
          </label>
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleLogoChange}
            className="w-full text-xs text-ink-soft"
          />
          {isEditing && (
            <p className="text-xs text-ink-soft/70 mt-1">Leave empty to keep the current logo.</p>
          )}
        </div>

        {preview && (
          <div>
            <p className="block text-xs font-medium text-ink mb-1">Preview</p>
            <div className="flex h-24 w-40 items-center justify-center overflow-hidden rounded-xl border border-ink/10 bg-slate-50 p-2">
              <img src={preview} alt="Logo preview" className="max-h-full max-w-full object-contain" />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={sending}
          className="w-full mt-2 bg-forest-800 hover:bg-forest-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg"
        >
          {sending ? "Saving..." : isEditing ? "Save Changes" : "Add Partner"}
        </button>
      </form>
    </div>
  );
}

export default AdminPartnerForm;
