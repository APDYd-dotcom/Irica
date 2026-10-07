// Shared helper for displaying a certificate's program type.
//
// The backend may return a `type_of_program_display` label (Django's
// get_<field>_display), so prefer that when present. Otherwise derive a
// readable label from the raw `type_of_program` value (e.g.
// "Suivi_evaluation_gestion_projets" -> "Suivi evaluation gestion projets").

export function programTypeLabel(certificate) {
  if (!certificate) return null;

  if (certificate.type_of_program_display) {
    return certificate.type_of_program_display;
  }

  const value = certificate.type_of_program;
  if (!value) return null;

  const cleaned = String(value).replace(/[-_]/g, " ").trim();
  if (!cleaned) return null;
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
}