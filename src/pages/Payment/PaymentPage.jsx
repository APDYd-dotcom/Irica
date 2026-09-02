import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPayment, payProgram } from "../../api/payments";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { getErrorMessage } from "../../utils/getErrorMessage";

function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState(null);

  useEffect(() => {
    const fetchPayment = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        const response = await getPayment(id);
        // TODO: Ajuster response.data selon le schéma réel de GET /payments/{id}/
        setPayment(response.data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [id]);

  const handlePay = async () => {
    if (!payment) return;
    try {
      setPaying(true);
      setPayError(null);
      // TODO: Adapter le payload selon le body exact attendu par POST /access-programs/pay/
      const payload = {
        payment_id: payment.id,
        // program: payment.program?.id,
        // email: payment.email,
      };
      await payProgram(payload);
      navigate("/payment/success");
    } catch (err) {
      setPayError(getErrorMessage(err));
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <ErrorMessage message={error} />
        </div>
      </div>
    );
  }

  if (!payment) {
    return null;
  }

  // TODO: Ajuster les noms de champs status selon la vraie valeur renvoyée par l'API
  const isPaid = payment.status === "success" || payment.status === "paid";

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="eyebrow text-primary-700 mb-3">Paiement</p>
          <h1 className="font-serif text-3xl text-ink">Récapitulatif</h1>
        </div>

        <div className="bg-white border border-ink/10 rounded-2xl p-8">
          {isPaid ? (
            <div className="text-center">
              <p className="text-ink-soft mb-4">Ce paiement a déjà été effectué.</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-6">
                {/* TODO: Ajuster payment.program.title selon le schéma réel */}
                <div className="flex justify-between text-sm">
                  <span className="text-ink-soft">Programme</span>
                  <span className="text-ink font-medium">{payment.program?.title || "—"}</span>
                </div>
                {/* TODO: Ajuster payment.amount / payment.currency selon le schéma réel */}
                <div className="flex justify-between text-sm">
                  <span className="text-ink-soft">Montant</span>
                  <span className="text-ink font-medium">
                    {payment.amount} {payment.currency || ""}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ink-soft">Email</span>
                  <span className="text-ink font-medium">{payment.email || "—"}</span>
                </div>
              </div>

              {payError && (
                <div className="mb-4">
                  <ErrorMessage message={payError} />
                </div>
              )}

              <button
                type="button"
                onClick={handlePay}
                disabled={paying}
                aria-label="Payer maintenant"
                className="w-full mt-2 bg-forest-800 hover:bg-forest-700 disabled:opacity-50 text-white font-medium py-3 rounded-full transition flex items-center justify-center gap-2"
              >
                {paying && (
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                )}
                {paying ? "Traitement..." : "Payer maintenant"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
