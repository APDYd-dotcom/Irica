import axiosClient from "../api/axiosClient";
import { getErrorMessage } from "./getErrorMessage";

// ONE universal function that updates any field in a formData object —
// works for text, textarea, select, checkbox, AND file inputs alike.
export const handleChange = (e, setFormData) => {
  const { name, value, type, checked, files } = e.target;

  setFormData((prev) => ({
    ...prev,
    // checkbox → true/false, file → the actual File object, everything else → value
    [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
  }));
};

// Submitting a file needs a DIFFERENT "envelope" than plain JSON — this builds
// a FormData object (like a physical envelope that can hold actual files inside,
// not just text) from a normal formData object.
export const buildFormData = (formData) => {
  const data = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      data.append(key, value);
    }
  });
  return data;
};

// Generic POST submit handler — same shape we built together earlier.
// Every form page calls this the same way, just with different arguments.
export const handleSubmit = (url, setSending, setSuccess, setError, formData, setFormData, initialFormState) => {
  setSending(true);
  setSuccess(false);
  setError(null);

  return axiosClient.post(url, formData)
    .then((response) => {
      setSuccess(true);
      if (initialFormState) setFormData(initialFormState);
      return response.data;
    })
    .catch((error) => {
      setError(getErrorMessage(error));
      throw error; // let the caller react further if needed (e.g. redirect only on success)
    })
    .finally(() => {
      setSending(false);
    });
};

// Same idea, but for PATCH requests (used by the Profile page to edit info)
// instead of resetting the form, it keeps whatever the server sends back.
export const handlePatch = (url, setSending, setSuccess, setError, formData) => {
  setSending(true);
  setSuccess(false);
  setError(null);

  return axiosClient.patch(url, formData)
    .then((response) => {
      setSuccess(true);
      return response.data;
    })
    .catch((error) => {
      setError(getErrorMessage(error));
      throw error;
    })
    .finally(() => {
      setSending(false);
    });
};

// Same as handleSubmit, but sends a FormData "envelope" instead of plain JSON —
// required whenever the form includes a file input (like a book's PDF or a thumbnail).
// Axios automatically sets the correct multipart Content-Type when it sees a FormData object.
// onUploadProgress is optional — if provided, Axios will call it with { loaded, total }
// so you can compute the upload % and show a progress bar in the UI.
export const handleSubmitMultipart = (url, setSending, setSuccess, setError, formData, setFormData, initialFormState, onUploadProgress) => {
  setSending(true);
  setSuccess(false);
  setError(null);

  return axiosClient.post(url, buildFormData(formData), {
    onUploadProgress: onUploadProgress
      ? (evt) => {
          if (evt.total) onUploadProgress(Math.round((evt.loaded * 100) / evt.total));
        }
      : undefined,
  })
    .then((response) => {
      setSuccess(true);
      if (initialFormState) setFormData(initialFormState);
      return response.data;
    })
    .catch((error) => {
      setError(getErrorMessage(error));
      throw error;
    })
    .finally(() => {
      setSending(false);
    });
};

// Multipart version of PATCH — used when EDITING a material that might include a new file.
export const handlePatchMultipart = (url, setSending, setSuccess, setError, formData, onUploadProgress) => {
  setSending(true);
  setSuccess(false);
  setError(null);

  return axiosClient.patch(url, buildFormData(formData), {
    onUploadProgress: onUploadProgress
      ? (evt) => {
          if (evt.total) onUploadProgress(Math.round((evt.loaded * 100) / evt.total));
        }
      : undefined,
  })
    .then((response) => {
      setSuccess(true);
      return response.data;
    })
    .catch((error) => {
      setError(getErrorMessage(error));
      throw error;
    })
    .finally(() => {
      setSending(false);
    });
};

// Simple DELETE helper — used by the admin materials list to remove an item.
export const handleDelete = (url, onSuccess, onError) => {
  return axiosClient.delete(url)
    .then(() => {
      if (onSuccess) onSuccess();
    })
    .catch((error) => {
      if (onError) onError(getErrorMessage(error));
    });
};
