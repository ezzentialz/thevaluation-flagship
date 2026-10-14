import { PageShell } from '@/components/PageShell';
import { AboutSection, CTASection } from '@/components/sections';

export const metadata = {
  title: 'เกี่ยวกับเรา | The Valuation & Consultants',
};

export default function AboutPage() {
  return (
    <PageShell title="เกี่ยวกับเรา" subtitle="บริษัทประเมินมูลค่าทรัพย์สินของคนไทย ก่อตั้งเมื่อปี 2535">
      <AboutSection />
      <CTASection />
    </PageShell>
  );
}