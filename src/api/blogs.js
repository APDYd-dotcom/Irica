import api from "./axios";

export const getBlogs = (url = "/blogs/") => api.get(url);
export const getBlog = (id) => api.get(`/blogs/${id}/`);
