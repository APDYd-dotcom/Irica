import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Clock, Smartphone, XCircle } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

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
  const { t } = useLanguage();
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
          <h1 className="text-2xl font-serif text-ink mb-2">{t("paymentSuccess.almostThereTitle")}</h1>
          <p className="text-ink-soft mb-6">
            {t("paymentSuccess.almostThereDesc")}
          </p>
          <Link
            to="/login"
            className="inline-block bg-forest-800 hover:bg-forest-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            {t("paymentSuccess.almostThereLink")}
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
          <h1 className="text-2xl font-serif text-ink mb-2">{t("paymentSuccess.errorTitle")}</h1>
          <p className="text-ink-soft mb-6">
            {t("paymentSuccess.errorDesc")}
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
              {t("paymentSuccess.backToPrograms")}
            </Link>
            <Link
              to="/login"
              className="inline-block bg-white border border-ink/15 text-ink hover:border-forest-800 px-6 py-3 rounded-full font-medium"
            >
              {t("paymentSuccess.goToLogin")}
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
            {t("paymentSuccess.mobileTitle")}
          </h1>
          <p className="text-ink-soft mb-6">
            {t("paymentSuccess.mobileDesc")}
          </p>

          <div className="text-left bg-neutral-50 border border-ink/10 rounded-2xl p-6 mb-6">
            <p className="whitespace-pre-line text-sm text-ink leading-6">{message}</p>
          </div>

          <Link
            to="/"
            className="inline-block bg-forest-800 hover:bg-forest-700 text-white px-6 py-3 rounded-full font-medium"
          >
            {t("paymentSuccess.backToHome")}
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
          <h1 className="text-2xl font-serif text-ink mb-2">{t("paymentSuccess.successTitle")}</h1>
          <p className="text-ink-soft mb-6">
            {t("paymentSuccess.successDesc")}
          </p>

          {transactionRef && (
            <p className="text-xs text-ink-soft/70 mb-6">
              {t("paymentSuccess.reference")} <span className="font-mono">{transactionRef}</span>
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
            {t("paymentSuccess.goToLogin")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md text-center bg-white border border-ink/10 shadow-xl rounded-2xl p-10">
        <Clock className="h-12 w-12 mx-auto text-primary-700 mb-4" />
        <h1 className="text-2xl font-serif text-ink mb-2">{t("paymentSuccess.pendingTitle")}</h1>
        <p className="text-ink-soft mb-6">
          {t("paymentSuccess.pendingDesc")}
        </p>
        {transactionRef && (
          <p className="text-xs text-ink-soft/70 mb-6">
            {t("paymentSuccess.reference")} <span className="font-mono">{transactionRef}</span>
          </p>
        )}
        <Link
          to="/"
          className="inline-block bg-forest-800 hover:bg-forest-700 text-white px-6 py-3 rounded-full font-medium"
        >
          {t("paymentSuccess.backToHome")}
        </Link>
      </div>
    </div>
  );
}

export default PaymentSuccess;
