import { CheckCircle2 } from "lucide-react";

function SuccessMessage({ message }) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary-700 text-sm rounded-lg px-4 py-3">
      <CheckCircle2 className="h-5 w-5" />
      <span>{message}</span>
    </div>
  );
}

export default SuccessMessage;
