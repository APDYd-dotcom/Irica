import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { handleChange, handleSubmitMultipart, handlePatchMultipart } from "../../utils/formHandles";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import Loader from "../../components/Loader";
import UploadProgress from "../../components/UploadProgress";

const initialFormState = {
  program: "",
  type: "text",
  title: "",
  description: "",
  content: "",   // text body — sent as the "file" field via Blob for type=text
  url: "",       // for type=link
  file: null,    // for type=pdf, video, photo
};

// Human-readable type labels
const TYPE_OPTIONS = [
  { value: "text",  label: "📝  Text Article" },
  { value: "pdf",   label: "📄  Document (PDF / Word)" },
  { value: "video", label: "🎬  Video File" },
  { value: "link",  label: "🔗  Online Link" },
  { value: "photo", label: "🖼️  Photo / Graphic" },
];

function AdminArticleForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestedProgramId = searchParams.get("program");

  const { data: programsData, loading: programsLoading } = useFetch("/programs/");
  const programs = programsData?.results ?? programsData ?? [];

  const { data: existing, loading: loadingExisting } = useFetch(
    isEditing ? `/articles/${id}/` : null
  );

  const [formData, setFormData] = useState(initialFormState);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [uploadState, setUploadState] = useState(null);

  // Fill form when editing
  useEffect(() => {
    if (existing) {
      setFormData({
        program: existing.program || "",
        type: existing.type || "text",
        title: existing.title || "",
        description: existing.description || "",
        content: "",   // can't restore text blob from API
        url: existing.url || "",
        file: null,
      });
    }
  }, [existing]);

  // Auto-select the requested program on create, falling back to the first one.
  useEffect(() => {
    if (!isEditing && programs.length > 0 && !formData.program) {
      const requestedProgram = programs.find((program) => String(program.id) === requestedProgramId);
      setFormData((prev) => ({
        ...prev,
        program: requestedProgram?.id ?? programs[0].id,
      }));
    }
  }, [programs, isEditing, formData.program, requestedProgramId]);

  // When type changes, clear type-specific fields
  function handleTypeChange(e) {
    const newType = e.target.value;
    setFormData((prev) => ({
      ...prev,
      type: newType,
      content: "",
      url: "",
      file: null,
    }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setUploadState(null);

    if (!formData.program) {
      setError("Please select a program.");
      return;
    }

    // For text articles, we send the body as a plain-text Blob attached to "file"
    let payload = { ...formData };
    if (formData.type === "text") {
      if (!formData.content.trim()) {
        setError("Please enter the article text.");
        return;
      }
      // Convert the typed content into a file Blob so the multipart helper can attach it
      const blob = new Blob([formData.content], { type: "text/plain" });
      payload.file = new File([blob], `${formData.title || "article"}.txt`, { type: "text/plain" });
      payload.content = undefined; // remove non-API field
    }

    const resetState = {
      ...initialFormState,
      program: payload.program || programs[0]?.id || "",
    };
    const uploadFileName = payload.file?.name || payload.url || payload.title || "Article";
    const updateUploadProgress = (progress) => {
      setUploadState((prev) => ({
        ...prev,
        type: payload.type,
        fileName: uploadFileName,
        progress,
      }));
    };

    setUploadState({
      type: payload.type,
      fileName: uploadFileName,
      progress: 0,
    });

    const action = isEditing
      ? handlePatchMultipart(`/articles/${id}/`, setSending, setSuccess, setError, payload, updateUploadProgress)
      : handleSubmitMultipart("/articles/", setSending, setSuccess, setError, payload, setFormData, resetState, updateUploadProgress);

    action
      .then(() => {
        setUploadState((prev) => prev ? { ...prev, progress: 100 } : prev);
        setTimeout(() => navigate(`/admin/articles?program=${payload.program}`), 700);
      })
      .catch(() => {
        setUploadState(null);
      });
  }

  if (programsLoading || (isEditing && loadingExisting)) return <Loader />;

  const type = formData.type;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-ink/10 p-6 max-w-2xl">
      <h1 className="text-lg font-serif text-ink mb-1">
        {isEditing ? "Edit Article" : "Add New Article"}
      </h1>
      <p className="text-sm text-ink-soft mb-6">
        Fill in the fields below. Required fields are marked with *
      </p>

      {success && <div className="mb-4"><SuccessMessage message="Saved successfully! Redirecting…" /></div>}
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

      <form onSubmit={handleFormSubmit} className="space-y-5">

        {/* ── Program ── */}
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Program *</label>
          <select
            name="program"
            value={formData.program}
            onChange={(e) => handleChange(e, setFormData)}
            required
            className="w-full border border-ink/15 rounded-lg px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-forest-800/40"
          >
            <option value="">— Select Program —</option>
            {programs.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>

        {/* ── Type ── */}
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Article Type *</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {TYPE_OPTIONS.map(({ value, label }) => (
              <label
                key={value}
                className={`flex items-center gap-2 cursor-pointer rounded-xl border px-4 py-3 text-sm font-medium transition
                  ${type === value
                    ? "border-forest-800 bg-forest-50 text-forest-800"
                    : "border-ink/15 bg-white text-ink-soft hover:border-forest-400"
                  }`}
              >
                <input
                  type="radio"
                  name="type"
                  value={value}
                  checked={type === value}
                  onChange={handleTypeChange}
                  className="accent-forest-800"
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* ── Title ── */}
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Title *</label>
          <input
            name="title"
            value={formData.title}
            onChange={(e) => handleChange(e, setFormData)}
            required
            placeholder="Article title…"
            className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
          />
        </div>

        {/* ── Description (all types) ── */}
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Short Description</label>
          <textarea
            name="description"
            rows="2"
            value={formData.description}
            onChange={(e) => handleChange(e, setFormData)}
            placeholder="A brief summary shown in the article list…"
            className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
          />
        </div>

        {/* ══ TYPE-SPECIFIC SECTION ══ */}

        {/* TEXT — rich textarea body */}
        {type === "text" && (
          <div>
            <label className="block text-sm font-medium text-ink mb-1">
              Article Body *
            </label>
            <textarea
              name="content"
              rows="12"
              value={formData.content}
              onChange={(e) => handleChange(e, setFormData)}
              placeholder="Write your full article text here…"
              required
              className="w-full border border-ink/15 rounded-lg px-4 py-2.5 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-forest-800/40"
            />
            <p className="text-xs text-ink-soft/70 mt-1">
              {formData.content.length} characters
              {isEditing && " — leave empty to keep the current text file."}
            </p>
          </div>
        )}

        {/* PDF / WORD — document upload */}
        {type === "pdf" && (
          <div>
            <label className="block text-sm font-medium text-ink mb-1">
              Document File * <span className="text-ink-soft font-normal">(PDF or Word)</span>
            </label>
            <div className="border-2 border-dashed border-ink/20 rounded-xl p-6 text-center hover:border-forest-400 transition">
              <div className="text-3xl mb-2">📄</div>
              <p className="text-sm text-ink-soft mb-3">
                {formData.file ? formData.file.name : "Choose a PDF or Word document"}
              </p>
              <input
                type="file"
                name="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(e) => handleChange(e, setFormData)}
                className="block w-full text-sm text-ink-soft file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-forest-50 file:text-forest-800 hover:file:bg-forest-100"
              />
              {isEditing && !formData.file && (
                <p className="text-xs text-ink-soft/70 mt-2">Leave empty to keep the current document.</p>
              )}
            </div>
          </div>
        )}

        {/* VIDEO — direct video upload */}
        {type === "video" && (
          <div>
            <label className="block text-sm font-medium text-ink mb-1">
              Video File * <span className="text-ink-soft font-normal">(MP4, MOV, AVI…)</span>
            </label>
            <div className="border-2 border-dashed border-ink/20 rounded-xl p-6 text-center hover:border-forest-400 transition">
              <div className="text-3xl mb-2">🎬</div>
              {formData.file ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-ink">{formData.file.name}</p>
                  <p className="text-xs text-ink-soft">
                    {(formData.file.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, file: null }))}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <p className="text-sm text-ink-soft mb-3">
                  {isEditing ? "Choose a new video to replace the current one" : "Choose a video file to upload"}
                </p>
              )}
              <input
                type="file"
                name="file"
                accept="video/mp4,video/quicktime,video/x-msvideo,video/webm,video/*"
                onChange={(e) => handleChange(e, setFormData)}
                className="block w-full text-sm text-ink-soft file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-forest-50 file:text-forest-800 hover:file:bg-forest-100 mt-3"
              />
              {isEditing && !formData.file && (
                <p className="text-xs text-ink-soft/70 mt-2">Leave empty to keep the current video.</p>
              )}
            </div>
          </div>
        )}

        {/* LINK — external URL */}
        {type === "link" && (
          <div>
            <label className="block text-sm font-medium text-ink mb-1">External URL *</label>
            <input
              type="url"
              name="url"
              placeholder="https://…"
              value={formData.url}
              onChange={(e) => handleChange(e, setFormData)}
              required
              className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
            />
          </div>
        )}

        {/* PHOTO — image upload */}
        {type === "photo" && (
          <div>
            <label className="block text-sm font-medium text-ink mb-1">
              Image File * <span className="text-ink-soft font-normal">(JPG, PNG, WebP…)</span>
            </label>
            <div className="border-2 border-dashed border-ink/20 rounded-xl p-6 text-center hover:border-forest-400 transition">
              <div className="text-3xl mb-2">🖼️</div>
              {formData.file ? (
                <div className="space-y-2">
                  <img
                    src={URL.createObjectURL(formData.file)}
                    alt="preview"
                    className="mx-auto max-h-40 rounded-lg object-cover"
                  />
                  <p className="text-xs text-ink-soft">{formData.file.name}</p>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, file: null }))}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <p className="text-sm text-ink-soft mb-3">
                  {isEditing ? "Choose a new image to replace the current one" : "Choose an image to upload"}
                </p>
              )}
              <input
                type="file"
                name="file"
                accept="image/*"
                onChange={(e) => handleChange(e, setFormData)}
                className="block w-full text-sm text-ink-soft file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-forest-50 file:text-forest-800 hover:file:bg-forest-100 mt-3"
              />
              {isEditing && !formData.file && (
                <p className="text-xs text-ink-soft/70 mt-2">Leave empty to keep the current image.</p>
              )}
            </div>
          </div>
        )}

        {/* ── Submit ── */}
        <button
          type="submit"
          disabled={sending}
          className="w-full mt-2 bg-forest-800 hover:bg-forest-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition"
        >
          {sending ? "Saving…" : isEditing ? "Save Changes" : "Add Article"}
        </button>
      </form>
    </div>
  );
}

export default AdminArticleForm;
