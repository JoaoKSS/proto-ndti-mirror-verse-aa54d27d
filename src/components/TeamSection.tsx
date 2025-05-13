
import React from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';

const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: "Dr. João Silva",
      role: "Coordenador",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Professor de Ciência da Computação com doutorado em Engenharia de Software e especialização em Inteligência Artificial.",
      social: {
        linkedin: "#",
        github: "#",
        email: "joao.silva@ifnmg.edu.br"
      }
    },
    {
      name: "Dra. Maria Oliveira",
      role: "Desenvolvedora Sênior",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Especialista em desenvolvimento web e mobile com experiência em projetos de grande escala para instituições educacionais.",
      social: {
        linkedin: "#",
        github: "#",
        email: "maria.oliveira@ifnmg.edu.br"
      }
    },
    {
      name: "Pedro Santos",
      role: "Administrador de Sistemas",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      bio: "Técnico em TI responsável pela infraestrutura de redes e servidores do NDTI, com certificações em administração de sistemas Linux.",
      social: {
        linkedin: "#",
        github: "#",
        email: "pedro.santos@ifnmg.edu.br"
      }
    },
    {
      name: "Ana Pereira",
      role: "UX/UI Designer",
      image: "https://randomuser.me/api/portraits/women/29.jpg",
      bio: "Designer com foco em experiência do usuário e interfaces gráficas, especialista em tornar aplicações tecnológicas acessíveis e intuitivas.",
      social: {
        linkedin: "#",
        github: "#",
        email: "ana.pereira@ifnmg.edu.br"
      }
    }
  ];

  return (
    <section id="equipe" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-heading mb-16">Nossa Equipe</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-ndti-800">{member.name}</h3>
                <p className="text-ndti-600 mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <div className="flex space-x-3">
                  <a href={member.social.linkedin} className="text-gray-400 hover:text-ndti-700">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={member.social.github} className="text-gray-400 hover:text-ndti-700">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href={`mailto:${member.social.email}`} className="text-gray-400 hover:text-ndti-700">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-xl text-gray-600">
            Nossa equipe é composta por profissionais altamente qualificados e estudantes dedicados a inovação tecnológica.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
