import { useState } from "react";
import axiosClient from "../../api/axiosClient";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { getErrorMessage } from "../../utils/getErrorMessage";

// Expected Django response shape: { is_active: true, expires_at: "2026-08-09T00:00:00Z" }
function Subscription() {
  const { data, loading, error } = useFetch("/subscriptions/me/");
  const [renewing, setRenewing] = useState(false);
  const [renewError, setRenewError] = useState(null);

  function handleRenew() {
    setRenewing(true);
    setRenewError(null);

    // Since the user is ALREADY logged in here, this hits a different endpoint
    // than the public /payments/initiate/ — this one is tied to the current user.
    axiosClient
      .post("/payments/renew/")
      .then((response) => {
        window.location.href = response.data.checkout_url;
      })
      .catch((err) => setRenewError(getErrorMessage(err)))
      .finally(() => setRenewing(false));
  }

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  const expiryDate = data?.expires_at ? new Date(data.expires_at).toLocaleDateString() : "—";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-ink/10 p-6 max-w-md">
      <h2 className="text-lg font-serif text-ink mb-4">Subscription Status</h2>

      <div className="flex items-center gap-2 mb-4">
        <span
          className={`w-3 h-3 rounded-full ${data?.is_active ? "bg-green-500" : "bg-red-500"}`}
        ></span>
        <span className="font-medium text-ink">
          {data?.is_active ? "Active" : "Expired"}
        </span>
      </div>

      <p className="text-sm text-ink-soft mb-6">
        {data?.is_active ? "Renews / expires on" : "Expired on"}{" "}
        <span className="font-medium text-ink">{expiryDate}</span>
      </p>

      {renewError && <div className="mb-4"><ErrorMessage message={renewError} /></div>}

      <button
        onClick={handleRenew}
        disabled={renewing}
        className="w-full bg-forest-800 hover:bg-forest-700 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg"
      >
        {renewing ? "Redirecting..." : data?.is_active ? "Renew Early" : "Renew Now"}
      </button>
    </div>
  );
}

export default Subscription;
