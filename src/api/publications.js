import api from "./axios";

export const getPublications = (url = "/publications/") => api.get(url);
