import type { TranslationKeys } from '@/types';

// All copy below is taken from the live thevaluation.com export (thevaluation_export).
// Where the source gives no detail for an item, the description is left empty rather than invented.

export const translations: Record<'th' | 'en', TranslationKeys> = {
  th: {
    nav: {
      home: 'หน้าแรก',
      about: 'เกี่ยวกับเรา',
      services: 'บริการ',
      properties: 'ซื้อ ขาย เช่า',
      branches: 'สาขา',
      careers: 'ร่วมงานกับเรา',
      articles: 'บทความวิจัย',
      contact: 'ติดต่อเรา',
    },
    hero: {
      title: 'บริษัท เดอะแวลูเอชั่น แอนด์ คอนซัลแทนท์ส จำกัด',
      subtitle: 'คุณภาพก้าวไกล โปร่งใส ยุติธรรม',
      cta: 'สำรวจบริการของเรา',
      scrollDown: 'เลื่อนลงเพื่อดูเพิ่มเติม',
    },
    about: {
      title: 'เกี่ยวกับเรา',
      subtitle: 'บริษัทประเมินมูลค่าทรัพย์สินของคนไทย',
      description:
        'บริษัท เดอะแวลูเอชั่น แอนด์ คอนซัลแทนท์ส จำกัด เป็นบริษัทประเมินมูลค่าทรัพย์สินของคนไทย ก่อตั้งเมื่อปี 2535 ให้บริการทั้งภาครัฐบาลและเอกชน อาทิ ธนาคาร/สถาบันการเงิน ที่ปรึกษาด้านการเงิน/การลงทุน ผู้ตรวจสอบบัญชี/สำนักงานกฎหมาย กลุ่มโรงงานอุตสาหกรรม โรงแรม สถาบันการศึกษา และหน่วยงานของรัฐ ทั้งในระดับชาติและระดับสากล เป็นบริษัทประเมินที่ได้รับการเห็นชอบจากกรมการประกันภัยและ ก.ล.ต. และเป็นสมาชิกสมาคมนักประเมินราคาอิสระไทย',
      stats: {
        years: 'ก่อตั้งเมื่อ พ.ศ.',
        projects: 'ขอบเขตงานบริการ',
        clients: 'กรรมการบริหาร',
        branches: 'สาขาในภูมิภาค',
      },
      readMore: 'ดูบริการของเรา',
    },
    services: {
      title: 'บริการของเรา',
      subtitle: 'ขอบเขตการทำงานของบริษัท',
      items: [
        {
          title: 'งานประเมินมูลค่าอสังหาริมทรัพย์',
          description:
            'ที่ดิน อาคารพักอาศัย โครงการพัฒนา อาคารชุด อาคารสำนักงาน โรงแรม รีสอร์ท อพาร์ทเมนท์ ห้างสรรพสินค้า โรงงาน โกดัง และเหมืองแร่',
          icon: 'building',
        },
        {
          title: 'งานประเมินเครื่องจักรและอุปกรณ์',
          description:
            'เครื่องจักรและอุปกรณ์ในอุตสาหกรรมผลิต โรงไฟฟ้าหลักและพลังงานทดแทน การขนส่ง เช่น รถ เรือ เครื่องบิน และเครื่องจักรกลหนัก',
          icon: 'cog',
        },
        {
          title: 'งานประเมินมูลค่าธุรกิจ',
          description: 'เพื่อกำหนดมูลค่าหุ้น ร่วมกิจการ และแลกเปลี่ยนมูลค่าหุ้น',
          icon: 'chart',
        },
        {
          title: 'งานสำรวจและวิจัย & ศึกษาความเป็นไปได้',
          description: '',
          icon: 'search',
        },
        {
          title: 'งานขายอสังหาริมทรัพย์',
          description: 'ซื้อ ขาย เช่า และรับฝากขายทรัพย์สิน',
          icon: 'handshake',
        },
        {
          title: 'งานที่ปรึกษาการลงทุน',
          description: '',
          icon: 'briefcase',
        },
        {
          title: 'งานบริหารและจัดการทรัพย์สิน',
          description: '',
          icon: 'shield',
        },
        {
          title: 'งานตรวจสอบอาคาร',
          description: '',
          icon: 'file',
        },
      ],
    },
    properties: {
      title: 'ทรัพย์สิน ซื้อ / ขาย / เช่า',
      subtitle: 'ประเภท ซื้อ / ขาย / เช่า อสังหาฯ',
      buy: 'ต้องการซื้อ',
      rent: 'ต้องการเช่า',
      sell: 'ต้องการฝากขาย',
      agent: 'สนใจเป็นตัวแทนขาย',
    },
    branches: {
      title: 'สำนักงานสาขา',
      subtitle: 'สำนักงานใหญ่กรุงเทพฯ และสาขาในภูมิภาค',
    },
    careers: {
      title: 'ร่วมงานกับเรา',
      subtitle: 'ตำแหน่งงานว่าง',
      apply: 'สมัครงาน',
    },
    articles: {
      title: 'บทความวิจัย',
      subtitle: 'บทความจากทีมงานเดอะแวลูเอชั่น',
      readMore: 'อ่านบนเว็บไซต์หลัก',
    },
    contact: {
      title: 'ติดต่อเรา',
      subtitle: 'สอบถามข้อมูลเพิ่มเติม',
      name: 'ชื่อ-นามสกุล',
      email: 'อีเมล',
      phone: 'เบอร์โทรศัพท์',
      message: 'ข้อความ',
      submit: 'ส่งข้อความ',
      address: 'ที่อยู่',
      phoneLabel: 'โทรศัพท์',
      emailLabel: 'อีเมล',
    },
    footer: {
      rights: 'สงวนลิขสิทธิ์',
      privacy: 'นโยบายความเป็นส่วนตัว',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      properties: 'Buy / Sell / Rent',
      branches: 'Branches',
      careers: 'Careers',
      articles: 'Research Articles',
      contact: 'Contact',
    },
    hero: {
      title: 'The Valuation & Consultants Co., Ltd.',
      subtitle: 'Advanced Quality, Transparency and Fairness',
      cta: 'Explore Our Services',
      scrollDown: 'Scroll to Discover More',
    },
    about: {
      title: 'About Us',
      subtitle: 'A Thai-owned property valuation company',
      description:
        'The Valuation and Consultants Company Limited is a Thai-owned property valuation company established in 1992. We serve both the government and private sectors, including banks and financial institutions, financial and investment advisors, law firms, industrial groups, hotels, educational institutions and government agencies, at national and international level. We are approved by the Department of Insurance and the Securities and Exchange Commission (SEC), and are a member of the Thai Independent Appraisers Association.',
      stats: {
        years: 'Established',
        projects: 'Service Lines',
        clients: 'Executive Committee',
        branches: 'Regional Branches',
      },
      readMore: 'View Our Services',
    },
    services: {
      title: 'Our Services',
      subtitle: 'Scope of work',
      items: [
        {
          title: 'Property Valuation',
          description:
            'Land, residential buildings, development projects, condominiums, office buildings, hotels, resorts, apartments, malls, factories, warehouses and mines',
          icon: 'building',
        },
        {
          title: 'Machinery and Equipment Valuation',
          description:
            'Machinery and equipment in industrial production, main power plants and renewable energy, transportation such as vehicles, ships and aircraft, and heavy equipment',
          icon: 'cog',
        },
        {
          title: 'Business Valuation',
          description: 'For use as capital, determining share value, and venture and exchange of share value',
          icon: 'chart',
        },
        {
          title: 'Survey, Research & Feasibility Study',
          description: '',
          icon: 'search',
        },
        {
          title: 'Real Estate Sales',
          description: 'Buy, sell and rent properties',
          icon: 'handshake',
        },
        {
          title: 'Investment Advisory',
          description: '',
          icon: 'briefcase',
        },
        {
          title: 'Property Management',
          description: '',
          icon: 'shield',
        },
        {
          title: 'Building Inspection',
          description: '',
          icon: 'file',
        },
      ],
    },
    properties: {
      title: 'Properties Buy / Sell / Rent',
      subtitle: 'Buy / Sell / Rent real estate',
      buy: 'Want to Buy',
      rent: 'Want to Rent',
      sell: 'Want to Sell',
      agent: 'Join as Sales Representative',
    },
    branches: {
      title: 'Branch Offices',
      subtitle: 'Bangkok head office and regional branches',
    },
    careers: {
      title: 'Careers',
      subtitle: 'Available positions',
      apply: 'Apply',
    },
    articles: {
      title: 'Research Articles',
      subtitle: 'Articles from The Valuation team',
      readMore: 'Read on the main website',
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Get in touch',
      name: 'Full Name',
      email: 'Email',
      phone: 'Phone Number',
      message: 'Message',
      submit: 'Send Message',
      address: 'Address',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
    },
    footer: {
      rights: 'All Rights Reserved',
      privacy: 'Privacy Policy',
    },
  },
};

export function getTranslation(locale: 'th' | 'en'): TranslationKeys {
  return translations[locale];
}
