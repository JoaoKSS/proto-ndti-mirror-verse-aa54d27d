
import React from 'react';
import { Code, Database, Server, Monitor, Cpu, Smartphone } from 'lucide-react';

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <Code className="h-12 w-12 text-ifnmg-blue mb-4" />,
      title: "Desenvolvimento de Software",
      description: "Criamos sistemas personalizados, sites e aplicações web para atender às necessidades específicas da instituição e seus projetos."
    },
    {
      icon: <Database className="h-12 w-12 text-ifnmg-blue mb-4" />,
      title: "Banco de Dados",
      description: "Modelagem, implementação e otimização de bancos de dados para garantir a segurança e eficiência no armazenamento de informações."
    },
    {
      icon: <Server className="h-12 w-12 text-ifnmg-blue mb-4" />,
      title: "Infraestrutura de TI",
      description: "Planejamento e implementação de soluções de infraestrutura tecnológica, incluindo servidores e redes."
    },
    {
      icon: <Monitor className="h-12 w-12 text-ifnmg-blue mb-4" />,
      title: "Suporte Técnico",
      description: "Oferecemos suporte técnico especializado para resolução de problemas e manutenção de sistemas."
    },
    {
      icon: <Cpu className="h-12 w-12 text-ifnmg-blue mb-4" />,
      title: "Automação de Processos",
      description: "Desenvolvimento de soluções para automatizar e otimizar processos administrativos e acadêmicos."
    },
    {
      icon: <Smartphone className="h-12 w-12 text-ifnmg-blue mb-4" />,
      title: "Aplicações Móveis",
      description: "Criação de aplicativos móveis para facilitar o acesso a serviços e informações da instituição."
    }
  ];

  return (
    <section id="servicos" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-heading mb-16">Nossos Serviços</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:border-ndti-300 card-hover"
            >
              <div className="flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold mt-4 mb-3 text-center text-ndti-800">{service.title}</h3>
              <p className="text-gray-600 text-center">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#contato" 
            className="px-8 py-3 bg-ifnmg-blue text-white rounded-md hover:bg-ndti-800 transition-colors inline-block"
          >
            Solicite um Serviço
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
