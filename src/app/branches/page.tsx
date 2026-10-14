import { PageShell } from '@/components/PageShell';
import { BranchesSection, CTASection } from '@/components/sections';

export const metadata = {
  title: 'สาขา | The Valuation & Consultants',
};

export default function BranchesPage() {
  return (
    <PageShell title="สาขาของเรา" subtitle="ให้บริการทั่วประเทศไทย">
      <BranchesSection />
      <CTASection />
    </PageShell>
  );
}