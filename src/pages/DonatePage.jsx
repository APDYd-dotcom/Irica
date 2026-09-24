import { useState } from "react";
import { motion } from "framer-motion";
import Container from "../components/Layout/Container";
import { useLanguage } from "../i18n/LanguageContext";
import { EASE } from "../animations/variants";
import { initiatePayment } from "../api/afripay";
import AfriPayAutoForm from "../components/Payment/AfriPayAutoForm";
import { HeartHandshake } from "lucide-react";

const SUGGESTED_AMOUNTS = [10000, 25000, 50000, 100000];

function DonatePage() {
  const { t, language } = useLanguage();
  const [amount, setAmount] = useState("");
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function handlePresetClick(value) {
    setAmount(String(value));
    setSelectedPreset(value);
  }

  function handleCustomChange(value) {
    setAmount(value);
    if (value) {
      setSelectedPreset(null);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      setError(t("donate.errorAmount"));
      return;
    }
    if (!validateEmail(email)) {
      setError(t("donate.errorEmail"));
      return;
    }

    setLoading(true);
    try {
      const data = await initiatePayment({
        program_id: 1,
        amount: numericAmount,
        email,
      });
      setPaymentData(data);
    } catch (err) {
      setError(t("donate.errorGeneric"));
    } finally {
      setLoading(false);
    }
  }

  const formatAmount = (value) =>
    new Intl.NumberFormat(language === "en" ? "en-US" : "fr-FR").format(value);

  if (paymentData) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Container className="py-24">
          <AfriPayAutoForm
            amount={paymentData.amount}
            currency={paymentData.currency}
            comment="Don IRICA"
            client_token={paymentData.client_token}
            afripay_url={paymentData.afripay_url}
          />
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 pt-24 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.08),_transparent_45%)]" />
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur-md">
              <HeartHandshake className="h-4 w-4" />
              {t("donate.support")}
            </div>
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              {t("donate.title")}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/85">
              {t("donate.description")}
            </p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
          className="mx-auto max-w-lg"
        >
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl shadow-neutral-900/5"
          >
            <h2 className="text-xl font-semibold text-ink mb-1">{t("donate.choose")}</h2>
            <p className="text-sm text-ink-soft mb-6">{t("donate.chooseHint")}</p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {SUGGESTED_AMOUNTS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  aria-pressed={selectedPreset === preset}
                  onClick={() => handlePresetClick(preset)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                    selectedPreset === preset
                      ? "border-primary-500 bg-primary-500 text-white shadow-sm"
                      : "border-neutral-200 bg-neutral-100 text-neutral-700 hover:border-primary-200 hover:text-primary-700"
                  }`}
                >
                  {formatAmount(preset)} {t("donate.currency")}
                </button>
              ))}
            </div>

            <label className="block mb-6">
              <span className="text-sm font-semibold text-neutral-800">{t("donate.other")}</span>
              <input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => handleCustomChange(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 outline-none focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/20"
                placeholder={t("donate.otherPlaceholder")}
              />
            </label>

            <label className="block mb-6">
              <span className="text-sm font-semibold text-neutral-800">{t("donate.emailLabel")}</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 outline-none focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/20"
                placeholder={t("donate.emailPlaceholder")}
                required
              />
            </label>

            {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-500 px-6 py-4 text-base font-semibold text-white shadow-sm hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-900/15 focus:outline-none focus:ring-4 focus:ring-primary-500/25 disabled:opacity-60"
            >
              <HeartHandshake className="h-5 w-5" />
              {loading ? t("donate.processing") : t("donate.submit")}
            </button>
          </form>
        </motion.div>
      </Container>
    </div>
  );
}

export default DonatePage;
