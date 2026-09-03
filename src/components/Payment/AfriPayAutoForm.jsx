import { useEffect, useRef } from "react";

function AfriPayAutoForm({ amount, currency, comment, client_token, afripay_url }) {
  const formRef = useRef(null);
  const appId = import.meta.env.VITE_AFRIPAY_APP_ID || "";
  const appSecret = import.meta.env.VITE_AFRIPAY_APP_SECRET || "";
  const returnUrl = `${window.location.origin}/payment-success`;

  useEffect(() => {
    if (formRef.current) {
      formRef.current.submit();
    }
  }, []);

  return (
    <form
      ref={formRef}
      action={afripay_url}
      method="post"
      style={{ display: "none" }}
    >
      <input type="hidden" name="amount" value={amount ?? ""} />
      <input type="hidden" name="currency" value={currency ?? ""} />
      <input type="hidden" name="comment" value={comment ?? ""} />
      <input type="hidden" name="client_token" value={client_token ?? ""} />
      <input type="hidden" name="return_url" value={returnUrl} />
      <input type="hidden" name="app_id" value={appId} />
      <input type="hidden" name="app_secret" value={appSecret} />
    </form>
  );
}

export default AfriPayAutoForm;