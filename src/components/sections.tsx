'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useI18n } from '@/context/I18nContext';
import { serviceIcons } from '@/components/icons';
import { PropertyInquiry } from '@/components/PropertyInquiry';
import { COMPANY } from '@/lib/company';
import { submitInquiry } from '@/lib/submitInquiry';
import { Chapter, CountUp, EASE, MaskedTitle, ParallaxImage, Reveal, TiltCard } from '@/components/motion';

// All copy is taken from the live thevaluation.com export. Typos in the source
// ("อสังหริมทรัพย์", "อุธรณ์") are corrected; nothing else is reworded.

const IMG = '/images/real';

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

const ABOUT_TEXT = {
  th: [
    'บริษัท เดอะแวลูเอชั่น แอนด์ คอนซัลแทนท์ส จำกัด เป็นบริษัทประเมินมูลค่าทรัพย์สินของคนไทย ก่อตั้งเมื่อปี 2535 โดยให้บริการการประเมินมูลค่าทรัพย์สิน ทั้งภาครัฐบาลและเอกชน อาทิเช่น ธนาคาร/สถาบันการเงิน ที่ปรึกษาด้านการเงิน/การลงทุน ผู้ตรวจสอบบัญชี/สำนักงานกฎหมาย กลุ่มโรงงานอุตสาหกรรม โรงแรม สถาบันการศึกษา หน่วยงานของรัฐ ฯลฯ',
    'บริษัท เดอะแวลูเอชั่นฯ สามารถให้บริการด้านการประเมินมูลค่าทรัพย์สิน แก่ลูกค้าที่อยู่ในธุรกิจการเงิน การธนาคาร อสังหาริมทรัพย์ อุตสาหกรรมและลูกค้าทั่วไปได้ ทั้งในระดับชาติและระดับสากล อีกทั้งยังเป็นบริษัทประเมินมูลค่า ที่ได้รับการเห็นชอบจาก กรมการประกันภัย สำนักงานคณะกรรมการกำกับหลักทรัพย์ และตลาดหลักทรัพย์ (กลต.) และเป็นสมาชิก สมาคมนักประเมินราคาอิสระไทย สมาคมผู้ประเมินค่าทรัพย์สินแห่งประเทศไทย',
    'จากความรู้ความสามารถ ประสบการณ์ และความเชี่ยวชาญของบุคลากรที่มีอยู่ ผนวกกับประสิทธิภาพในการจัดการของบริษัท เดอะแวลูเอชั่นฯ ทำให้สามารถให้บริการและตอบสนองความต้องการของลูกค้าได้เป็นอย่างดี',
    'และด้วยประสบการณ์อันยาวนาน และความสำเร็จของบุคลากรของบริษัทฯ รวมกับความมุ่งมั่นที่จะให้บริการที่มีคุณภาพตามมาตรฐานสากล ได้กลายมาเป็น ปรัชญาในการทำงานของบริษัท เดอะ แวลูเอชั่นฯ เพื่อที่จะสามารถให้บริการแก่ลูกค้าได้รวดเร็ว ถูกต้อง และมีประสิทธิภาพ',
  ],
  en: [
    'The Valuation and Consultants Company Limited is provides the properties valuation services which owned by Thai. Established in 1992, providing property valuation services for both the government and private sectors such as Banks/Financial Institutions, Financial Advisor/Investment, Law Firm, Industrial Groups, Hotels, Educational Institutions, Government agencies, etc.',
    'We can providing the properties valuation services to clients in the financial business, banking, real estate, industry business and etc. For both national and international, which have been approved by Department of Insurance, Securities Commission and Stock Exchange (SEC). We are also a member of Thai Independent Appraisers Association from Appraisers Properties Association of Thailand.',
    'With the knowledge, ability, experienced and existing personnel expertise combined with the efficiency of company’s management. The company makes it possible to serve and meet the needs of clients.',
    'The long experience, achievements of the company’s personnel and the commitment to provide quality services according to international standards has become the philosophy of The Company to provide fast, accurate and efficient service to clients.',
  ],
};

