import { Link } from "react-router-dom";

// Afripay redirects the browser HERE after payment (success or cancel),
// separately from the webhook that actually creates the account on the backend.
// This page just reassures the user — the real work already happened server-side.
function PaymentSuccess() {
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

export default PaymentSuccess;
