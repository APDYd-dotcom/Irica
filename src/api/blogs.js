import api from "./axios";

export const getBlogs = (url = "/blogs/") => api.get(url);
