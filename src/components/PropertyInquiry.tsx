'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useI18n } from '@/context/I18nContext';
import { EASE } from '@/components/motion';
import { cn } from '@/lib/utils';
import { submitInquiry } from '@/lib/submitInquiry';

type Mode = 'buy' | 'sell' | 'rent';

const MODES: Array<{ key: Mode; color: string; text: string }> = [
  { key: 'buy', color: '#00B050', text: '#fff' },
  { key: 'sell', color: '#E53935', text: '#fff' },
  { key: 'rent', color: '#FFC000', text: '#1a1400' },
];

// Property types follow the "types of property appraised" list on the live site.
const PROPERTY_TYPES = {
  th: [
    'ที่ดิน',
    'อาคารพักอาศัย / บ้าน',
    'โครงการพัฒนา',
    'อาคารชุดพักอาศัย',
    'อาคารสำนักงาน',
    'โรงแรม / รีสอร์ท / อพาร์ทเมนท์',
    'ห้างสรรพสินค้า',
    'โรงงานอุตสาหกรรม / โกดัง / คลังสินค้า',
    'เหมืองแร่',
  ],
  en: [
    'Land',
    'Residential building / house',
    'Development project',
    'Condominium',
    'Office building',
    'Hotel / resort / apartment',
    'Shopping mall',
    'Factory / warehouse',
    'Mine',
  ],
};

const L = {
  th: {
    title: 'ต้องการ ซื้อ / ขาย / เช่า',
    modes: { buy: 'ซื้อ', sell: 'ขาย', rent: 'เช่า' },
    contact: 'รายละเอียดผู้ติดต่อ',
    property: 'รายละเอียดสินทรัพย์',
    name: 'ชื่อ-นามสกุล',
    phone: 'เบอร์โทรศัพท์',
    email: 'E-mail (ถ้ามี)',
    line: 'Line ID (ถ้ามี)',
    type: 'ประเภททรัพย์สิน',
    typeOther: 'ประเภททรัพย์สินอื่นๆ',
    rai: 'พื้นที่/ไร่',
    ngan: 'พื้นที่/งาน',
    wa: 'พื้นที่/ตารางวา',
    sqm: 'พื้นที่/ตารางเมตร',
    floors: 'จำนวนชั้น',
    bed: 'จำนวนห้องนอน',
    bath: 'จำนวนห้องน้ำ',
    kitchen: 'จำนวนห้องครัว',
    price: { buy: 'ราคาที่ต้องใจจะซื้อ/บาท', sell: 'ราคาที่ต้องใจจะขาย/บาท', rent: 'ราคาที่ต้องใจจะเช่า/บาท' },
    advice: { buy: 'ขอคำปรึกษาในการซื้อ', sell: 'ขอคำปรึกษาในการตั้งราคาขาย', rent: 'ขอคำปรึกษาในการเช่า' },
    address: 'ที่อยู่',
    moo: 'หมู่',
    soi: 'ซอย',
    road: 'ถนน',
    subdistrict: 'ตำบล',
    district: 'อำเภอ',
    province: 'จังหวัด',
    more: 'รายละเอียดเพิ่มเติม',
    submit: 'บันทึก',
    required: 'กรุณากรอกชื่อและเบอร์โทรศัพท์',
    opening: 'กำลังเปิดอีเมลเพื่อส่งข้อมูลถึงเรา',
    delivered: 'ส่งข้อมูลเรียบร้อยแล้ว ทีมงานจะติดต่อกลับโดยเร็ว',
    select: '— เลือก —',
  },
  en: {
    title: 'Buy / Sell / Rent',
    modes: { buy: 'Buy', sell: 'Sell', rent: 'Rent' },
    contact: 'Contact details',
    property: 'Property details',
    name: 'Full name',
    phone: 'Phone number',
    email: 'E-mail (optional)',
    line: 'Line ID (optional)',
    type: 'Property type',
    typeOther: 'Other property type',
    rai: 'Area / rai',
    ngan: 'Area / ngan',
    wa: 'Area / sq. wah',
    sqm: 'Area / sq. m.',
    floors: 'Floors',
    bed: 'Bedrooms',
    bath: 'Bathrooms',
    kitchen: 'Kitchens',
    price: { buy: 'Desired purchase price / THB', sell: 'Desired selling price / THB', rent: 'Desired rent / THB' },
    advice: { buy: 'Ask for advice on buying', sell: 'Ask for advice on pricing', rent: 'Ask for advice on renting' },
    address: 'Address',
    moo: 'Moo',
    soi: 'Soi',
    road: 'Road',
    subdistrict: 'Sub-district',
    district: 'District',
    province: 'Province',
    more: 'Additional details',
    submit: 'Submit',
    required: 'Please enter your name and phone number',
    opening: 'Opening your email app to send the details',
    delivered: 'Sent. Our team will get back to you shortly.',
    select: '— Select —',
  },
} as const;

