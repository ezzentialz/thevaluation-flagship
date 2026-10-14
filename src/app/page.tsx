'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroCinematic } from '@/components/HeroCinematic';
import { TrustBar, SectorsSection, ApproachSection, InternationalSection } from '@/components/TrustSections';
import {
  AboutSection,
  ServicesSection,
  PropertiesSection,
  BranchesSection,
  CareersSection,
  ArticlesSection,
  CTASection,
  ContactSection,
} from '@/components/sections';

export default function HomePage() {
  return (
    <main id="main" className="relative min-h-screen bg-brand-navy text-white">
      <Navbar />

      <HeroCinematic />

      <TrustBar />
      <AboutSection />
      <ServicesSection />
      <SectorsSection />
      <ApproachSection />
      <InternationalSection />
      <PropertiesSection />
      <BranchesSection />
      <CareersSection />
      <ArticlesSection />
      <CTASection />
      <ContactSection />

      <Footer />
    </main>
  );
}
