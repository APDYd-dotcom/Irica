// Turns a raw axios error into a readable string, safe to put directly in JSX.
export function getErrorMessage(error) {
  if (!error) return "Une erreur est survenue.";

  if (error.code === "ECONNABORTED") {
    return "La requête a expiré. Veuillez réessayer.";
  }

  if (!error.response) {
    return "Erreur réseau. Veuillez vérifier votre connexion et réessayer.";
  }

  const data = error.response.data;

  if (typeof data === "string") return data;

  if (typeof data === "object") {
    if (data.detail) return data.detail;

    return Object.entries(data)
      .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`)
      .join(" | ");
  }

  return error.message || "Une erreur est survenue.";
}
