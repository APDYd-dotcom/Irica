import { useState, useEffect, useRef } from "react";
import axiosClient from "../api/axiosClient";
import { getErrorMessage } from "../utils/getErrorMessage";

function PublicationsSection() {
 
  
  const [publications, setPublications] = useState([]);
  const [nextUrl, setNextUrl] = useState("/publications/");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const rowRef = useRef(null);
  
  function scrollNext() {
    if (!rowRef.current) return;
    rowRef.current.scrollBy({ left: rowRef.current.clientWidth, behavior: "smooth" });
  }

  useEffect(() => {
    if (!nextUrl) return;
  
    // Initially nextUrl points to '/publications/' which loads the first page
    // We'll call `loadMore` to fetch and append results. For the initial load, call once.
    if (publications.length === 0) {
      loadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  async function loadMore() {
    if (!nextUrl) return;
    setLoading(true);
    setError(null);
    try {
      const resp = await axiosClient.get(nextUrl);
      const data = resp.data;
      setPublications((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const newItems = (data.results || []).filter((item) => !existingIds.has(item.id));
        return [...prev, ...newItems];
      });
      // `data.next` from API may be a full URL; convert to relative path if same origin
      setNextUrl(data.next ? data.next.replace(import.meta.env.VITE_API_URL, "/") : null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <section id="publications" className="bg-forest-50 py-20 px-6 border-y border-forest-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <div className="text-forest-800 font-mono text-sm font-semibold tracking-widest uppercase">▪ Publications</div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink">Analyses & Réflexions Récentes</h2>
          <p className="text-ink-soft max-w-xl mx-auto text-sm">
            Les points de vue et contributions techniques de nos chercheurs et consultants sur les défis socio-économiques.
          </p>
        </div>
  
        {error && <div className="text-center text-red-600 mb-4">{error}</div>}
  
        <div ref={rowRef} className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hidden">
          {publications.map((pub) => (
            <article key={pub.id} className="w-[22rem] h-[28rem] flex-none bg-white p-6 rounded-2xl border border-forest-100 hover:border-forest-800/30 transition duration-300 flex flex-col justify-between space-y-6 snap-start">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-ink-soft">
                  <span>{pub.created_at ? new Date(pub.created_at).toLocaleDateString() : ""}</span>
                  <span className="text-forest-800 uppercase font-semibold">{pub.program_title || pub.type || "Publication"}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-ink leading-snug hover:text-forest-800 transition">
                  {pub.url ? (
                    <a href={pub.url} target="_blank" rel="noreferrer">{pub.title}</a>
                  ) : (
                    <span>{pub.title}</span>
                  )}
                </h3>
                <p className="text-xs text-ink-soft leading-relaxed">{pub.description}</p>
              </div>
              {pub.file && (
                <div className="pt-2">
                  <a href={pub.file} target="_blank" rel="noreferrer" className="bg-green-600 hover:bg-green-700 text-white transition duration-300 px-8 py-3.5 rounded-lg font-semibold shadow-md text-center mt-4">
                    Lire <span>→</span>
                  </a>
                </div>
              )}
            </article>
          ))}
          </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={scrollNext}
              className="inline-flex items-center gap-2 rounded-full bg-forest-800 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-forest-900/20 transition hover:bg-forest-700"
            >
              <span>Voir autres</span>
              <span className="text-lg">→</span>
            </button>
            <div className="flex-1 text-forest-800 text-sm font-medium">Faites défiler les publications disponibles</div>
          </div>

          <div className="text-center">
            {loading && (
              <button disabled className="px-6 py-2 bg-forest-800 text-white rounded-xl">Chargement…</button>
            )}
            {!loading && nextUrl && (
              <button onClick={loadMore} className="px-6 py-2 bg-forest-800 text-white rounded-xl hover:bg-forest-700 transition">Charger plus</button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
  
export default PublicationsSection;

  