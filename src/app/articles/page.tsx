import { PageShell } from '@/components/PageShell';
import { ArticlesSection, CTASection } from '@/components/sections';

export const metadata = {
  title: 'บทความวิจัย | The Valuation & Consultants',
};

export default function ArticlesPage() {
  return (
    <PageShell title="บทความวิจัยและข่าวสาร" subtitle="ความรู้และข้อมูลล่าสุดจากทีมวิจัยของเรา">
      <ArticlesSection />
      <CTASection />
    </PageShell>
  );
}