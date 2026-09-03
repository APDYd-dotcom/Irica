import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronRight, CreditCard, Loader2 } from "lucide-react";
import { getProgram } from "../api/programs";
import { initiatePayment } from "../api/afripay";
import { getErrorMessage } from "../utils/getErrorMessage";
import ErrorMessage from "../components/ErrorMessage";
import AfriPayAutoForm from "../components/Payment/AfriPayAutoForm";

const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function ProgramPayment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [program, setProgram] = useState(null);
  const [loadingProgram, setLoadingProgram] = useState(true);
  const [programError, setProgramError] = useState(null);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [sending, setSending] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoadingProgram(true);
    setProgramError(null);
    getProgram(id)
      .then((res) => {
        if (!cancelled) setProgram(res.data);
      })
      .catch((err) => {
        if (!cancelled) setProgramError(getErrorMessage(err));
      })
      .finally(() => {
        if (!cancelled) setLoadingProgram(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    setEmailError(null);
    setPaymentError(null);

    if (!EMAIL_REGEX.test(email)) {
      setEmailError("Veuillez saisir une adresse email valide.");
      return;
    }

    if (!program) return;

    setSending(true);
    initiatePayment({
      program_id: program.id ?? id,
      amount: program.price ?? program.cost ?? 0,
      email,
    })
      .then((data) => {
        setPaymentData(data);
      })
      .catch((err) => {
        setPaymentError(getErrorMessage(err));
      })
      .finally(() => {
        setSending(false);
      });
  }

  function handleRetry() {
    setPaymentError(null);
    setEmailError(null);
  }

  const formatAmount = (value) => {
    const num = Number(value || 0);
    return `${num.toLocaleString()} FBU`;
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="eyebrow text-primary-700 mb-3">Programme</p>
          <h1 className="font-serif text-3xl text-ink">Paiement du programme</h1>
          <p className="text-sm text-ink-soft mt-2">
            Renseignez votre email pour recevoir votre code d'accès après paiement.
          </p>
        </div>

        <div className="bg-white border border-ink/10 rounded-2xl p-8">
          {loadingProgram && (
            <div className="flex items-center justify-center gap-2 py-8 text-ink-soft text-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
              Chargement du programme...
            </div>
          )}

          {programError && !loadingProgram && (
            <ErrorMessage message={programError} />
          )}

          {program && !loadingProgram && !paymentData && (
            <>
              <div className="mb-6 rounded-2xl bg-neutral-50 p-5">
                <h2 className="text-lg font-semibold text-ink">
                  {program.title || program.name || "Programme"}
                </h2>
                <div className="mt-3 flex items-center gap-2 text-sm text-neutral-600">
                  <CreditCard className="h-4 w-4" />
                  <span className="font-semibold text-neutral-900">
                    {formatAmount(program.price ?? program.cost)}
                  </span>
                </div>
              </div>

              {paymentError && (
                <div className="mb-4">
                  <ErrorMessage message={paymentError} />
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="mt-3 text-sm font-medium text-primary-700 hover:underline"
                  >
                    Réessayer
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-ink mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError(null);
                    }}
                    required
                    className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
                  />
                  {emailError && (
                    <p className="text-xs text-red-600 mt-1">{emailError}</p>
                  )}
                  <p className="text-xs text-ink-soft/70 mt-1">
                    Votre code d'accès sera envoyé à cette adresse après confirmation.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full mt-2 bg-forest-800 hover:bg-forest-700 disabled:opacity-50 text-white font-medium py-3 rounded-full transition flex items-center justify-center gap-2"
                >
                  {sending && <Loader2 className="h-4 w-4 animate-spin" />}
                  {sending ? "Préparation du paiement..." : "Continuer vers le paiement"}
                  {!sending && <ChevronRight className="h-4 w-4" />}
                </button>
              </form>
            </>
          )}

          {paymentData && (
            <>
              <div className="flex items-center justify-center gap-2 py-8 text-ink-soft text-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
                Redirection vers AfriPay...
              </div>
              <AfriPayAutoForm
                amount={paymentData.amount}
                currency={paymentData.currency}
                comment={`Program ${id}`}
                client_token={paymentData.client_token}
                afripay_url={paymentData.afripay_url}
              />
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-sm text-ink-soft hover:text-primary-700"
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProgramPayment;