import { useEffect, useState } from "react";
import { getProgram } from "../api/programs";

export function useProgram(id) {
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return undefined;

    let cancelled = false;

    async function loadProgram() {
      setLoading(true);
      setError(null);

      try {
        const response = await getProgram(id);
        if (!cancelled) setProgram(response.data);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProgram();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { program, loading, error };
}
