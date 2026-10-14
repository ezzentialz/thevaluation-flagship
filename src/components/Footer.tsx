import Link from 'next/link';
import { useI18n } from '@/context/I18nContext';

export function Footer() {
  const { t, locale } = useI18n();

  const year = new Date().getFullYear() + 543;

  return (
    <footer className="relative bg-brand-dark border-t border-brand-accent/20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-brand-accent/5 to-transparent" />

      <div className="section-container py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="inline-block rounded bg-white p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/real/logo-web-372x90.png" alt="The Valuation & Consultants" width={186} height={45} className="h-[40px] w-auto" />
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              {locale === 'th'
                ? 'บริษัทประเมินมูลค่าทรัพย์สินของคนไทย ก่อตั้งปี 2535 · คุณภาพก้าวไกล โปร่งใส ยุติธรรม'
                : 'Thai-owned property valuation company, established 1992 · Advanced Quality, Transparency and Fairness'}
            </p>
          </div>

          <div>
            <h4 className="text-brand-accent text-sm font-semibold uppercase tracking-widest mb-6">
              {locale === 'th' ? 'เมนู' : 'Menu'}
            </h4>
            <ul className="space-y-3">
              <li><Link href="#about" className="text-white/60 hover:text-brand-accent transition-colors text-sm">{t.nav.about}</Link></li>
              <li><Link href="#services" className="text-white/60 hover:text-brand-accent transition-colors text-sm">{t.nav.services}</Link></li>
              <li><Link href="#properties" className="text-white/60 hover:text-brand-accent transition-colors text-sm">{t.nav.properties}</Link></li>
              <li><Link href="#branches" className="text-white/60 hover:text-brand-accent transition-colors text-sm">{t.nav.branches}</Link></li>
              <li><Link href="#articles" className="text-white/60 hover:text-brand-accent transition-colors text-sm">{t.nav.articles}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-accent text-sm font-semibold uppercase tracking-widest mb-6">
              {locale === 'th' ? 'ติดต่อเรา' : 'Contact'}
            </h4>
            <address className="not-italic space-y-3 text-white/60 text-sm">
              <p>
                719 เคพีเอ็น ทาวเวอร์ ชั้น 12<br />
                ถนนพระราม 9 แขวงบางกะปิ<br />
                เขตห้วยขวาง กรุงเทพฯ 10310
              </p>
              <p>{locale === 'th' ? 'โทร.' : 'Tel'} 0-2717-0801-8</p>
              <p>{locale === 'th' ? 'มือถือ' : 'Mobile'} 081-512-9411, 084-692-8851</p>
              <p>{locale === 'th' ? 'โทรสาร' : 'Fax'} 0-2717-0800</p>
              <p>
                <a href="mailto:info@thevaluation.com" className="hover:text-brand-accent transition-colors">
                  info@thevaluation.com
                </a>
              </p>
            </address>
          </div>

          <div>
            <h4 className="text-brand-accent text-sm font-semibold uppercase tracking-widest mb-6">
              {locale === 'th' ? 'ลิ้งค์ที่เกี่ยวข้อง' : 'Related Links'}
            </h4>
            <ul className="space-y-3">
              <li><a href="https://www.thevaluation.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-brand-accent transition-colors text-sm">thevaluation.com</a></li>
              <li><a href="https://www.thevaluation.com/privacy-policy-th/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-brand-accent transition-colors text-sm">{t.footer.privacy}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {year} The Valuation & Consultants Co., Ltd. {t.footer.rights}.
          </p>
        </div>
      </div>
    </footer>
  );
}