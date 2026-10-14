import type { Metadata, Viewport } from 'next';
import { I18nProvider } from '@/context/I18nContext';
import { MotionRoot, ScrollProgress, SmoothScroll } from '@/components/motion';
import { COMPANY } from '@/lib/company';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? COMPANY.url;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'The Valuation & Consultants | ประเมินมูลค่าทรัพย์สิน Property Valuation Thailand',
    template: '%s | The Valuation & Consultants',
  },
  description:
    'บริษัท เดอะแวลูเอชั่น แอนด์ คอนซัลแทนท์ส จำกัด ผู้ให้บริการประเมินมูลค่าอสังหาริมทรัพย์ เครื่องจักร และธุรกิจ ตั้งแต่ปี 2535 · Thai property, machinery and business valuation since 1992.',
  openGraph: {
    type: 'website',
    siteName: COMPANY.nameEn,
    title: COMPANY.nameEn,
    description: 'Property, machinery and business valuation in Thailand since 1992.',
    locale: 'th_TH',
    alternateLocale: ['en_US'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0B1426',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: COMPANY.nameEn,
  alternateName: COMPANY.nameTh,
  url: COMPANY.url,
  foundingDate: String(COMPANY.foundedCE),
  email: COMPANY.email,
  telephone: COMPANY.phoneIntl,
  faxNumber: COMPANY.fax,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '719 KPN Tower, 12th Floor, Rama 9 Rd, Huaykwang',
    addressLocality: 'Bangkok',
    postalCode: '10310',
    addressCountry: 'TH',
  },
  areaServed: 'TH',
  knowsLanguage: ['th', 'en'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-brand-gold focus:px-4 focus:py-2 focus:text-brand-navy"
        >
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <I18nProvider>
          <MotionRoot>
            <SmoothScroll />
            <ScrollProgress />
            {children}
          </MotionRoot>
        </I18nProvider>
      </body>
    </html>
  );
}
