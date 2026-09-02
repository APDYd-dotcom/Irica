import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function PaymentSuccess() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md text-center bg-white border border-ink/10 shadow-xl rounded-2xl p-10">
        <CheckCircle className="w-16 h-16 text-forest-800 mx-auto mb-4" aria-hidden="true" />
        <h1 className="text-2xl font-serif text-ink mb-2">Paiement confirmé</h1>
        <p className="text-ink-soft mb-6">
          Merci, votre paiement a été confirmé. Vous recevrez un email de confirmation sous peu.
        </p>
        <Link
          to="/"
          className="inline-block bg-forest-800 hover:bg-forest-700 text-white px-6 py-3 rounded-lg font-medium"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

export default PaymentSuccess;