type Values = Record<string, string>;

const inputCls =
  'w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/35 outline-none transition-all duration-300 focus:border-brand-accent focus:bg-white/[0.08] focus:shadow-[0_0_0_4px_rgba(157,170,248,0.12)]';

export function PropertyInquiry() {
  const { locale } = useI18n();
  const l = L[locale];
  const [mode, setMode] = useState<Mode>('buy');
  const [v, setV] = useState<Values>({});
  const [advice, setAdvice] = useState(false);
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sentKind, setSentKind] = useState<'sent' | 'mailto'>('sent');

  // The tiles above the form ask for a specific tab through this event.
  useEffect(() => {
    const onMode = (e: Event) => setMode((e as CustomEvent<Mode>).detail);
    window.addEventListener('inquiry-mode', onMode);
    return () => window.removeEventListener('inquiry-mode', onMode);
  }, []);

  const active = MODES.find((m) => m.key === mode)!;
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setV((p) => ({ ...p, [k]: e.target.value }));
  const val = (k: string) => v[k] ?? '';

  const field = (k: string, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <input className={inputCls} placeholder={label} aria-label={label} value={val(k)} onChange={set(k)} {...props} />
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!val('name').trim() || !val('phone').trim()) {
      setError(true);
      return;
    }
    setError(false);
    const row = (label: string, key: string) => (val(key) ? `${label}: ${val(key)}` : null);
    const lines = [
      `[${l.modes[mode]}]`,
      '',
      l.contact,
      row(l.name, 'name'),
      row(l.phone, 'phone'),
      row(l.email, 'email'),
      row(l.line, 'line'),
      '',
      l.property,
      row(l.type, 'type'),
      row(l.typeOther, 'typeOther'),
      row(l.rai, 'rai'),
      row(l.ngan, 'ngan'),
      row(l.wa, 'wa'),
      row(l.sqm, 'sqm'),
      row(l.floors, 'floors'),
      row(l.bed, 'bed'),
      row(l.bath, 'bath'),
      row(l.kitchen, 'kitchen'),
      row(l.price[mode], 'price'),
      advice ? `✓ ${l.advice[mode]}` : null,
      row(l.address, 'address'),
      row(l.moo, 'moo'),
      row(l.soi, 'soi'),
      row(l.road, 'road'),
      row(l.subdistrict, 'subdistrict'),
      row(l.district, 'district'),
      row(l.province, 'province'),
      row(l.more, 'more'),
    ].filter((x): x is string => x !== null);

    if (sending) return;
    setSending(true);
    const result = await submitInquiry({
      subject: `${l.title} - ${l.modes[mode]} - ${val('name')}`,
      name: val('name'),
      email: val('email'),
      phone: val('phone'),
      message: lines.join('\n'),
      website: val('website'),
    });
    setSending(false);
    setSentKind(result);
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };

  return (
    <form
      onSubmit={submit}
      noValidate
      className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-brand-navy-light/60 shadow-[0_30px_80px_rgba(0,0,0,0.45)] md:backdrop-blur-xl"
    >
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={val('website')} onChange={set('website')} className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      {/* Mode switch */}
      <div className="grid grid-cols-3 gap-3 border-b border-white/10 p-4 sm:p-5">
        {MODES.map((m) => {
          const on = m.key === mode;
          return (
            <button
              key={m.key}
              type="button"
              onClick={() => setMode(m.key)}
              aria-pressed={on}
              className="relative rounded-lg py-3 text-sm font-semibold transition-colors duration-300"
              style={{ color: on ? m.text : 'rgba(255,255,255,0.7)' }}
            >
              {on && (
                <motion.span
                  layoutId="mode-pill"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: m.color, boxShadow: `0 8px 30px ${m.color}66` }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {!on && <span className="absolute inset-0 rounded-lg bg-white/[0.05] hover:bg-white/10 transition-colors" />}
              <span className="relative z-10">{l.modes[m.key]}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-8 p-5 sm:p-8">
        <fieldset className="space-y-4">
          <legend className="mb-4 font-display text-xl text-white">{l.contact}</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            {field('name', l.name, { required: true, autoComplete: 'name' })}
            {field('phone', l.phone, { required: true, type: 'tel', autoComplete: 'tel' })}
            {field('email', l.email, { type: 'email', autoComplete: 'email' })}
            {field('line', l.line)}
          </div>
        </fieldset>

        <AnimatePresence mode="wait">
          <motion.fieldset
            key={mode}
            className="space-y-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <legend className="mb-4 font-display text-xl text-white">{l.property}</legend>

            <div className="grid gap-4 sm:grid-cols-2">
              <select className={cn(inputCls, 'appearance-none')} aria-label={l.type} value={val('type')} onChange={set('type')}>
                <option value="" className="bg-brand-navy">
                  {l.type} {l.select}
                </option>
                {PROPERTY_TYPES[locale].map((p) => (
                  <option key={p} value={p} className="bg-brand-navy">
                    {p}
                  </option>
                ))}
              </select>
              {field('typeOther', l.typeOther)}
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {field('rai', l.rai, { inputMode: 'decimal' })}
              {field('ngan', l.ngan, { inputMode: 'decimal' })}
              {field('wa', l.wa, { inputMode: 'decimal' })}
              {field('sqm', l.sqm, { inputMode: 'decimal' })}
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {field('floors', l.floors, { inputMode: 'numeric' })}
              {field('bed', l.bed, { inputMode: 'numeric' })}
              {field('bath', l.bath, { inputMode: 'numeric' })}
              {field('kitchen', l.kitchen, { inputMode: 'numeric' })}
            </div>

            <div className="grid items-center gap-4 sm:grid-cols-2">
              {field('price', l.price[mode], { inputMode: 'numeric' })}
              <label className="flex cursor-pointer items-center gap-3 text-sm text-white/70">
                <input
                  type="checkbox"
                  checked={advice}
                  onChange={(e) => setAdvice(e.target.checked)}
                  className="h-4 w-4 accent-[#9DAAF8]"
                />
                {l.advice[mode]}
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-4">
              <div className="sm:col-span-2">{field('address', l.address)}</div>
              {field('moo', l.moo)}
              {field('soi', l.soi)}
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {field('road', l.road)}
              {field('subdistrict', l.subdistrict)}
              {field('district', l.district)}
              {field('province', l.province)}
            </div>

            <textarea
              className={cn(inputCls, 'min-h-[140px] resize-y')}
              placeholder={l.more}
              aria-label={l.more}
              value={val('more')}
              onChange={set('more')}
            />
          </motion.fieldset>
        </AnimatePresence>

        <AnimatePresence>
          {(error || sent) && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              role="status"
              className={cn(
                'overflow-hidden rounded-lg px-4 py-3 text-sm',
                error ? 'border border-red-400/40 bg-red-500/10 text-red-300' : 'border border-brand-accent/40 bg-brand-accent/10 text-brand-accent'
              )}
            >
              {error ? l.required : sentKind === 'sent' ? l.delivered : l.opening}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          disabled={sending}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-lg py-4 text-sm font-semibold uppercase tracking-widest transition-shadow duration-300"
          style={{ background: active.color, color: active.text, boxShadow: `0 10px 40px ${active.color}55` }}
        >
          {l.submit}
        </motion.button>
      </div>
    </form>
  );
}
