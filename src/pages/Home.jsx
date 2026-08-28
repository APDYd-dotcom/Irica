import About from "../components/About/About";
import ContactForm from "../components/Contact/ContactForm";
import Hero from "../components/Hero/Hero";
import ProgramsSection from "../components/ProgramsSection";
import Publications from "../components/Publications/Publications";
import Services from "../components/Services/Services";
import Team from "../components/Team/Team";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";

export default function Home() {
  useFadeInOnScroll();

  return (
    <div className="overflow-x-hidden bg-neutral-50 text-neutral-900">
      <Hero />
      <Services />
      <About />
      <ProgramsSection />
      <Publications />
      <Team />
      <ContactForm />
    </div>
  );
}
