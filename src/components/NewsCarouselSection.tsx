
import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const NewsCarouselSection: React.FC = () => {
  const [api, setApi] = useState<any>();
  const [currentSlide, setCurrentSlide] = useState(0);

  // News carousel items
  const newsItems = [
    {
      id: 1,
      title: "Processo Seletivo para Bolsistas",
      description: "Novas vagas para bolsistas em projetos de inovação tecnológica.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3",
      type: "edital"
    },
    {
      id: 2,
      title: "Sistema de Gestão de Laboratórios",
      description: "Novo projeto para monitoramento e controle de equipamentos.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3",
      type: "projeto"
    },
    {
      id: 3,
      title: "Workshop de Desenvolvimento Web",
      description: "Inscrições abertas para capacitação em tecnologias front-end.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3",
      type: "evento"
    },
    {
      id: 4,
      title: "Chamada para Projetos de Extensão",
      description: "Submeta sua proposta para o programa de extensão tecnológica.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3",
      type: "edital"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.next();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [api]);

  // Update current slide when API changes
  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="py-8 bg-gradient-to-b from-ndti-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-ndti-800">
            <span className="text-gradient">Novidades</span>
          </h2>
          <Link 
            to="/novidades" 
            className="text-ifnmg-blue hover:text-ndti-700 font-medium flex items-center"
          >
            Ver todas
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="relative">
          <Carousel 
            setApi={setApi} 
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {newsItems.map((item) => (
                <CarouselItem 
                  key={item.id} 
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <Link to="/novidades" className="block">
                    <div className="relative overflow-hidden rounded-xl group card-hover">
                      <div className="aspect-ratio h-48 md:h-64 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4 md:p-6">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full mb-2 inline-block w-fit ${
                          item.type === 'edital' ? 'bg-ndti-500 text-white' : 
                          item.type === 'projeto' ? 'bg-ifnmg-blue text-white' : 
                          'bg-white text-ndti-800'
                        }`}>
                          {item.type === 'edital' ? 'Edital' : 
                           item.type === 'projeto' ? 'Projeto' : 'Evento'}
                        </span>
                        <h3 className="text-xl text-white font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-200 text-sm line-clamp-2">{item.description}</p>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-2">
              {newsItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => api?.scrollTo(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === idx 
                      ? "w-6 bg-ifnmg-blue" 
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            
            <CarouselPrevious className="left-2 lg:-left-12" />
            <CarouselNext className="right-2 lg:-right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default NewsCarouselSection;
