// Turns a raw axios error into a readable string, safe to put directly in JSX.
export function getErrorMessage(error) {
  if (error.response?.data) {
    const data = error.response.data;

    if (typeof data === "string") return data;

    if (typeof data === "object") {
      // Django REST Framework often sends { detail: "..." } for simple errors
      if (data.detail) return data.detail;

      // Or field-by-field validation errors: { email: ["already exists"] }
      return Object.entries(data)
        .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`)
        .join(" | ");
    }
  }

  return error.message || "Something went wrong.";
}
