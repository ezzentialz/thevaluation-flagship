import { PageShell } from '@/components/PageShell';
import { AboutSection, CTASection } from '@/components/sections';

export const metadata = {
  title: 'เกี่ยวกับเรา | The Valuation & Consultants',
};

export default function AboutPage() {
  return (
    <PageShell title="เกี่ยวกับเรา" subtitle="ประสบการณ์กว่า 30 ปีในการประเมินมูลค่าทรัพย์สิน">
      <AboutSection />
      <CTASection />
    </PageShell>
  );
}