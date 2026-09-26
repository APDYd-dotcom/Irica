import { useEffect, useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { getPartners } from "../../api/partners";

function PartnersSection() {
  const { t } = useLanguage();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllPartners() {
      setLoading(true);
      setError(null);
      try {
        let results = [];
        let url = "/partners/";

        while (url) {
          const response = await getPartners(url);
          const data = response.data;
          results = results.concat(data.results || data);
          url = data.next;
        }

        setPartners(results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAllPartners();
  }, []);

  if (loading || error || partners.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white py-8 md:py-10">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 text-center">{t("partners.title")}</h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {partners.map((partner) => (
            <img
              key={partner.id}
              src={partner.logo}
              alt={partner.name}
              className="h-20 md:h-24 w-auto object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PartnersSection;