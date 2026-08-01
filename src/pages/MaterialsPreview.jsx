import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import MaterialCard from "../components/MaterialCard";

// PUBLIC page — anyone can see titles/descriptions, but everything is locked.
// Your Django endpoint here should NOT require login (AllowAny),
// and should always return the "preview" serializer (no file/url fields).
function MaterialsPreview() {
  const { data, loading, error } = useFetch("/materials/public/");

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <p className="eyebrow text-gold-500 mb-3">▪ The Shelf</p>
      <h1 className="font-serif text-3xl text-ink mb-3">Resources</h1>
      <p className="text-ink-soft max-w-2xl mb-10">
        Subscribe for one month of full access to every book, video, and link below.
      </p>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.map((material) => (
            <MaterialCard key={material.id} material={material} unlocked={false} />
          ))}
        </div>
      )}

      <div className="mt-16 text-center border-t border-ink/10 pt-12">
        <p className="font-serif text-2xl text-ink mb-6">Ready to unlock everything?</p>
        <Link
          to="/checkout"
          className="inline-block bg-forest-800 hover:bg-forest-700 text-white px-8 py-3.5 rounded-full font-medium transition"
        >
          Subscribe Now
        </Link>
      </div>
    </div>
  );
}

export default MaterialsPreview;
