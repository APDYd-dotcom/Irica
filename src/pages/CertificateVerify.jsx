import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CalendarDays, CheckCircle2, Mail, Phone, UserRound, XCircle } from "lucide-react";
import { getCertificate } from "../api/certified";
import { useLanguage } from "../i18n/LanguageContext";
import Loader from "../components/Loader";

/** Parse date-only strings (YYYY-MM-DD) as local time to avoid a UTC off-by-one day. */
function formatDate(value, locale) {
  if (!value) return null;
  const raw = String(value);
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(raw);
  const parsed = dateOnly ? new Date(`${raw}T00:00:00`) : new Date(raw);
  if (Number.isNaN(parsed.getTime())) return raw;
  return parsed.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Field({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 border-b border-neutral-200 py-3">
      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-primary-50 text-primary-600">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
          {label}
        </p>
        <p className="mt-0.5 break-words text-sm font-medium leading-snug text-neutral-900">
          {value}
        </p>
      </div>
    </div>
  );
}

function CertificateVerify() {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const locale = language === "en" ? "en-US" : "fr-FR";

  const [certificate, setCertificate] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;
    setStatus("loading");

    getCertificate(id)
      .then((data) => {
        if (!active) return;
        setCertificate(data);
        setStatus(data ? "found" : "missing");
      })
      .catch(() => {
        if (!active) return;
        setStatus("error");
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (status === "loading") return <Loader />;

  if (status === "missing" || status === "error") {
    return (
      <section className="flex min-h-screen items-center justify-center bg-neutral-50 px-6 pb-[4vh] pt-24 lg:pt-28">
        <div className="w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-[5vh] text-center shadow-lg">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <XCircle className="h-7 w-7" />
          </span>
          <h1 className="mt-4 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
            {t("certificate.notFound")}
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-neutral-500">
            {t("certificate.notFoundSubtitle")}
          </p>
        </div>
      </section>
    );
  }

  const fullName = [certificate.first_name, certificate.last_name]
    .filter(Boolean)
    .join(" ");
  const start = formatDate(certificate.start_date, locale);
  const end = formatDate(certificate.end_date, locale);
  const issued = formatDate(certificate.created_at, locale);
  const period = start && end ? (start === end ? start : `${start} → ${end}`) : start || end;

  return (
    <section className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 pb-[3vh] pt-24 lg:pt-28">
      <article className="flex max-h-[100vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg">
        <div className="flex items-center gap-4 bg-primary-50 px-5 py-[2.5vh] sm:px-8">
          <span className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-primary-500 text-white">
            <CheckCircle2 className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <h1 className="text-lg font-bold tracking-tight text-neutral-900 sm:text-xl">
              {t("certificate.verified")}
            </h1>
            <p className="mt-0.5 text-xs leading-snug text-primary-800/80 sm:text-sm">
              {t("certificate.verifiedSubtitle")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 px-5 pb-6 sm:grid-cols-2 sm:px-8">
          <div className="[&>div:last-child]:border-b-0">
            <Field
              icon={UserRound}
              label={t("certificate.fullName")}
              value={fullName}
            />
            <Field
              icon={CalendarDays}
              label={t("certificate.programType")}
              value={certificate.type_of_program}
            />
            <Field icon={CalendarDays} label={t("certificate.period")} value={period} />
          </div>
          <div className="[&>div:last-child]:border-b-0">
            <Field icon={Mail} label={t("certificate.email")} value={certificate.email} />
            <Field
              icon={Phone}
              label={t("certificate.phone")}
              value={certificate.telephone}
            />
            <Field
              icon={CheckCircle2}
              label={t("certificate.issuedOn")}
              value={issued}
            />
          </div>
        </div>
      </article>
    </section>
  );
}

export default CertificateVerify;