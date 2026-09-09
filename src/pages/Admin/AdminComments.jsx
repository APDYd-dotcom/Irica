import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { Mail, Trash2 } from "lucide-react";

function AdminComments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    async function fetchAllComments() {
      setLoading(true);
      setError(null);
      try {
        let results = [];
        let url = "/comments/";

        while (url) {
          const response = await axiosClient.get(url);
          const data = response.data;
          results = results.concat(data.results || data);
          url = data.next;
        }

        results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setComments(results);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }

    fetchAllComments();
  }, []);

  function formatDate(date) {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function handleRemove(id) {
    if (!window.confirm("Delete this message? This can't be undone.")) return;

    axiosClient
      .delete(`/comments/${id}/`)
      .then(() => {
        setComments((prev) => prev.filter((c) => c.id !== id));
      })
      .catch((err) => {
        setDeleteError(getErrorMessage(err));
      });
  }

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-ink/10 p-6">
      <div className="mb-4">
        <h2 className="text-xl font-serif text-ink">Messages de contact</h2>
        <p className="text-xs text-ink-soft mt-1">
          {comments.length} message{comments.length !== 1 ? "s" : ""} au total
        </p>
      </div>

      {deleteError && (
        <div className="rounded-3xl border border-red-100 bg-red-50 p-4 text-red-700 mb-4">
          <ErrorMessage message={deleteError} />
        </div>
      )}

      {comments.length === 0 ? (
        <div className="text-center text-sm text-ink-soft py-10">Aucun message pour le moment.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/10">
                <th className="text-left py-3 px-4 font-medium text-ink-soft text-xs uppercase tracking-wider">Nom</th>
                <th className="text-left py-3 px-4 font-medium text-ink-soft text-xs uppercase tracking-wider">Email</th>
                <th className="text-left py-3 px-4 font-medium text-ink-soft text-xs uppercase tracking-wider">Organisation</th>
                <th className="text-left py-3 px-4 font-medium text-ink-soft text-xs uppercase tracking-wider">Message</th>
                <th className="text-left py-3 px-4 font-medium text-ink-soft text-xs uppercase tracking-wider">Date</th>
                <th className="text-right py-3 px-4 font-medium text-ink-soft text-xs uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => {
                const isLong = comment.message && comment.message.length > 120;
                const isExpanded = expandedId === comment.id;
                const displayMessage = isLong && !isExpanded
                  ? comment.message.slice(0, 120) + "..."
                  : comment.message;

                return (
                  <tr key={comment.id} className="border-b border-ink/5 last:border-0">
                    <td className="py-3 px-4 text-ink font-medium">{comment.name}</td>
                    <td className="py-3 px-4 text-ink-soft">
                      <a href={`mailto:${comment.email}`} className="text-primary-700 hover:underline">
                        {comment.email}
                      </a>
                    </td>
                    <td className="py-3 px-4 text-ink-soft">{comment.organization || "—"}</td>
                    <td className="py-3 px-4 text-ink-soft">
                      <span>{displayMessage}</span>
                      {isLong && (
                        <button
                          type="button"
                          onClick={() => setExpandedId(isExpanded ? null : comment.id)}
                          className="ml-2 text-xs text-primary-700 hover:underline"
                        >
                          {isExpanded ? "Voir moins" : "Voir plus"}
                        </button>
                      )}
                    </td>
                    <td className="py-3 px-4 text-ink-soft text-xs">{formatDate(comment.created_at)}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleRemove(comment.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminComments;
