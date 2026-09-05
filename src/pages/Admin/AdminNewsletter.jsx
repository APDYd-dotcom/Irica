import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { Trash2 } from "lucide-react";

function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchAllSubscribers() {
      setLoading(true);
      setError(null);
      try {
        let results = [];
        let url = "/newsletter/";

        while (url) {
          const response = await axiosClient.get(url);
          const data = response.data;
          results = results.concat(data.results || data);
          url = data.next;
        }

        setSubscribers(results);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }

    fetchAllSubscribers();
  }, []);

  async function handleCopyAll() {
    try {
      const emails = subscribers.map((s) => s.email).join(", ");
      await navigator.clipboard.writeText(emails);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // ignore clipboard errors silently
    }
  }

  async function handleDelete(id) {
    try {
      await axiosClient.delete(`/newsletter/${id}/`);
      setSubscribers((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      alert(getErrorMessage(err));
    }
  }

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-ink/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-serif text-ink">Abonnés Newsletter</h2>
          <p className="text-xs text-ink-soft mt-1">
            {subscribers.length} abonné{subscribers.length !== 1 ? "s" : ""} au total
          </p>
        </div>
        {subscribers.length > 0 && (
          <button
            onClick={handleCopyAll}
            className="bg-forest-800 hover:bg-forest-700 text-white px-4 py-2 rounded-lg text-xs"
          >
            {copied ? "Copié !" : "Copier tous les emails"}
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink/10">
              <th className="text-left py-3 px-4 font-medium text-ink-soft text-xs uppercase tracking-wider">Email</th>
              <th className="text-left py-3 px-4 font-medium text-ink-soft text-xs uppercase tracking-wider">Date d'inscription</th>
              <th className="text-right py-3 px-4 font-medium text-ink-soft text-xs uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber) => (
              <tr key={subscriber.id} className="border-b border-ink/5 last:border-0">
                <td className="py-3 px-4 text-ink">{subscriber.email}</td>
                <td className="py-3 px-4 text-ink-soft text-xs">
                  {new Date(subscriber.created_at).toLocaleDateString("fr-FR")}
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleDelete(subscriber.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Supprimer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminNewsletter;
