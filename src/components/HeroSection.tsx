
import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-ndti-900">
              Núcleo de Desenvolvimento Tecnológico e Inovação
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Transformando ideias em soluções tecnológicas inovadoras para o IFNMG Campus Montes Claros e toda comunidade.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#servicos" 
                className="px-6 py-3 bg-ifnmg-blue text-white rounded-md hover:bg-ndti-800 transition-colors flex items-center"
              >
                Nossos Serviços
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a 
                href="#contato" 
                className="px-6 py-3 border border-ifnmg-blue text-ifnmg-blue rounded-md hover:bg-gray-50 transition-colors"
              >
                Entre em Contato
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center animate-fade-in-right">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-ifnmg-blue to-ndti-700 opacity-75 blur"></div>
              <div className="relative bg-white p-6 rounded-lg shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                  alt="Inovação Tecnológica" 
                  className="rounded-lg w-full max-w-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
