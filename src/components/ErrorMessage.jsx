function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
      <span className="text-lg">⚠️</span>
      <span>{message}</span>
    </div>
  );
}

export default ErrorMessage;