const EXECUTIVES = {
  th: [
    { name: 'นายมานพ วรรณะเอี่ยมพิกุล', role: 'กรรมการผู้จัดการ' },
    { name: 'นายยงยุทธ ศรีตุลานนท์', role: 'กรรมการฝ่ายบริหาร' },
    { name: 'นายกิตติคุณ ศิริไชยยากุล', role: 'รองกรรมการผู้จัดการ' },
    { name: 'นายศุภฤกษ์ อัครกิจกุลชัย', role: 'รองกรรมการผู้จัดการ · ผู้อำนวยการฝ่ายประเมินมูลค่าเครื่องจักรและอุปกรณ์' },
    { name: 'นางสาวพวงเพ็ญ สุมิพันธ์', role: 'รองกรรมการผู้จัดการ · ผู้อำนวยการฝ่ายการตลาด' },
  ],
  en: [
    { name: 'Mr. Manop Wanna Iamphikul', role: 'Managing Director' },
    { name: 'Mr. Yongyuth Sritulanont', role: 'Executive Director' },
    { name: 'Mr. Kittikhun Sirichayayakul', role: 'Deputy Managing Director' },
    { name: 'Mr. Supalert Akarakijkulchai', role: 'Deputy Managing Director · Machinery and Equipment Director' },
    { name: 'Ms. Puangpen Sumiphan', role: 'Deputy Managing Director · Marketing Director' },
  ],
};

