import { PageShell } from '@/components/PageShell';
import { ContactSection } from '@/components/sections';

export const metadata = {
  title: 'ติดต่อเรา | The Valuation & Consultants',
};

export default function ContactPage() {
  return (
    <PageShell title="ติดต่อเรา" subtitle="พร้อมให้คำปรึกษาและบริการทุกเมื่อ">
      <ContactSection />
    </PageShell>
  );
}