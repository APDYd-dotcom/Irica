import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { handleDelete } from "../../utils/formHandles";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { FileText } from "lucide-react";

function AdminBlogsList() {
  const { data, loading, error } = useFetch("/blogs/");
  const [items, setItems] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const blogs = items ?? data?.results ?? data ?? [];

  function handleRemove(id) {
    if (!window.confirm("Delete this blog post? This can't be undone.")) return;

    handleDelete(
      `/blogs/${id}/`,
      () => setItems((blogs ?? data).filter((item) => item.id !== id)),
      (message) => setDeleteError(message)
    );
  }

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-[1fr_220px] items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-ink-soft/70 font-semibold mb-2">
            Blog management
          </p>
          <h1 className="text-2xl font-serif text-ink">Blog</h1>
          <p className="mt-2 text-xs text-ink-soft max-w-2xl">
            View and manage blog posts published on the site.
          </p>
        </div>

        <Link
          to="/admin/blogs/new"
          className="inline-flex items-center justify-center rounded-full bg-forest-800 px-5 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-forest-700"
        >
          + Add blog post
        </Link>
      </div>

      {deleteError && (
        <div className="rounded-3xl border border-red-100 bg-red-50 p-4 text-red-700">
          <ErrorMessage message={deleteError} />
        </div>
      )}

      <div className="rounded-3xl border border-ink/10 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs text-ink-soft">Total posts</p>
            <p className="text-3xl font-semibold text-ink">{blogs?.length ?? 0}</p>
          </div>
          <p className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-ink-soft w-fit">
            Keep your blog current
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-ink/10 bg-white shadow-sm">
        <div className="grid grid-cols-[56px_1.5fr_1fr_90px_90px] gap-4 px-5 py-4 text-xs uppercase tracking-[0.25em] text-ink-soft bg-slate-50 border-b border-ink/10">
          <span>#</span>
          <span>Title</span>
          <span>Description</span>
          <span className="text-right">Edit</span>
          <span className="text-right">Delete</span>
        </div>

        {blogs?.length === 0 ? (
          <div className="px-5 py-10 text-center text-xs text-ink-soft">No blog posts found yet.</div>
        ) : (
          blogs.map((blog, index) => (
            <div key={blog.id} className="grid grid-cols-[56px_1.5fr_1fr_90px_90px] gap-4 items-center px-5 py-4 hover:bg-slate-50 transition">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-ink">{blog.title}</p>
                <p className="text-xs text-ink-soft/70 line-clamp-1">{blog.desc || "No description available."}</p>
              </div>
              <div className="text-xs text-ink-soft line-clamp-1">{blog.desc ? blog.desc.slice(0, 60) + (blog.desc.length > 60 ? "..." : "") : "—"}</div>
              <Link
                to={`/admin/blogs/${blog.id}/edit`}
                className="text-xs font-medium text-forest-800 hover:underline text-right"
              >
                Edit
              </Link>
              <button
                onClick={() => handleRemove(blog.id)}
                className="text-xs font-medium text-red-600 hover:underline text-right"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminBlogsList;
