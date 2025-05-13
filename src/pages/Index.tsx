
import React, { useEffect, useState } from 'react';
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
  // Track scroll progress for progress indicator
  const [scrollProgress, setScrollProgress] = useState(0);
  
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

  // Track scroll progress for progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Implement lazy loading for images
  useEffect(() => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      lazyImages.forEach(img => {
        img.classList.add('lazy-loaded');
      });
    } else {
      // Fallback for browsers that don't support native lazy loading
      const lazyImageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target as HTMLImageElement;
            lazyImage.src = lazyImage.dataset.src || lazyImage.src;
            lazyImage.classList.add('lazy-loaded');
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });

      lazyImages.forEach(img => {
        lazyImageObserver.observe(img);
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress indicator */}
      <div 
        className="progress-indicator"
        style={{ width: `${scrollProgress}%` }}
      ></div>
      
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
