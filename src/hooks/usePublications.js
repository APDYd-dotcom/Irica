import { useEffect, useState } from "react";
import { getPublications } from "../api/publications";

export function usePublications() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPublications() {
      setLoading(true);
      setError(null);

      try {
        let nextUrl = "/publications/";
        const results = [];

        while (nextUrl) {
          const response = await getPublications(nextUrl);
          const data = response.data;
          results.push(...(data.results ?? data ?? []));
          nextUrl = data.next || null;
        }

        if (!cancelled) setPublications(results);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPublications();

    return () => {
      cancelled = true;
    };
  }, []);

  return { publications, loading, error };
}