export function AboutSection() {
  const { t, locale } = useI18n();
  const th = locale === 'th';
  const paragraphs = ABOUT_TEXT[locale];

  // Facts from the site: founded 1992 (B.E. 2535), 8 service lines, 5 executives, 6 regional branches.
  const stats = [
    { to: th ? 2535 : 1992, label: t.about.stats.years },
    { to: 8, label: t.about.stats.projects },
    { to: 5, label: t.about.stats.clients },
    { to: 6, label: t.about.stats.branches },
  ];

  return (
    <section id="about" className="relative overflow-hidden bg-brand-navy py-32">
      <div className="pointer-events-none absolute -left-40 top-20 hidden md:block h-[34rem] w-[34rem] rounded-full bg-brand-gold/[0.07] blur-[120px]" />

      <div className="section-container relative">
        <div className="grid items-start gap-16 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <Chapter no="01" label={t.nav.about} />
            <MaskedTitle lines={[t.about.title]} className="mb-10" />

            <div className="space-y-6">
              {paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.06} y={28}>
                  <p className="text-lg leading-relaxed text-white/70">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal x={50} y={0} className="lg:sticky lg:top-28">
            <div className="relative">
              <ParallaxImage
                src={`${IMG}/about.jpg`}
                alt={t.about.title}
                className="aspect-[4/5] rounded-2xl border border-brand-gold/20"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-brand-navy/85 via-transparent to-transparent" />
              <div className="absolute inset-x-6 bottom-6 rounded-xl border border-white/10 bg-brand-navy/80 p-4 md:bg-white/5 md:backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold/20 font-bold text-brand-gold">✓</span>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {th ? 'ได้รับความเห็นชอบจาก ก.ล.ต.' : 'Approved by the SEC'}
                    </div>
                    <div className="text-xs text-brand-gold">
                      {th ? 'และกรมการประกันภัย' : 'and the Department of Insurance'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-5 -top-5 h-24 w-24 border-r-2 border-t-2 border-brand-gold/40" />
              <div className="absolute -bottom-5 -left-5 h-24 w-24 border-b-2 border-l-2 border-brand-gold/40" />
            </div>
          </Reveal>
        </div>

        {/* Numbers */}
        <div className="mt-28 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <TiltCard className="rounded-xl border border-white/10 bg-white/[0.04] p-7 md:backdrop-blur-md">
                <div className="font-display text-5xl font-bold text-brand-gold">
                  <CountUp to={s.to} />
                </div>
                <div className="mt-3 text-xs uppercase tracking-wider text-white/55">{s.label}</div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Executive committee */}
        <div className="mt-28">
          <Chapter no="—" label={th ? 'คณะกรรมการบริหาร' : 'Executive Committee'} />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {EXECUTIVES[locale].map((e, i) => (
              <Reveal key={e.name} delay={i * 0.07}>
                <TiltCard className="rounded-xl border border-white/10 bg-white/[0.04] p-6" max={6}>
                  <div className="mb-4 h-px w-10 bg-brand-gold" />
                  <div className="font-display text-xl text-white">{e.name}</div>
                  <div className="mt-2 text-sm leading-relaxed text-white/55">{e.role}</div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

const SERVICES_TEXT = {
  th: {
    intro: 'นอกจากบริษัทเดอะแวลูเอชั่นฯ จะให้บริการด้านการประเมินมูลค่าทรัพย์สิน บริษัทฯ ยังให้บริการด้านต่างๆ ดังนี้',
    scopeTitle: 'ขอบเขตการทำงาน',
    scope: [
      'งานประเมินมูลค่าอสังหาริมทรัพย์',
      'งานประเมินเครื่องจักรและอุปกรณ์',
      'งานประเมินมูลค่าธุรกิจ',
      'งานสำรวจและวิจัย&ศึกษาความเป็นไปได้',
      'งานขายอสังหาริมทรัพย์',
      'งานที่ปรึกษาการลงทุน',
      'งานบริหารและจัดการทรัพย์สิน',
      'งานตรวจสอบอาคาร',
    ],
    objectivesTitle: 'วัตถุประสงค์ของการประเมินมูลค่าทรัพย์สิน',
    objectives: [
      'เพื่อเป็นหลักทรัพย์ในการกู้ยืม / จดจำนอง',
      'เพื่อใช้ในการซื้อ – ขาย / เช่าทรัพย์สิน',
      'เพื่อใช้เป็นข้อมูลทางด้านบัญชี',
      'เพื่อใช้เป็นทุนทรัพย์ / กำหนดมูลค่าหุ้น',
      'เพื่อร่วมกิจการ / แลกเปลี่ยนมูลค่าหุ้น',
      'เพื่อใช้ประกอบการอุทธรณ์กรณีเวนคืนของทางราชการ',
      'เพื่อการจัดการมรดกและอื่นๆ',
    ],
    typesTitle: 'ประเภทของทรัพย์สินที่ประเมินมูลค่า',
    types: [
      'ที่ดิน อาคารพักอาศัย โครงการพัฒนาต่างๆ',
      'อาคารชุดพักอาศัย อาคารสำนักงาน',
      'โรงแรม รีสอร์ท อพาร์ทเมนท์ ห้างสรรพสินค้า',
      'โรงงานอุตสาหกรรม โกดัง คลังสินค้า และเหมืองแร่',
      'เครื่องจักรและอุปกรณ์ที่ใช้ในอุตสาหกรรมผลิตต่างๆ',
      'โรงไฟฟ้าหลักและพลังงานทดแทน',
      'การขนส่งต่างๆ เช่น รถ เรือ และเครื่องบิน',
      'เครื่องจักรกลหนัก',
    ],
  },
  en: {
    intro: 'In addition of provide property valuation services, the company also provides services as follows:',
    scopeTitle: 'Scope of work',
    scope: [
      'Property valuation',
      'Machinery and Equipment Evaluation',
      'Business valuation',
      'Survey and Research & Feasibility Study',
      'Real Estate Sales',
      'Investment Advisory Jobs',
      'Property and management',
      'Building inspection',
    ],
    objectivesTitle: 'Objectives of property valuation',
    objectives: [
      'For borrowing and mortgage',
      'For buy, sell and rent properties',
      'For accounting information',
      'For use as capital and determining share value',
      'For venture and exchange of share value',
      'For use in the case of government expropriation',
      'For inheritance and other management',
    ],
    typesTitle: 'The type of property appraised',
    types: [
      'Land, Residential building, and Various development projects',
      'Condominium and Office building',
      'Hotel, Resort, Apartment and Mall',
      'Industrial factories, warehouses, warehouses and mines',
      'Machinery & Equipment in various industrial production',
      'Main power plant and renewable energy',
      'Transportations such as, vehicle, ship, boat, barge and aircraft',
      'Heavy Equipment',
    ],
  },
};

function ListPanel({
  no,
  title,
  items,
  image,
  flip,
}: {
  no: string;
  title: string;
  items: string[];
  image: string;
  flip?: boolean;
}) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <Reveal x={flip ? 60 : -60} y={0} className={flip ? 'lg:order-2' : ''}>
        <div className="relative">
          <ParallaxImage src={image} alt={title} className="aspect-[4/3] rounded-2xl border border-brand-gold/20" />
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-brand-navy/70 via-transparent to-brand-gold/10" />
          <span className="absolute -top-6 left-6 font-display text-8xl font-bold text-brand-gold/25">{no}</span>
        </div>
      </Reveal>

      <div className={flip ? 'lg:order-1' : ''}>
        <Reveal as="h3" className="mb-8 font-display text-3xl font-medium text-white sm:text-4xl">
          {title}
        </Reveal>
        <ul className="space-y-3">
          {items.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: flip ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.06 }}
              className="flex items-start gap-4 border-b border-white/5 pb-3 text-white/75"
            >
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rotate-45 bg-brand-gold" />
              <span className="leading-relaxed">{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ServicesSection() {
  const { t, locale } = useI18n();
  const c = SERVICES_TEXT[locale];

  return (
    <section id="services" className="relative overflow-hidden bg-brand-navy-light/50 py-32">
      <div className="pointer-events-none absolute -right-40 top-40 hidden md:block h-[32rem] w-[32rem] rounded-full bg-brand-gold/[0.06] blur-[120px]" />
      <div className="section-container relative">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <Chapter no="02" label={t.nav.services} center />
          <MaskedTitle lines={[t.services.title]} center className="mb-8" />
          <Reveal delay={0.2}>
            <p className="text-lg leading-relaxed text-white/65">{c.intro}</p>
          </Reveal>
        </div>

        {/* The eight lines of work */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.items.map((item, i) => (
            <Reveal key={i} delay={(i % 4) * 0.08} y={50}>
              <TiltCard className="group overflow-hidden rounded-xl border border-white/10 bg-brand-navy/60 p-7 md:backdrop-blur-sm">
                <span className="absolute right-5 top-4 font-display text-4xl font-bold text-white/[0.06] transition-colors duration-500 group-hover:text-brand-gold/25">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-brand-gold/20 bg-brand-gold/10 text-brand-gold transition-all duration-500 group-hover:bg-brand-gold group-hover:text-brand-navy"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  {serviceIcons[item.icon]}
                </div>
                <h3
                  className="text-lg font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-brand-gold"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  {item.title}
                </h3>
                <span className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-brand-gold to-brand-gold-light transition-transform duration-500 group-hover:scale-x-100" />
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Full lists */}
        <div className="mt-36 space-y-36">
          <ListPanel no="01" title={c.scopeTitle} items={c.scope} image={`${IMG}/workers-of-real-estate-agency-PNLKS22.jpg`} />
          <ListPanel no="02" title={c.objectivesTitle} items={c.objectives} image={`${IMG}/stock.jpg`} flip />
          <ListPanel no="03" title={c.typesTitle} items={c.types} image={`${IMG}/city.jpg`} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Buy / Sell / Rent                                                   */
/* ------------------------------------------------------------------ */

export function PropertiesSection() {
  const { t } = useI18n();

  const tiles: Array<{ label: string; icon: string; mode?: 'buy' | 'sell' | 'rent' }> = [
    { label: t.properties.buy, icon: '🏢', mode: 'buy' },
    { label: t.properties.rent, icon: '🏠', mode: 'rent' },
    { label: t.properties.sell, icon: '📋', mode: 'sell' },
    { label: t.properties.agent, icon: '🤝' },
  ];

  const pick = (mode?: 'buy' | 'sell' | 'rent') => {
    if (!mode) {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    window.dispatchEvent(new CustomEvent('inquiry-mode', { detail: mode }));
    document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="properties" className="relative overflow-hidden bg-brand-navy py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 via-transparent to-brand-gold/5" />
      <div className="section-container relative">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Chapter no="03" label={t.nav.properties} center />
          <MaskedTitle lines={[t.properties.title]} center />
        </div>

        <div className="mb-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((tile, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <TiltCard className="rounded-xl border border-white/10 bg-white/[0.04]">
                <button
                  type="button"
                  onClick={() => pick(tile.mode)}
                  className="group block w-full rounded-xl p-8 text-left"
                >
                  <div className="mb-6 inline-block text-4xl transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-6">
                    {tile.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-brand-gold">
                    {tile.label}
                  </h3>
                </button>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal y={60}>
          <div id="inquiry" className="scroll-mt-28">
            <PropertyInquiry />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Branches                                                            */
/* ------------------------------------------------------------------ */

type Branch = {
  name: string;
  address: string;
  phones: string;
  mobile?: string;
  email: string;
  map?: string;
};

function MapModal({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <motion.div
        className="relative max-h-[90vh] max-w-4xl overflow-auto rounded-xl bg-white p-2"
        initial={{ scale: 0.88, y: 40, rotateX: 12 }}
        animate={{ scale: 1, y: 0, rotateX: 0 }}
        exit={{ scale: 0.92, y: 20, opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={title} className="h-auto w-full" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy text-white transition-colors hover:bg-brand-gold hover:text-brand-navy"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

export function BranchesSection() {
  const { t, locale } = useI18n();
  const th = locale === 'th';
  const [openMap, setOpenMap] = useState<{ src: string; title: string } | null>(null);

  // Head office and branch details as published on thevaluation.com (contact page + branch page).
  const branches: Branch[] = [
    {
      name: th ? 'สำนักงานใหญ่ กรุงเทพฯ' : 'Head Office, Bangkok',
      address: th
        ? '719 เคพีเอ็น ทาวเวอร์ ชั้น 12 ถนนพระราม 9 แขวงบางกะปิ เขตห้วยขวาง กรุงเทพฯ 10310'
        : '719 KPN Tower, 12th Floor, Rama 9 Rd, Huaykwang, Bangkok 10310',
      phones: '0-2717-0801-8',
      mobile: '081-512-9411, 084-692-8851',
      email: 'info@thevaluation.com',
      map: `${IMG}/office-map.jpg`,
    },
    {
      name: th ? 'สาขาเชียงใหม่' : 'Chiang Mai Branch',
      address: th
        ? 'เลขที่ 29/13 หมู่ที่ 6 ถ.สมโภชเชียงใหม่ 700 ปี ต.สันทรายน้อย อ.สันทราย จ.เชียงใหม่ 50210'
        : 'No. 29/13 Moo 6, Somphot Chiang Mai 700 Years Road, Sansai Noi, Sansai, Chiang Mai 50210',
      phones: '053-380777, 053-380861',
      email: 'chiangmai@thevaluation.com',
      map: `${IMG}/chiangmai.jpg`,
    },
    {
      name: th ? 'สาขานครราชสีมา' : 'Nakhon Ratchasima Branch',
      address: th
        ? 'เลขที่ 443/2 ถ.ยมราช ต.ในเมือง อ.เมือง จ.นครราชสีมา 30000'
        : '443/2 Yommarat Road, Nai Mueang, Mueang, Nakhon Ratchasima 30000',
      phones: '044-244088',
      mobile: '086-815-7226',
      email: 'korat@thevaluation.com',
      map: `${IMG}/korat.jpg`,
    },
    {
      name: th ? 'สาขาอุดรธานี' : 'Udon Thani Branch',
      address: th
        ? 'เลขที่ 99/97 หมู่บ้านสวนพฤกษา 2 ถ.รอบเมือง ต.หมากแข้ง อ.เมือง จ.อุดรธานี 41000'
        : 'No. 99/97 Baan Suan Pruksa 2, Rob Mueang Road, Mak Khaeng, Mueang, Udon Thani 41000',
      phones: '042-113468',
      mobile: '089-418-0034',
      email: 'udon@thevaluation.com',
      map: `${IMG}/udon.jpg`,
    },
    {
      name: th ? 'สาขาสกลนคร' : 'Sakon Nakhon Branch',
      address: th
        ? 'เลขที่ 387/160 หมู่บ้านสกลรุ่งเรือง ถ.ไอ ที ยู ต.ธาตุเชิงชุม อ.เมือง จ.สกลนคร 47000'
        : 'No. 387/160 Sakon Roong Rueng, ITU Road, Tart Choeng Mum, Mueang, Sakon Nakhon 47000',
      phones: '042-716569',
      mobile: '089-711-5015',
      email: 'sakonnakhon@thevaluation.com',
      map: `${IMG}/sakon.jpg`,
    },
    {
      name: th ? 'สาขาบุรีรัมย์' : 'Buriram Branch',
      address: th
        ? 'เลขที่ 8/19 ถ.ปลัดเมือง ต.ในเมือง อ.เมือง จ.บุรีรัมย์ 31000'
        : 'No. 8/19 Pladmuang Road, Nai Mueang, Mueang, Buriram 31000',
      phones: '044-620074',
      mobile: '089-478-9331',
      email: 'buriram@thevaluation.com',
    },
    {
      name: th ? 'สาขาชัยภูมิ' : 'Chaiyaphum Branch',
      address: th
        ? 'เลขที่ 522/4ก ถ.บรรณาการ ต.ในเมือง อ.เมือง จ.ชัยภูมิ 36000'
        : 'No. 522/4 Kor Bannakan Rd, Nai Mueang, Mueang, Chaiyaphum 36000',
      phones: '094-241-2587',
      email: 'chaiyaphum@thevaluation.com',
    },
  ];

  return (
    <section id="branches" className="relative overflow-hidden bg-brand-navy-light/50 py-32">
      <div className="section-container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Chapter no="04" label={t.nav.branches} center />
          <MaskedTitle lines={[t.branches.title]} center className="mb-4" />
          <Reveal delay={0.2}>
            <p className="text-white/55">{t.branches.subtitle}</p>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {branches.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, y: 60, rotateX: -22 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 1, ease: EASE, delay: (i % 3) * 0.1 }}
              style={{ transformPerspective: 1000 }}
            >
              <TiltCard className="group overflow-hidden rounded-xl border border-white/10 bg-brand-navy/60 p-7 md:backdrop-blur-sm" max={6}>
                <div className="absolute left-0 top-0 h-16 w-full bg-gradient-to-r from-brand-gold/10 to-transparent" />
                <div className="relative mb-4 flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-brand-gold">{b.name}</h3>
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-brand-gold/30 text-xs font-bold text-brand-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="relative mb-5 text-sm leading-relaxed text-white/60">{b.address}</p>
                <div className="relative space-y-1 text-sm">
                  <div className="text-brand-gold">☎ {b.phones}</div>
                  {b.mobile && (
                    <div className="pl-5 text-white/60">
                      {th ? 'มือถือ' : 'Mobile'} {b.mobile}
                    </div>
                  )}
                  <a href={`mailto:${b.email}`} className="block py-1.5 pl-5 text-white/60 transition-colors hover:text-brand-gold">
                    {b.email}
                  </a>
                </div>
                {b.map && (
                  <button
                    type="button"
                    onClick={() => setOpenMap({ src: b.map!, title: b.name })}
                    className="relative mt-5 rounded-full border border-brand-gold/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand-gold transition-all duration-300 hover:bg-brand-gold hover:text-brand-navy"
                  >
                    {th ? 'ดูแผนที่' : 'View map'}
                  </button>
                )}
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openMap && <MapModal src={openMap.src} title={openMap.title} onClose={() => setOpenMap(null)} />}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Careers                                                             */
/* ------------------------------------------------------------------ */

export function CareersSection() {
  const { t, locale } = useI18n();
  const th = locale === 'th';

  // Open positions from the live "ร่วมงานกับเรา" page; all based at the Bangkok head office.
  const positions = [
    { title: th ? 'เจ้าหน้าที่ประเมินมูลค่าทรัพย์สิน - อสังหาริมทรัพย์' : 'Property Valuation Officer (Real Estate)', openings: 3 },
    { title: th ? 'เจ้าหน้าที่ประเมินราคาทรัพย์สิน - วิธีรายได้' : 'Property Valuation Officer (Income Approach)', openings: 2 },
    { title: th ? 'เจ้าหน้าที่ประเมินมูลค่าทรัพย์สิน - เครื่องจักร' : 'Property Valuation Officer (Machinery)', openings: 3 },
    { title: th ? 'เจ้าหน้าที่ฝ่ายการตลาด' : 'Marketing Officer', openings: 3 },
    { title: th ? 'เจ้าหน้าที่ฝ่ายพิมพ์' : 'Typist', openings: 5 },
  ];

  return (
    <section id="careers" className="relative overflow-hidden bg-brand-navy py-32">
      <div className="section-container relative">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <div>
            <Chapter no="05" label={t.nav.careers} />
            <MaskedTitle lines={[t.careers.title]} className="mb-3" />
            <Reveal delay={0.15}>
              <p className="mb-10 text-white/55">{t.careers.subtitle}</p>
            </Reveal>

            <div className="space-y-4">
              {positions.map((pos, i) => (
                <Reveal key={i} delay={i * 0.07} x={-30} y={0}>
                  <div className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5 md:backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-brand-gold/40 hover:bg-white/[0.07]">
                    <div>
                      <h4 className="font-medium text-white transition-colors group-hover:text-brand-gold">{pos.title}</h4>
                      <p className="mt-1 text-sm text-white/50">
                        {th ? `รับสมัคร ${pos.openings} อัตรา` : `${pos.openings} positions`} • {th ? 'กรุงเทพฯ' : 'Bangkok'}
                      </p>
                    </div>
                    <a
                      href={`mailto:job@thevaluation.com?subject=${encodeURIComponent(pos.title)}`}
                      className="flex-shrink-0 rounded-full border border-brand-gold/40 px-4 py-2 text-sm text-brand-gold transition-all duration-300 hover:bg-brand-gold hover:text-brand-navy"
                    >
                      {t.careers.apply}
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal x={50} y={0} className="lg:sticky lg:top-28">
            <TiltCard className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 md:backdrop-blur-xl" max={4}>
              <h3 className="mb-6 font-display text-2xl text-white">{th ? 'วิธีการรับสมัครงาน' : 'How to apply'}</h3>
              <div className="space-y-4 text-sm leading-relaxed text-white/70">
                <p>
                  {th ? 'ส่งอีเมลมาที่ ' : 'Send an email to '}
                  <a href="mailto:job@thevaluation.com" className="text-brand-gold transition-colors hover:text-brand-gold-light">
                    job@thevaluation.com
                  </a>
                  {th ? ' หรือส่งจดหมายสมัครงาน' : ' or send a cover letter.'}
                </p>
                <p>
                  <span className="font-medium text-white">The Valuation & Consultants Co., Ltd.</span>
                  <br />
                  {th
                    ? '719 เคพีเอ็น ทาวเวอร์ ชั้น 12 ถนนพระราม 9 แขวงบางกะปิ เขตห้วยขวาง กรุงเทพฯ 10310'
                    : '719 KPN Tower, 12th Floor, Rama 9 Road, Bangkapi, Huaykwang, Bangkok 10310'}
                  <br />
                  {th ? 'โทร.' : 'Tel.'} {COMPANY.phone} · {th ? 'โทรสาร' : 'Fax'} {COMPANY.fax}
                </p>
                <a
                  href="https://www.thevaluation.com/wp-content/uploads/2021/05/ใบสมัครVC-64.v2.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-block"
                >
                  {th ? 'ดาวน์โหลดใบสมัคร' : 'Download application form'}
                </a>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Articles                                                            */
/* ------------------------------------------------------------------ */

export function ArticlesSection() {
  const { t, locale } = useI18n();
  const url =
    'https://www.thevaluation.com/%e0%b8%9a%e0%b8%97%e0%b8%84%e0%b8%a7%e0%b8%b2%e0%b8%a1%e0%b8%a7%e0%b8%b4%e0%b8%88%e0%b8%b1%e0%b8%a2/';

  return (
    <section id="articles" className="relative overflow-hidden bg-brand-navy-light/50 py-32">
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <Chapter no="06" label={t.nav.articles} center />
          <MaskedTitle lines={[t.articles.title]} center className="mb-4" />
          <Reveal delay={0.15}>
            <p className="mb-10 text-white/55">{t.articles.subtitle}</p>
          </Reveal>
          <Reveal delay={0.25}>
            <a href={url} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-block">
              {t.articles.readMore}
            </a>
            <p className="mt-6 text-xs text-white/40">{locale === 'th' ? 'เปิดที่ thevaluation.com' : 'Opens thevaluation.com'}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Call to action                                                      */
/* ------------------------------------------------------------------ */

export function CTASection() {
  const { t, locale } = useI18n();

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-gold py-32">
      <motion.div
        className="pointer-events-none absolute inset-y-0 -left-1/3 hidden w-1/3 skew-x-[-20deg] bg-white/30 blur-2xl md:block"
        animate={{ x: ['0%', '420%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
      />
      <div className="section-container relative text-center">
        <MaskedTitle
          center
          className="mb-6 !font-display !font-bold !text-brand-navy"
          lines={[locale === 'th' ? 'ประเมินมูลค่าทรัพย์สิน ตั้งแต่ พ.ศ. 2535' : 'Property valuation since 1992']}
        />
        <Reveal delay={0.2}>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-brand-navy/80">
            {locale === 'th' ? 'บริการทั้งในระดับชาติและระดับสากล' : 'Serving clients at national and international level'}
          </p>
        </Reveal>
        <Reveal delay={0.3} className="flex flex-wrap justify-center gap-4">
          <a
            href="tel:027170801"
            className="rounded-full bg-brand-navy px-10 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-brand-dark hover:shadow-[0_10px_40px_rgba(11,20,38,0.4)]"
          >
            {t.contact.title}
          </a>
          <a
            href="mailto:info@thevaluation.com"
            className="rounded-full border-2 border-brand-navy px-10 py-4 font-semibold text-brand-navy transition-all duration-300 hover:-translate-y-1 hover:bg-brand-navy hover:text-white"
          >
            info@thevaluation.com
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

const fieldCls =
  'w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/35 outline-none transition-all duration-300 focus:border-brand-gold focus:bg-white/[0.08] focus:shadow-[0_0_0_4px_rgba(200,169,81,0.12)]';

export function ContactSection() {
  const { t, locale } = useI18n();
  const th = locale === 'th';
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState<null | 'sent' | 'mailto'>(null);
  const [busy, setBusy] = useState(false);
  const [trap, setTrap] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    const message = [`Name: ${form.name}`, `Email: ${form.email}`, `Phone: ${form.phone || '-'}`, '', form.message].join('\n');
    const result = await submitInquiry({
      subject: `Website inquiry from ${form.name}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      message,
      website: trap,
    });
    setBusy(false);
    setSubmitted(result);
    if (result === 'sent') setForm({ name: '', email: '', phone: '', message: '' });
  };

  const rows: Array<{ label: string; lines: React.ReactNode[] }> = [
    {
      label: t.contact.address,
      lines: [
        th
          ? '719 เคพีเอ็น ทาวเวอร์ ชั้น 12 ถนนพระราม 9 แขวงบางกะปิ เขตห้วยขวาง กรุงเทพฯ 10310'
          : '719 KPN Tower, 12th Floor, Rama 9 Rd, Huaykwang, Bangkok 10310',
      ],
    },
    { label: t.contact.phoneLabel, lines: ['0-2717-0801-8', `${th ? 'มือถือ' : 'Mobile'} 081-512-9411, 084-692-8851`, `${th ? 'โทรสาร' : 'Fax'} 0-2717-0800`] },
    {
      label: t.contact.emailLabel,
      lines: [
        <a key="m" href="mailto:info@thevaluation.com" className="text-brand-gold transition-colors hover:text-brand-gold-light">
          info@thevaluation.com
        </a>,
      ],
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-brand-navy py-32">
      <div className="section-container relative">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Chapter no="07" label={t.nav.contact} center />
          <MaskedTitle lines={[t.contact.title]} center />
        </div>

        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div className="space-y-5">
            {rows.map((r, i) => (
              <Reveal key={r.label} delay={i * 0.08} x={-30} y={0}>
                <TiltCard className="rounded-xl border border-white/10 bg-white/[0.04] p-6" max={4}>
                  <h4 className="mb-2 font-semibold text-white">{r.label}</h4>
                  <div className="space-y-1 text-sm leading-relaxed text-white/60">
                    {r.lines.map((ln, k) => (
                      <p key={k}>{ln}</p>
                    ))}
                  </div>
                </TiltCard>
              </Reveal>
            ))}
            <Reveal delay={0.3} x={-30} y={0}>
              <ParallaxImage src={`${IMG}/office-building.jpg`} alt="KPN Tower" className="aspect-[16/9] rounded-xl border border-white/10" strength={8} />
            </Reveal>
          </div>

          <Reveal x={40} y={0}>
            <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.04] p-7 md:backdrop-blur-xl">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={trap} onChange={(e) => setTrap(e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0" />
              <AnimatePresence>
                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden rounded-lg border border-brand-gold/40 bg-brand-gold/10 px-4 py-3 text-sm text-brand-gold"
                  >
                    {submitted === 'sent'
                      ? th
                        ? 'ส่งข้อความเรียบร้อยแล้ว ทีมงานจะติดต่อกลับโดยเร็ว'
                        : 'Your message has been sent. Our team will get back to you shortly.'
                      : th
                        ? 'กำลังเปิดอีเมลเพื่อส่งข้อความถึงเรา'
                        : 'Opening your email app to send your message'}
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="grid gap-5 sm:grid-cols-2">
                <input className={fieldCls} required placeholder={t.contact.name} aria-label={t.contact.name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input className={fieldCls} required type="email" placeholder={t.contact.email} aria-label={t.contact.email} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <input className={fieldCls} type="tel" placeholder={t.contact.phone} aria-label={t.contact.phone} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <textarea className={`${fieldCls} min-h-[160px] resize-y`} required placeholder={t.contact.message} aria-label={t.contact.message} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
                {busy ? (th ? 'กำลังส่ง…' : 'Sending…') : t.contact.submit}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
