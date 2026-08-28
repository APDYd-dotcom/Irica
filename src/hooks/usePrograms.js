import { useEffect, useState } from "react";
import { getPrograms } from "../api/programs";

export function usePrograms() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPrograms() {
      setLoading(true);
      setError(null);

      try {
        let nextUrl = "/programs/";
        const results = [];

        while (nextUrl) {
          const response = await getPrograms(nextUrl);
          const data = response.data;
          results.push(...(data.results ?? data ?? []));
          nextUrl = data.next || null;
        }

        if (!cancelled) setPrograms(results);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPrograms();

    return () => {
      cancelled = true;
    };
  }, []);

  return { programs, loading, error };
}
