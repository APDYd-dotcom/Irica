import { useState } from "react";

function AfriPayAutoForm({ amount, currency, comment, client_token, afripay_url }) {
  const [submitted, setSubmitted] = useState(false);
  const appId = import.meta.env.VITE_AFRIPAY_APP_ID || "";
  const appSecret = import.meta.env.VITE_AFRIPAY_APP_SECRET || "";
  const returnUrl = `${window.location.origin}/payment-success`;

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    const form = event.target;
    if (form) {
      form.submit();
    }
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center gap-2 py-8 text-ink-soft text-sm">
        Redirection vers AfriPay...
      </div>
    );
  }

  return (
    <form
      id="afripayform"
      action={afripay_url}
      method="post"
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4"
    >
      <input type="hidden" name="amount" value={amount ?? ""} />
      <input type="hidden" name="currency" value={currency ?? ""} />
      <input type="hidden" name="comment" value={comment ?? ""} />
      <input type="hidden" name="client_token" value={client_token ?? ""} />
      <input type="hidden" name="return_url" value={returnUrl} />
      <input type="hidden" name="app_id" value={appId} />
      <input type="hidden" name="app_secret" value={appSecret} />

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:-translate-y-0.5 hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-500/25"
      >
        Payer avec AfriPay
      </button>
    </form>
  );
}

export default AfriPayAutoForm;