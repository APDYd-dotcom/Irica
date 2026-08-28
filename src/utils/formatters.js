export function formatProgramDate(dateString) {
  if (!dateString) return "Date à venir";

  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function formatPublicationDate(dateString) {
  if (!dateString) return "Date à venir";

  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function truncateDescription(text = "", maxLength = 120) {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

export function formatPrice(isFree, price) {
  if (isFree) return "Gratuit";
  const value = Number(price || 0);
  return `${value.toLocaleString("fr-FR").replace(/\u202f/g, " ")} FBU`;
}

export function getStatusInfo(status = "enrollment") {
  const normalized = String(status).toLowerCase();

  const statusMap = {
    enrollment: {
      label: "Inscriptions ouvertes",
      shortLabel: "ENROLLMENT",
      color: "bg-primary-50 text-primary-700 border-primary-100",
    },
    enroll: {
      label: "Inscriptions ouvertes",
      shortLabel: "ENROLLMENT",
      color: "bg-primary-50 text-primary-700 border-primary-100",
    },
    inprogress: {
      label: "En cours",
      shortLabel: "INPROGRESS",
      color: "bg-blue-100 text-blue-700 border-blue-200",
    },
    paid: {
      label: "En cours",
      shortLabel: "INPROGRESS",
      color: "bg-blue-100 text-blue-700 border-blue-200",
    },
    completed: {
      label: "Terminé",
      shortLabel: "COMPLETED",
      color: "bg-gray-100 text-gray-700 border-gray-200",
    },
  };

  return statusMap[normalized] || {
    label: status || "Inscriptions ouvertes",
    shortLabel: String(status || "ENROLLMENT").toUpperCase(),
    color: "bg-gray-100 text-gray-700 border-gray-200",
  };
}

export function getCategoryInfo(category = "publication") {
  const normalized = String(category).toLowerCase();

  const categoryMap = {
    employabilite: {
      label: "Employabilité",
      color: "bg-blue-100 text-blue-700 border-blue-200",
    },
    "audit-pme": {
      label: "Audit PME",
      color: "bg-primary-50 text-primary-700 border-primary-100",
    },
    "suivi-evaluation": {
      label: "Suivi-Évaluation",
      color: "bg-purple-100 text-purple-700 border-purple-200",
    },
  };

  return categoryMap[normalized] || {
    label: category || "Publication",
    color: "bg-neutral-100 text-neutral-700 border-neutral-200",
  };
}

export function sortByNewest(items, field = "created_at") {
  return [...items].sort((a, b) => new Date(b[field] || 0) - new Date(a[field] || 0));
}
