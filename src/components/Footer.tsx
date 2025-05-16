
import React from 'react';
import { Facebook, Instagram, Youtube, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-ndti-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">NDTI</h3>
            <p className="text-gray-300 mb-4">
              Núcleo de Desenvolvimento Tecnológico e Inovação do IFNMG Campus Montes Claros
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#sobre" className="text-gray-300 hover:text-white transition-colors">Sobre</a></li>
              <li><a href="#servicos" className="text-gray-300 hover:text-white transition-colors">Serviços</a></li>
              <li><a href="#projetos" className="text-gray-300 hover:text-white transition-colors">Projetos</a></li>
              <li><a href="#equipe" className="text-gray-300 hover:text-white transition-colors">Equipe</a></li>
              <li><a href="#contato" className="text-gray-300 hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Links Institucionais</h3>
            <ul className="space-y-2">
              <li><a href="https://www.ifnmg.edu.br" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">IFNMG</a></li>
              <li><a href="https://www.ifnmg.edu.br/montesclaros" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Campus Montes Claros</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Portal do Aluno</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Portal do Servidor</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Biblioteca Virtual</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Inscreva-se para receber novidades, atualizações sobre projetos e eventos.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Seu email"
                className="px-4 py-2 w-full bg-ndti-900 border border-ndti-800 rounded-l-md focus:outline-none focus:ring-1 focus:ring-ndti-300 text-white"
              />
              <button
                type="submit"
                className="bg-ifnmg-blue hover:bg-ndti-700 px-4 py-2 rounded-r-md transition-colors"
              >
                <Mail className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-ndti-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} NDTI - IFNMG Campus Montes Claros. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Política de Privacidade</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
