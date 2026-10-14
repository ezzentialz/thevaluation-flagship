import { PageShell } from '@/components/PageShell';
import { ServicesSection, CTASection } from '@/components/sections';

export const metadata = {
  title: 'บริการ | The Valuation & Consultants',
};

export default function ServicesPage() {
  return (
    <PageShell title="บริการของเรา" subtitle="บริการประเมินมูลค่าครบทุกประเภท ตามมาตรฐานสากล">
      <ServicesSection />
      <CTASection />
    </PageShell>
  );
}