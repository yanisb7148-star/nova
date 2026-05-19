/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LenisProvider } from "./components/LenisProvider";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ScrollShowcase } from "./components/ScrollShowcase";
import { Services } from "./components/Services";
import { ServiceCards } from "./components/ServiceCards";
import { ProjectShowcase } from "./components/ProjectShowcase";
import { TechStack } from "./components/TechStack";
import { Process } from "./components/Process";
import { WhyNova } from "./components/WhyNova";
import { Contact } from "./components/Contact";
import { Booking } from "./components/Booking";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <LenisProvider>
      <div className="relative min-h-screen selection:bg-brand-purple/30">
        <div className="noise-bg" />
        
        <Navbar />
        
        <main>
          <Hero />
          <div className="hidden md:block">
            <ScrollShowcase />
            <Services />
          </div>
          <TechStack />
          <ServiceCards />
          <ProjectShowcase />
          <div className="hidden md:block">
            <Process />
            <WhyNova />
          </div>
          <Contact />
          <Booking />
        </main>
        
        <Footer />
      </div>
    </LenisProvider>
  );
}

