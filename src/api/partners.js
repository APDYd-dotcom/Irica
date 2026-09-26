import api from "./axios";

export const getPartners = (url = "/partners/") => api.get(url);