import api from "./axios";

// TODO: Confirmer le schéma exact renvoyé par GET /payments/{id}/ après test en conditions réelles.
// Hypothèse courante : { id, amount, currency, status, program: { id, title }, email, created_at }
export const getPayment = (id) => api.get(`/payments/${id}/`);

// TODO: Confirmer le body exact attendu par POST /access-programs/pay/.
// Hypothèse : { payment_id: number } ou { program: number, email: string }
export const payProgram = (payload) => api.post("/access-programs/pay/", payload);
