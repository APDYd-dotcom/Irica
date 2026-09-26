import api from "./axios";

export const getTestimonies = (url = "/testimonies/") => api.get(url);