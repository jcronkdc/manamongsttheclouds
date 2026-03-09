import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Synopsis from "./components/Synopsis";
import WorldSection from "./components/WorldSection";
import Characters from "./components/Characters";
import Excerpt from "./components/Excerpt";
import Journey from "./components/Journey";
import CompTitles from "./components/CompTitles";
import ReadSection from "./components/ReadSection";
import SignupSection from "./components/SignupSection";
import ProofSection from "./components/ProofSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      <Nav />
      <Hero />
      <Synopsis />
      <WorldSection />
      <Characters />
      <Excerpt />
      <CompTitles />
      <Journey />
      <ReadSection />
      <SignupSection />
      <ProofSection />
      <Footer />
    </main>
  );
}
