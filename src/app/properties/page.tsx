import { PageShell } from '@/components/PageShell';
import { PropertiesSection } from '@/components/sections';

export const metadata = {
  title: 'ซื้อ ขาย เช่า | The Valuation & Consultants',
};

export default function PropertiesPage() {
  return (
    <PageShell title="ทรัพย์สิน ซื้อ / ขาย / เช่า" subtitle="ค้นหาทรัพย์สินที่เหมาะสมกับคุณ">
      <PropertiesSection />
    </PageShell>
  );
}