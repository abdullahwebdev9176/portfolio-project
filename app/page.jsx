import AboutSection from "@/components/homeComponents/AboutSection";
import HeroSection from "@/components/homeComponents/HeroSection";
import OfferSection from "@/components/homeComponents/OfferSection";
import ProgressCircles from "@/components/homeComponents/ProgressCircles";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans min-h-screen lg:p-8 pb-20 gap-16 sm:p-20">
      <main className="container mx-auto">
        <HeroSection />
        <AboutSection />
        <OfferSection />
        <ProgressCircles />
      </main>
    </div>
  );
}
