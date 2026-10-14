import { PageShell } from '@/components/PageShell';
import { CareersSection, CTASection } from '@/components/sections';

export const metadata = {
  title: 'ร่วมงานกับเรา | The Valuation & Consultants',
};

export default function CareersPage() {
  return (
    <PageShell title="ร่วมงานกับเรา" subtitle="เป็นส่วนหนึ่งของทีมผู้เชี่ยวชาญชั้นนำ">
      <CareersSection />
      <CTASection />
    </PageShell>
  );
}