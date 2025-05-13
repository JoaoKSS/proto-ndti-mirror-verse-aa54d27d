
import React from 'react';
import { Code, Database, Server, Monitor, Cpu, Smartphone, ArrowRight, Zap } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const ServicesSection: React.FC = () => {
  // Create animation entries for each service card with staggered thresholds
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const services = [
    {
      icon: <Code className="h-10 w-10 sm:h-12 sm:w-12 text-ifnmg-blue mb-4 transition-transform group-hover:scale-110 duration-300" />,
      title: "Desenvolvimento de Software",
      description: "Criamos sistemas personalizados, sites e aplicações web para atender às necessidades específicas da instituição e seus projetos."
    },
    {
      icon: <Database className="h-10 w-10 sm:h-12 sm:w-12 text-ifnmg-blue mb-4 transition-transform group-hover:scale-110 duration-300" />,
      title: "Banco de Dados",
      description: "Modelagem, implementação e otimização de bancos de dados para garantir a segurança e eficiência no armazenamento de informações."
    },
    {
      icon: <Server className="h-10 w-10 sm:h-12 sm:w-12 text-ifnmg-blue mb-4 transition-transform group-hover:scale-110 duration-300" />,
      title: "Infraestrutura de TI",
      description: "Planejamento e implementação de soluções de infraestrutura tecnológica, incluindo servidores e redes."
    },
    {
      icon: <Monitor className="h-10 w-10 sm:h-12 sm:w-12 text-ifnmg-blue mb-4 transition-transform group-hover:scale-110 duration-300" />,
      title: "Suporte Técnico",
      description: "Oferecemos suporte técnico especializado para resolução de problemas e manutenção de sistemas."
    },
    {
      icon: <Cpu className="h-10 w-10 sm:h-12 sm:w-12 text-ifnmg-blue mb-4 transition-transform group-hover:scale-110 duration-300" />,
      title: "Automação de Processos",
      description: "Desenvolvimento de soluções para automatizar e otimizar processos administrativos e acadêmicos."
    },
    {
      icon: <Smartphone className="h-10 w-10 sm:h-12 sm:w-12 text-ifnmg-blue mb-4 transition-transform group-hover:scale-110 duration-300" />,
      title: "Aplicações Móveis",
      description: "Criação de aplicativos móveis para facilitar o acesso a serviços e informações da instituição."
    }
  ];

  return (
    <section id="servicos" className="py-16 sm:py-20" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-ifnmg-blue/10 text-ifnmg-blue mb-4">
            <Zap className="w-4 h-4 mr-2 pulse-glow" />
            <span>Nossos Serviços</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ndti-900 mb-4">
            Soluções tecnológicas para transformar seu projeto
          </h2>
          <p className="text-gray-600">
            Desenvolvemos soluções inovadoras para atender às necessidades específicas da comunidade acadêmica
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={cn(
                "bg-white p-6 sm:p-8 rounded-lg shadow-md border border-gray-100 hover:border-ndti-300 group transition-all duration-500 hover:-translate-y-2 hover:shadow-xl",
                sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold mt-4 mb-3 text-center text-ndti-800 group-hover:text-ifnmg-blue transition-colors">{service.title}</h3>
              <p className="text-gray-600 text-center">{service.description}</p>
              <div className="mt-6 flex justify-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center transform opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-ifnmg-blue" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 sm:mt-16 text-center">
          <a 
            href="#contato" 
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-ifnmg-blue text-white rounded-md hover:bg-ndti-800 transition-all duration-300 inline-flex items-center group hover:shadow-lg hover:shadow-ifnmg-blue/30"
          >
            Solicite um Serviço
            <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
