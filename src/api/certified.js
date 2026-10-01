import api from "./axios";

export const getCertificates = (url = "/certified/") => api.get(url);

/**
 * Fetch a single certificate by id.
 *
 * VERIFIED on 2026-10-01 against the live API:
 *   GET /certified/1/    -> 200, returns the same flat object as a list entry
 *   GET /certified/9999/ -> 404, so unknown ids fail cleanly
 * The detail route therefore exists and is the primary path below. The list
 * fallback is kept only as a safety net (e.g. 405 if the route is ever exposed
 * as a plain list view).
 *
 * TODO: remove the list fallback once the detail route is guaranteed in the
 * backend API contract — it costs a full extra request per unknown id.
 *
 * @returns {Promise<object|null>} the certificate, or null when the id is unknown.
 * @throws on non-404/405 errors (network, 5xx) so callers can show an error state.
 */
export const getCertificate = async (id) => {
  try {
    const { data } = await api.get(`/certified/${id}/`);
    return data;
  } catch (err) {
    const status = err?.response?.status;
    if (status !== 404 && status !== 405) throw err;

    const { data } = await getCertificates();
    const results = data?.results || data || [];
    return results.find((item) => String(item.id) === String(id)) || null;
  }
};