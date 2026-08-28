import api from "./axios";

export const getPrograms = (url = "/programs/") => api.get(url);
export const getProgram = (id) => api.get(`/programs/${id}/`);
