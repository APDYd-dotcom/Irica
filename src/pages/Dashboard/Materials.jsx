import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import MaterialCard from "../../components/MaterialCard";

// PROTECTED page — this endpoint (/materials/) should require authentication
// on the Django side, and return REAL file/url fields only if request.user's
// subscription is active (see the architecture doc for the view logic).
function Materials() {
  const { data, loading, error } = useFetch("/materials/");

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1 className="text-xl font-bold text-ink mb-6">Your Resources</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {data?.map((material) => (
          <MaterialCard
            key={material.id}
            material={material}
            unlocked={Boolean(material.url || material.file)}
            // ^ if Django's serializer only includes url/file when subscription
            // is active, this naturally becomes true/false without extra logic here.
          />
        ))}
      </div>
    </div>
  );
}

export default Materials;
