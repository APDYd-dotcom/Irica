import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function MaterialsPreview() {
  const { data, loading, error } = useFetch("/programs/");
  const programs = data?.results ?? data ?? [];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <p className="eyebrow text-primary-700 mb-3">Programs</p>
      <h1 className="font-serif text-3xl text-ink mb-3">Programs & Articles</h1>
      <p className="text-ink-soft max-w-2xl mb-10">
        Select a program and use your email plus access code in the dashboard to view related articles.
      </p>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {programs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {programs.map((program) => (
            <article key={program.id} className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm">
              {program.photo ? (
                <img src={program.photo} alt={program.title} className="h-40 w-full object-cover" />
              ) : (
                <div className="flex h-40 items-center justify-center bg-forest-800 text-5xl text-white">
                  <GraduationCap className="h-10 w-10" />
                </div>
              )}
              <div className="p-5">
                <p className="eyebrow text-forest-800 mb-2">
                  {program.is_free ? "Free" : `${program.price || 0} FBU`}
                </p>
                <h2 className="font-serif text-xl text-ink">{program.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-ink-soft">
                  {program.descr || "No description available."}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="mt-16 text-center border-t border-ink/10 pt-12">
        <p className="font-serif text-2xl text-ink mb-6">Have an access code?</p>
        <Link
          to="/dashboard/programs"
          className="inline-block bg-forest-800 hover:bg-forest-700 text-white px-8 py-3.5 rounded-full font-medium transition"
        >
          Unlock Articles
        </Link>
      </div>
    </div>
  );
}

export default MaterialsPreview;
