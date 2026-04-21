import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navbar } from "@/components/Navbar";
import { ChatWidget } from "@/components/ChatWidget";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Projects } from "@/sections/Projects";
import { Timeline } from "@/sections/Timeline";
import { GitHub } from "@/sections/GitHub";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

function App() {
  return (
    <div className="relative min-h-screen bg-[#0f172a] text-white overflow-x-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Timeline />
          <GitHub />
          <Contact />
        </main>
        <Footer />
      </div>
      <ChatWidget />
    </div>
  );
}

export default App;
