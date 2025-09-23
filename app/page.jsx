import AboutSection from "@/components/homeComponents/AboutSection";
import ContactFormSection from "@/components/homeComponents/ContactFormSection";
import HeroSection from "@/components/homeComponents/HeroSection";
import OfferSection from "@/components/homeComponents/OfferSection";
import PricingTable from "@/components/homeComponents/PricingTable";
import ProgressCircles from "@/components/homeComponents/ProgressCircles";
import ProjectSection from "@/components/homeComponents/ProjectSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans min-h-screen  pb-20 gap-16 py-20">
      <main className="container mx-auto">
        <HeroSection />
        <AboutSection />
        <OfferSection />
        <ProgressCircles />
        <PricingTable />
        <ProjectSection />
        <ContactFormSection />
      </main>
    </div>
  );
}
