
import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Novidades: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("todos");
  
  const news = [
    {
      id: 1,
      title: "Processo Seletivo para Bolsistas",
      description: "O NDTI está com vagas abertas para estudantes interessados em atuar como bolsistas em projetos de inovação tecnológica. As inscrições podem ser realizadas através do portal do aluno.",
      date: "2025-05-10",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3",
      type: "edital"
    },
    {
      id: 2,
      title: "Sistema de Gestão de Laboratórios",
      description: "Nova solução desenvolvida pelo NDTI permite o monitoramento em tempo real dos equipamentos dos laboratórios, otimizando o uso dos recursos e detectando falhas precocemente.",
      date: "2025-05-05",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3",
      type: "projeto"
    },
    {
      id: 3,
      title: "Workshop de Desenvolvimento Web",
      description: "Nos dias 15 e 16 de maio, o NDTI realizará um workshop gratuito sobre tecnologias modernas para desenvolvimento web. Inscreva-se e aprenda sobre React, Node.js e muito mais.",
      date: "2025-04-28",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3",
      type: "evento"
    },
    {
      id: 4,
      title: "Chamada para Projetos de Extensão",
      description: "O NDTI está recebendo propostas para projetos de extensão na área de tecnologia. Os projetos selecionados receberão suporte técnico e financeiro.",
      date: "2025-04-20",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3",
      type: "edital"
    },
    {
      id: 5,
      title: "App de Monitoramento de Presença",
      description: "Aplicativo desenvolvido pela equipe do NDTI facilita o controle de frequência em aulas e eventos através de geolocalização e QR code.",
      date: "2025-04-15",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3",
      type: "projeto"
    },
    {
      id: 6,
      title: "Hackathon IFNMG 2025",
      description: "O maior evento de tecnologia e inovação do Norte de Minas está chegando! Forme sua equipe e participe dessa maratona de desenvolvimento de soluções tecnológicas.",
      date: "2025-04-10",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3",
      type: "evento"
    },
    {
      id: 7,
      title: "Plataforma de Gerenciamento de TCC",
      description: "Nova ferramenta facilita o acompanhamento de trabalhos de conclusão de curso, permitindo interação entre orientadores e alunos em um ambiente digital.",
      date: "2025-04-01",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3",
      type: "projeto"
    },
    {
      id: 8,
      title: "Bolsas de Iniciação em Desenvolvimento",
      description: "Programa oferece bolsas para estudantes interessados em aprender desenvolvimento de software em projetos reais do NDTI.",
      date: "2025-03-25",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3",
      type: "edital"
    }
  ];

  const filteredNews = activeFilter === "todos" 
    ? news 
    : news.filter(item => item.type === activeFilter);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="progress-indicator" style={{ width: `0%` }}></div>
      <NavBar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ndti-800 mb-4">
              Novidades e Comunicados
            </h1>
            <p className="text-gray-600 max-w-3xl">
              Fique por dentro das últimas atualizações, editais, projetos e eventos do Núcleo de Desenvolvimento Tecnológico e Inovação do IFNMG Campus Montes Claros.
            </p>
          </header>

          <div className="mb-10">
            <div className="flex flex-wrap gap-3 mb-6">
              {["todos", "edital", "projeto", "evento"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? "bg-ifnmg-blue text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {filter === "todos" ? "Todos" : 
                   filter === "edital" ? "Editais" : 
                   filter === "projeto" ? "Projetos" : "Eventos"}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((item) => (
                <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow card-hover">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full inline-block ${
                        item.type === 'edital' ? 'bg-ndti-500 text-white' : 
                        item.type === 'projeto' ? 'bg-ifnmg-blue text-white' : 
                        'bg-gray-100 text-ndti-800'
                      }`}>
                        {item.type === 'edital' ? 'Edital' : 
                         item.type === 'projeto' ? 'Projeto' : 'Evento'}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(item.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-ndti-800 mb-3">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.description}</p>
                    
                    <a 
                      href="#" 
                      className="text-ifnmg-blue hover:text-ndti-700 font-medium flex items-center text-sm"
                    >
                      Ler mais
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link to="/" className="inline-flex items-center text-ifnmg-blue hover:text-ndti-700 font-medium">
              Voltar para a página inicial
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Novidades;
