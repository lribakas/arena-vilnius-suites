import React from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturedSuites from "@/components/home/FeaturedSuites";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import BenefitsSection from "@/components/home/BenefitsSection";
import CorporateSection from "@/components/home/CorporateSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedSuites />
      <UpcomingEvents />
      <BenefitsSection />
      <CorporateSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}