import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { getErrorMessage } from "../utils/getErrorMessage";

// A reusable "go fetch this URL" helper — handles loading/error for you,
// so pages don't repeat the same boilerplate every time.
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    setLoading(true);
    setError(null);

    axiosClient
      .get(url)
      .then((response) => setData(response.data))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
