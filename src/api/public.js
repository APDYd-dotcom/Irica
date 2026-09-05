import axios from "axios";

const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function submitComment({ name, email, organization, message }) {
  const response = await publicApi.post("/comments/", { name, email, organization, message });
  return response.data;
}

export async function subscribeNewsletter(email) {
  const response = await publicApi.post("/newsletter/", { email });
  return response.data;
}

export default publicApi;
