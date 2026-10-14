'use client';

import React from 'react';
import { useI18n } from '@/context/I18nContext';
import { COMPANY, yearsOfService } from '@/lib/company';
import { Chapter, MaskedTitle, Reveal, TiltCard } from '@/components/motion';

// Every claim below comes from the live thevaluation.com site (approvals, memberships,
// client categories, service lines, offices). Items that still need documents from the
// company (licence numbers, case studies, testimonials) are listed in CONTENT-TO-VERIFY.md
// and are deliberately NOT rendered here.

const CREDENTIALS = {
  th: [
    { k: 'SEC', title: 'ได้รับความเห็นชอบจาก ก.ล.ต.', body: 'สำนักงานคณะกรรมการกำกับหลักทรัพย์และตลาดหลักทรัพย์' },
    { k: 'OIC', title: 'ได้รับความเห็นชอบจากกรมการประกันภัย', body: 'บริษัทประเมินที่ได้รับการเห็นชอบ' },
    { k: 'IAAT', title: 'สมาชิกสมาคมนักประเมินราคาอิสระไทย', body: 'สมาคมวิชาชีพด้านการประเมินราคา' },
    { k: 'TAV', title: 'สมาชิกสมาคมผู้ประเมินค่าทรัพย์สินแห่งประเทศไทย', body: 'สมาคมวิชาชีพด้านการประเมินค่าทรัพย์สิน' },
  ],
  en: [
    { k: 'SEC', title: 'Approved by the SEC', body: 'Securities and Exchange Commission, Thailand' },
    { k: 'OIC', title: 'Approved by the Department of Insurance', body: 'Recognised valuation firm' },
    { k: 'IAAT', title: 'Member, Thai Independent Appraisers Association', body: 'Professional appraisal body' },
    { k: 'TAV', title: 'Member, Valuers Association of Thailand', body: 'Professional valuation body' },
  ],
};

