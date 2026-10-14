import type { MetadataRoute } from 'next';
import { COMPANY } from '@/lib/company';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? COMPANY.url;
const PAGES = ['', '/about', '/services', '/properties', '/branches', '/careers', '/articles', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({ url: `${SITE_URL}${p}`, lastModified: new Date() }));
}
