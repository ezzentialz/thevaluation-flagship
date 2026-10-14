import type { MetadataRoute } from 'next';
import { COMPANY } from '@/lib/company';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? COMPANY.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
