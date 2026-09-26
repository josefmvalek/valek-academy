/**
 * Utility functions for ContactForm formatting and validations
 * VALEK ACADEMY
 */

export function formatPhoneCzech(val: string): string {
  const raw = val.trim();
  if (!raw) return '';

  // Handle Czech (+420) and Slovak (+421) prefixes
  let prefix = '+420 ';
  let digits = '';

  if (raw.startsWith('+421')) {
    prefix = '+421 ';
    digits = raw.slice(4).replace(/\D/g, '');
  } else if (raw.startsWith('+420')) {
    prefix = '+420 ';
    digits = raw.slice(4).replace(/\D/g, '');
  } else if (raw.startsWith('420') && raw.length > 9) {
    prefix = '+420 ';
    digits = raw.slice(3).replace(/\D/g, '');
  } else if (raw.startsWith('421') && raw.length > 9) {
    prefix = '+421 ';
    digits = raw.slice(3).replace(/\D/g, '');
  } else if (raw.startsWith('+')) {
    return raw; // Keep custom international format
  } else {
    prefix = '+420 ';
    digits = raw.replace(/\D/g, '');
  }

  // Limit to 9 digits for CZ/SK local numbers
  digits = digits.slice(0, 9);
  if (!digits) return '';

  const parts = digits.match(/.{1,3}/g) || [];
  return prefix + parts.join(' ');
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

export function buildWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
