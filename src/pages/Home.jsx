import HeroHome from "../components/HelloSection";
import ServicesSection from "../components/ServicesSection";
import ProgramsSection from "../components/ProgramsSection";
import PublicationsSection from "../components/PublicationsSection";
import ActivitiesSection from "../components/ActivitiesSection";
import TeamSection from "../components/TeamSection";

export default function Home() {
  return (
    <div className="bg-white text-ink overflow-x-hidden">
      <HeroHome />
      <ServicesSection />
      <ProgramsSection />
      <PublicationsSection />
      <ActivitiesSection />
      <TeamSection />
    </div>
  );
}
