import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axiosClient from "../../api/axiosClient";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { getErrorMessage } from "../../utils/getErrorMessage";

function AdminSubscriptions() {
  const { data: programsData, loading: programsLoading, error: programsError } = useFetch(
    "/programs/"
  );
  const programs = programsData?.results || programsData || [];

  const [programId, setProgramId] = useState("");
  const [emailsText, setEmailsText] = useState("");
  const [sending, setSending] = useState(false);
  const [progress, setProgress] = useState([]); // { email, status, message }
  const [generalError, setGeneralError] = useState(null);

  function parseEmails(text) {
    if (!text) return [];
    // split by newline, comma or semicolon and trim
    return text
      .split(/[\n,;]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }

  function validateEmail(email) {
    // simple validation
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  }

  async function handleSend() {
    setGeneralError(null);
    const emails = parseEmails(emailsText);
    if (emails.length === 0) {
      setGeneralError("Please provide at least one email address.");
      return;
    }
    if (!programId) {
      setGeneralError("Please select a program.");
      return;
    }

    setSending(true);
    setProgress([]);

    // send sequentially to avoid rate limits and to let admin see progress
    for (let i = 0; i < emails.length; i++) {
      const email = emails[i];
      if (!validateEmail(email)) {
        setProgress((p) => [...p, { email, status: "invalid", message: "Invalid email" }]);
        continue;
      }
      setProgress((p) => [...p, { email, status: "pending", message: "Sending..." }]);
      try {
        // POST payload - adjust endpoint as needed by backend
        const resp = await axiosClient.post("/access-programs/", {
          program: programId,
          email,
        });
        setProgress((p) => p.map((item) => (item.email === email ? { ...item, status: "sent", message: "Sent" } : item)));
      } catch (err) {
        const msg = getErrorMessage(err);
        setProgress((p) => p.map((item) => (item.email === email ? { ...item, status: "error", message: msg } : item)));
      }
    }

    setSending(false);
    setEmailsText("");
    setProgramId("");
  }

  if (programsLoading) return <Loader />;
  if (programsError) return <ErrorMessage message={programsError} />;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-ink/10 p-6">
      <h2 className="text-2xl font-serif text-ink mb-4">Program Subscriptions (Admin)</h2>
      <p className="text-sm text-ink-soft mb-4">Select a program and paste the emails (one per line or comma separated). The system will send to each email sequentially.</p>

      {generalError && <div className="mb-4"><ErrorMessage message={generalError} /></div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-ink mb-2">Program</label>
          <select
            value={programId}
            onChange={(e) => setProgramId(e.target.value)}
            className="w-full rounded-lg border border-ink/10 px-3 py-2 bg-white"
          >
            <option value="">— Select program —</option>
            {programs.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title || p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-ink mb-2">Emails</label>
          <textarea
            rows={6}
            value={emailsText}
            onChange={(e) => setEmailsText(e.target.value)}
            placeholder={"one email per line or comma separated"}
            className="w-full rounded-lg border border-ink/10 px-3 py-2 bg-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={handleSend}
          disabled={sending}
          className="bg-forest-800 hover:bg-forest-700 text-white px-5 py-2.5 rounded-lg disabled:opacity-50"
        >
          {sending ? "Sending…" : "Send Emails"}
        </button>

        <div className="text-sm text-ink-soft">Emails to send: <strong>{parseEmails(emailsText).length}</strong></div>
      </div>

      <div className="space-y-2">
        {progress.map((p) => (
          <div key={p.email} className="flex items-center justify-between gap-4 p-3 rounded-lg border border-ink/10">
            <div>
              <div className="font-medium text-ink">{p.email}</div>
              <div className="text-xs text-ink-soft">{p.message}</div>
            </div>
            <div>
              {p.status === "pending" && <span className="text-sm text-neutral-600">Sending...</span>}
              {p.status === "sent" && <span className="text-sm text-primary-700">Sent</span>}
              {p.status === "error" && <span className="text-sm text-red-600">Error</span>}
              {p.status === "invalid" && <span className="text-sm text-red-600">Invalid</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminSubscriptions;
