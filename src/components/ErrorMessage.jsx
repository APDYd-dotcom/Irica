import { AlertCircle } from "lucide-react";

function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 text-sm rounded-xl px-4 py-3">
      <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <span className="leading-relaxed">{message}</span>
    </div>
  );
}

export default ErrorMessage;