export function TrustBar() {
  const { locale } = useI18n();
  const th = locale === 'th';
  const items = CREDENTIALS[locale];
  const facts = [
    { v: `${yearsOfService()}+`, l: th ? 'ปีแห่งประสบการณ์' : 'Years of experience' },
    { v: '7', l: th ? 'สำนักงานทั่วประเทศ' : 'Offices nationwide' },
    { v: '8', l: th ? 'ขอบเขตบริการ' : 'Service lines' },
  ];

  return (
    <section
      aria-label={th ? 'การรับรองและสมาชิก' : 'Approvals and memberships'}
      className="relative border-y border-brand-gold/20 bg-brand-dark py-10"
    >
      <div className="section-container">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {items.map((c) => (
              <li key={c.k} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-gold/40 bg-brand-gold/10 text-[10px] font-bold tracking-wider text-brand-gold">
                  {c.k}
                </span>
                <span>
                  <span className="block text-sm font-semibold leading-snug text-white">{c.title}</span>
                  <span className="mt-1 block text-xs leading-snug text-white/50">{c.body}</span>
                </span>
              </li>
            ))}
          </ul>
          <dl className="grid grid-cols-3 gap-6 border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            {facts.map((f) => (
              <div key={f.l}>
                <dd className="font-display text-3xl font-bold text-brand-gold">{f.v}</dd>
                <dt className="mt-1 text-[11px] uppercase tracking-wider text-white/50">{f.l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

const SECTORS = {
  th: ['ธนาคารและสถาบันการเงิน', 'ที่ปรึกษาด้านการเงินและการลงทุน', 'ผู้ตรวจสอบบัญชีและสำนักงานกฎหมาย', 'กลุ่มโรงงานอุตสาหกรรม', 'โรงแรมและธุรกิจท่องเที่ยว', 'สถาบันการศึกษา', 'หน่วยงานของรัฐ'],
  en: ['Banks & financial institutions', 'Financial & investment advisors', 'Auditors & law firms', 'Industrial groups', 'Hotels & hospitality', 'Educational institutions', 'Government agencies'],
};

const ASSETS = {
  th: ['ที่ดินและโครงการพัฒนา', 'อาคารชุดและอาคารสำนักงาน', 'โรงแรม รีสอร์ท ห้างสรรพสินค้า', 'โรงงาน โกดัง เหมืองแร่', 'เครื่องจักรและอุปกรณ์', 'โรงไฟฟ้าและพลังงานทดแทน', 'ยานพาหนะ เรือ อากาศยาน', 'มูลค่าธุรกิจและหุ้น'],
  en: ['Land & development projects', 'Condominiums & office buildings', 'Hotels, resorts & retail', 'Factories, warehouses & mines', 'Machinery & equipment', 'Power plants & renewables', 'Vehicles, vessels & aircraft', 'Business & share valuation'],
};

export function SectorsSection() {
  const { locale } = useI18n();
  const th = locale === 'th';
  return (
    <section id="clients" className="relative overflow-hidden bg-brand-navy-light/50 py-28">
      <div className="section-container relative">
        <Chapter no="—" label={th ? 'กลุ่มลูกค้าและทรัพย์สิน' : 'Clients & Assets'} />
        <MaskedTitle
          lines={[th ? 'ที่ไว้วางใจจากภาครัฐและเอกชน' : 'Trusted across public and private sectors']}
          className="mb-12"
        />
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
              {th ? 'เราให้บริการ' : 'We serve'}
            </h3>
            <ul className="space-y-3">
              {SECTORS[locale].map((s, i) => (
                <Reveal key={s} delay={i * 0.04} y={18}>
                  <li className="flex items-center gap-3 border-b border-white/10 pb-3 text-white/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
                    {s}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
              {th ? 'ประเภททรัพย์สินที่ประเมิน' : 'Asset classes we value'}
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {ASSETS[locale].map((a, i) => (
                <Reveal key={a} delay={i * 0.04} y={18}>
                  <li className="h-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/75">{a}</li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const PROCESS = {
  th: [
    { t: 'รับโจทย์และกำหนดวัตถุประสงค์', d: 'ทำความเข้าใจวัตถุประสงค์ของการประเมินและขอบเขตงาน' },
    { t: 'สำรวจและรวบรวมข้อมูล', d: 'ลงพื้นที่สำรวจทรัพย์สินและรวบรวมข้อมูลตลาด' },
    { t: 'วิเคราะห์และประเมินมูลค่า', d: 'วิเคราะห์ด้วยวิธีที่เหมาะสมกับประเภททรัพย์สิน' },
    { t: 'ส่งมอบรายงาน', d: 'จัดทำรายงานการประเมินที่ชัดเจนและตรวจสอบได้' },
  ],
  en: [
    { t: 'Brief & purpose', d: 'We clarify the purpose of the valuation and the scope of work.' },
    { t: 'Inspection & data', d: 'We inspect the asset and gather relevant market evidence.' },
    { t: 'Analysis & valuation', d: 'We apply methods suited to the type of asset.' },
    { t: 'Report delivery', d: 'We deliver a clear, auditable valuation report.' },
  ],
};

export function ApproachSection() {
  const { locale } = useI18n();
  const th = locale === 'th';
  return (
    <section id="approach" className="relative overflow-hidden bg-brand-navy py-28">
      <div className="section-container relative">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <Chapter no="—" label={th ? 'แนวทางการทำงาน' : 'Our Approach'} center />
          <MaskedTitle lines={[th ? 'คุณภาพ โปร่งใส ยุติธรรม' : 'Quality, transparency and fairness']} center />
          <p className="mt-6 text-white/60">
            {th
              ? 'ปรัชญาการทำงานของเราคือให้บริการที่รวดเร็ว ถูกต้อง และมีประสิทธิภาพตามมาตรฐานสากล'
              : 'Our philosophy is to deliver fast, accurate and efficient service to international standards.'}
          </p>
        </div>
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS[locale].map((p, i) => (
            <li key={p.t} className="list-none">
              <Reveal delay={i * 0.08} className="h-full">
                <TiltCard className="h-full rounded-xl border border-white/10 bg-white/[0.04] p-6" max={5}>
                  <div className="font-display text-4xl font-bold text-brand-gold/60">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="mt-3 font-semibold text-white">{p.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{p.d}</p>
                </TiltCard>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const INTL = {
  th: {
    chapter: 'สำหรับนักลงทุนต่างชาติ',
    title: 'พร้อมให้บริการนักลงทุนและสถาบันระดับสากล',
    body: 'ตั้งแต่ปี 2535 เราให้บริการประเมินมูลค่าทรัพย์สินทั้งในระดับชาติและระดับสากล ครอบคลุมอสังหาริมทรัพย์ เครื่องจักร และธุรกิจ เพื่อสนับสนุนการตัดสินใจลงทุน การซื้อขาย การเงิน และการรายงานทางบัญชี',
    points: [
      'ประเมินมูลค่าทรัพย์สินเพื่อการลงทุนและการซื้อขาย',
      'ประเมินมูลค่าธุรกิจและหุ้น เพื่อร่วมกิจการและแลกเปลี่ยนหุ้น',
      'ศึกษาความเป็นไปได้และที่ปรึกษาการลงทุน',
      'เครือข่าย 7 สำนักงานครอบคลุมกรุงเทพฯ และภูมิภาค',
    ],
    cta: 'ติดต่อทีมงาน',
  },
  en: {
    chapter: 'For International Investors',
    title: 'Thai valuation expertise for global investors and institutions',
    body: 'Since 1992 we have delivered property, machinery and business valuations at national and international level, supporting investment decisions, transactions, financing and financial reporting.',
    points: [
      'Valuation for investment and transaction decisions',
      'Business and share valuation for joint ventures and share exchanges',
      'Feasibility studies and investment advisory',
      'A network of 7 offices across Bangkok and the regions',
    ],
    cta: 'Contact our team',
  },
};

export function InternationalSection() {
  const { locale } = useI18n();
  const c = INTL[locale];
  return (
    <section id="international" className="relative overflow-hidden bg-gradient-to-b from-brand-navy-light/60 to-brand-navy py-28">
      <div className="pointer-events-none absolute -right-40 top-10 hidden h-[30rem] w-[30rem] rounded-full bg-brand-gold/[0.07] blur-[120px] md:block" />
      <div className="section-container relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Chapter no="—" label={c.chapter} />
          <MaskedTitle lines={[c.title]} className="mb-6" />
          <Reveal>
            <p className="text-lg leading-relaxed text-white/65">{c.body}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <a href={`mailto:${COMPANY.email}?subject=International%20enquiry`} className="btn-primary mt-8 inline-flex">
              {c.cta}
            </a>
          </Reveal>
        </div>
        <ul className="space-y-4">
          {c.points.map((p, i) => (
            <Reveal key={p} delay={i * 0.07} x={30} y={0}>
              <li className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-gold/20 text-sm font-bold text-brand-gold">
                  ✓
                </span>
                <span className="text-white/80">{p}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
