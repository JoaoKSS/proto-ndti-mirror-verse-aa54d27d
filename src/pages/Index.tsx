
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import TeamSection from '@/components/TeamSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  // Create refs for each section with threshold and rootMargin for better detection
  const [heroRef, heroInView] = useInView({ threshold: 0.3, rootMargin: "-100px 0px" });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.3, rootMargin: "-100px 0px" });
  const [servicesRef, servicesInView] = useInView({ threshold: 0.3, rootMargin: "-100px 0px" });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.3, rootMargin: "-100px 0px" });
  const [teamRef, teamInView] = useInView({ threshold: 0.3, rootMargin: "-100px 0px" });
  const [contactRef, contactInView] = useInView({ threshold: 0.3, rootMargin: "-100px 0px" });

  // Update active section based on which section is in view
  useEffect(() => {
    if (heroInView) dispatchSectionEvent('hero');
    else if (aboutInView) dispatchSectionEvent('sobre');
    else if (servicesInView) dispatchSectionEvent('servicos');
    else if (projectsInView) dispatchSectionEvent('projetos');
    else if (teamInView) dispatchSectionEvent('equipe');
    else if (contactInView) dispatchSectionEvent('contato');
  }, [heroInView, aboutInView, servicesInView, projectsInView, teamInView, contactInView]);

  const dispatchSectionEvent = (section: string) => {
    window.dispatchEvent(
      new CustomEvent('sectionChange', { detail: { section } })
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main>
        <div ref={heroRef}>
          <HeroSection />
        </div>
        <div ref={aboutRef}>
          <AboutSection />
        </div>
        <div ref={servicesRef}>
          <ServicesSection />
        </div>
        <div ref={projectsRef}>
          <ProjectsSection />
        </div>
        <div ref={teamRef}>
          <TeamSection />
        </div>
        <div ref={contactRef}>
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
