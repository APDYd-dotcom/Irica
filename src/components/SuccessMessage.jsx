function SuccessMessage({ message }) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
      <span className="text-lg">✅</span>
      <span>{message}</span>
    </div>
  );
}

export default SuccessMessage;
