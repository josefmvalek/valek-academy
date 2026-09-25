/**
 * Utility functions for ContactForm formatting and validations
 * VALEK ACADEMY
 */

export function formatPhoneCzech(val: string): string {
  let raw = val.trim();
  if (!raw) return '';

  const hasPlus = raw.startsWith('+');
  let digits = raw.replace(/\D/g, '');

  if (hasPlus) {
    if (digits.startsWith('420') || digits.startsWith('421')) {
      const prefix = `+${digits.slice(0, 3)}`;
      const rest = digits.slice(3);
      const chunks = rest.match(/.{1,3}/g) || [];
      return chunks.length > 0 ? `${prefix} ${chunks.join(' ')}` : prefix;
    } else {
      const chunks = digits.match(/.{1,3}/g) || [];
      return `+${chunks.join(' ')}`;
    }
  }

  if (digits.length >= 9 && (digits.startsWith('420') || digits.startsWith('421'))) {
    const prefix = `+${digits.slice(0, 3)}`;
    const rest = digits.slice(3);
    const chunks = rest.match(/.{1,3}/g) || [];
    return `${prefix} ${chunks.join(' ')}`;
  }

  const chunks = digits.match(/.{1,3}/g) || [];
  return chunks.join(' ');
}

export function isValidCzechPhone(val: string): boolean {
  const digits = val.replace(/\D/g, '').replace(/^(420|421)/, '');
  return digits.length >= 9;
}

export function isValidEmail(val: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
}

export function buildGoogleCalendarUrl(params: {
  title: string;
  description: string;
  location?: string;
}): string {
  const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  const text = encodeURIComponent(params.title);
  const details = encodeURIComponent(params.description);
  const location = encodeURIComponent(params.location || 'Růžová 1238, Uherské Hradiště');
  return `${base}&text=${text}&details=${details}&location=${location}`;
}
