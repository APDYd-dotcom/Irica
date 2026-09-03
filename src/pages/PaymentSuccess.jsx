import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Clock, Smartphone, XCircle } from "lucide-react";

function decodeMessage(raw) {
  if (!raw) return "";
  let text = String(raw);
  text = text.replace(/<br\s*\/?\s*>/gi, "\n");
  return text.trim();
}

function looksLikeMobileMoneyInstructions(message) {
  if (!message) return false;
  const m = message.toLowerCase();
  return (
    m.includes("ussd") ||
    m.includes("*163#") ||
    m.includes("lumicash") ||
    m.includes("mobile money") ||
    m.includes("confirm") ||
    m.includes("confirmer") ||
    m.includes("téléphone") ||
    m.includes("telephone") ||
    m.includes("phone")
  );
}

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "";
  const transactionRef = searchParams.get("transaction_ref") || "";
  const rawMessage = searchParams.get("message") || "";
  const message = decodeMessage(rawMessage);

  const hasAnyParam = status || transactionRef || rawMessage;

  if (!hasAnyParam) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="max-w-md text-center bg-white border border-ink/10 shadow-xl rounded-2xl p-10">
          <div className="text-5xl mb-4">📧</div>
          <h1 className="text-2xl font-serif text-ink mb-2">Almost there!</h1>
          <p className="text-ink-soft mb-6">
            If your payment was successful, your login details have been sent to your email.
            Check your inbox (and spam folder) in the next few minutes.
          </p>
          <Link
            to="/login"
            className="inline-block bg-forest-800 hover:bg-forest-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
        <div className="max-w-md w-full text-center bg-white border border-ink/10 shadow-xl rounded-2xl p-10">
          <XCircle className="h-12 w-12 mx-auto text-red-600 mb-4" />
          <h1 className="text-2xl font-serif text-ink mb-2">Le paiement a échoué</h1>
          <p className="text-ink-soft mb-6">
            Une erreur est survenue lors du traitement de votre paiement.
          </p>

          {message && (
            <div className="text-left bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
              <p className="whitespace-pre-line text-sm text-red-700">{message}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/programs"
              className="inline-block bg-forest-800 hover:bg-forest-700 text-white px-6 py-3 rounded-full font-medium"
            >
              Retour aux programmes
            </Link>
            <Link
              to="/login"
              className="inline-block bg-white border border-ink/15 text-ink hover:border-forest-800 px-6 py-3 rounded-full font-medium"
            >
              Aller au login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (status === "success" && looksLikeMobileMoneyInstructions(message)) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
        <div className="max-w-md w-full text-center bg-white border border-ink/10 shadow-xl rounded-2xl p-10">
          <Smartphone className="h-12 w-12 mx-auto text-primary-700 mb-4" />
          <h1 className="text-2xl font-serif text-ink mb-2">
            Confirmez le paiement sur votre téléphone
          </h1>
          <p className="text-ink-soft mb-6">
            Suivez les instructions ci-dessous pour valider votre transaction mobile money.
          </p>

          <div className="text-left bg-neutral-50 border border-ink/10 rounded-2xl p-6 mb-6">
            <p className="whitespace-pre-line text-sm text-ink leading-6">{message}</p>
          </div>

          <Link
            to="/"
            className="inline-block bg-forest-800 hover:bg-forest-700 text-white px-6 py-3 rounded-full font-medium"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
        <div className="max-w-md text-center bg-white border border-ink/10 shadow-xl rounded-2xl p-10">
          <CheckCircle2 className="h-12 w-12 mx-auto text-primary-700 mb-4" />
          <h1 className="text-2xl font-serif text-ink mb-2">Paiement confirmé</h1>
          <p className="text-ink-soft mb-6">
            Si votre paiement a été validé, vos accès ont été envoyés par email.
            Vérifiez votre boîte de réception (et le dossier spam) dans les prochaines minutes.
          </p>

          {transactionRef && (
            <p className="text-xs text-ink-soft/70 mb-6">
              Référence : <span className="font-mono">{transactionRef}</span>
            </p>
          )}

          {message && (
            <div className="text-left bg-neutral-50 border border-ink/10 rounded-2xl p-6 mb-6">
              <p className="whitespace-pre-line text-sm text-ink leading-6">{message}</p>
            </div>
          )}

          <Link
            to="/login"
            className="inline-block bg-forest-800 hover:bg-forest-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md text-center bg-white border border-ink/10 shadow-xl rounded-2xl p-10">
        <Clock className="h-12 w-12 mx-auto text-primary-700 mb-4" />
        <h1 className="text-2xl font-serif text-ink mb-2">Paiement en cours</h1>
        <p className="text-ink-soft mb-6">
          Votre paiement est en cours de traitement. Vous recevrez une confirmation par email dès qu'il sera validé.
        </p>
        {transactionRef && (
          <p className="text-xs text-ink-soft/70 mb-6">
            Référence : <span className="font-mono">{transactionRef}</span>
          </p>
        )}
        <Link
          to="/"
          className="inline-block bg-forest-800 hover:bg-forest-700 text-white px-6 py-3 rounded-full font-medium"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

export default PaymentSuccess;