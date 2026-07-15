import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-serif text-ink mb-2">404</h1>
      <p className="text-ink-soft mb-6">This page doesn't exist.</p>
      <Link to="/" className="text-forest-800 hover:underline">
        Go back home
      </Link>
    </div>
  );
}

export default NotFound;
