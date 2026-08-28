import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { handleChange } from "../utils/formHandles";
import { getErrorMessage } from "../utils/getErrorMessage";
import ErrorMessage from "../components/ErrorMessage";

// This form is really a REGISTRATION form in disguise.
// No account exists yet — Django creates it AFTER Afripay confirms payment
// (via a webhook that runs on the backend, not triggered by this page).
function Checkout() {
  const initialFormState = {
    full_name: "",
    email: "",
    phone_number: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setError(null);

    // Expected Django response shape: { checkout_url: "https://afripay.../pay/xyz" }
    axiosClient
      .post("/payments/initiate/", formData)
      .then((response) => {
        window.location.href = response.data.checkout_url;
      })
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setSending(false));
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="eyebrow text-primary-700 mb-3">Membership</p>
          <h1 className="font-serif text-3xl text-ink">Subscribe</h1>
          <p className="text-sm text-ink-soft mt-2">
            One month of full access — your login details arrive by email right after payment.
          </p>
        </div>

        <div className="bg-white border border-ink/10 rounded-2xl p-8">
          {error && (
            <div className="mb-4">
              <ErrorMessage message={error} />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Full Name</label>
              <input
                name="full_name"
                placeholder="Jean Bosco"
                value={formData.full_name}
                onChange={(e) => handleChange(e, setFormData)}
                required
                className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@gmail.com"
                value={formData.email}
                onChange={(e) => handleChange(e, setFormData)}
                required
                className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
              />
              <p className="text-xs text-ink-soft/70 mt-1">Your login details will be sent here.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1">Phone Number</label>
              <input
                name="phone_number"
                placeholder="+257 ..."
                value={formData.phone_number}
                onChange={(e) => handleChange(e, setFormData)}
                required
                className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full mt-2 bg-forest-800 hover:bg-forest-700 disabled:opacity-50 text-white font-medium py-3 rounded-full transition flex items-center justify-center gap-2"
            >
              {sending && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>}
              {sending ? "Redirecting to payment..." : "Pay & Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
