// Single source of truth for company facts. All values are taken from the live
// thevaluation.com site; nothing here is invented.

export const COMPANY = {
  nameTh: 'บริษัท เดอะแวลูเอชั่น แอนด์ คอนซัลแทนท์ส จำกัด',
  nameEn: 'The Valuation & Consultants Co., Ltd.',
  foundedCE: 1992,
  foundedBE: 2535,
  url: 'https://www.thevaluation.com',
  email: 'info@thevaluation.com',
  jobEmail: 'job@thevaluation.com',
  phone: '0-2717-0801-8',
  phoneIntl: '+66-2-717-0801',
  fax: '0-2717-0800',
  mobiles: ['081-512-9411', '084-692-8851'],
  address: {
    th: '719 เคพีเอ็น ทาวเวอร์ ชั้น 12 ถนนพระราม 9 แขวงบางกะปิ เขตห้วยขวาง กรุงเทพฯ 10310',
    en: '719 KPN Tower, 12th Floor, Rama 9 Rd, Huaykwang, Bangkok 10310',
  },
  privacyUrl: 'https://www.thevaluation.com/privacy-policy-th/',
} as const;

export const yearsOfService = () => new Date().getFullYear() - COMPANY.foundedCE;
