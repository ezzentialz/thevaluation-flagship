import { COMPANY } from '@/lib/company';

export interface InquiryPayload {
  subject: string;
  name: string;
  email?: string;
  phone?: string;
  message: string;
  website?: string; // honeypot
}

/**
 * Posts the inquiry to /api/inquiry. If the server cannot deliver it (for example the
 * webhook is not configured yet), falls back to the visitor's email app so nothing is lost.
 * Returns 'sent' or 'mailto'.
 */
export async function submitInquiry(p: InquiryPayload): Promise<'sent' | 'mailto'> {
  try {
    const res = await fetch('/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(p),
    });
    if (res.ok) return 'sent';
  } catch {
    /* fall through to mailto */
  }
  window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(p.subject)}&body=${encodeURIComponent(
    p.message
  )}`;
  return 'mailto';
}
