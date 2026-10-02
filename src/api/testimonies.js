import api from "./axios";

export const getTestimonies = (url = "/testimonies/") => api.get(url);

// VERIFIED on 2026-10-02 against the live API via OPTIONS:
//   /testimonies/     -> Allow: GET, POST, HEAD, OPTIONS
//   /testimonies/{id}/ -> Allow: GET, PUT, PATCH, DELETE, HEAD, OPTIONS
// Required fields reported by POST /testimonies/ {}: name, position, content.
export const createTestimony = (formData) => api.post("/testimonies/", formData);
export const updateTestimony = (id, formData) => api.patch(`/testimonies/${id}/`, formData);
export const deleteTestimony = (id) => api.delete(`/testimonies/${id}/`);
