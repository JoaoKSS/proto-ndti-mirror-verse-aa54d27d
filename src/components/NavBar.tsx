
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setActiveDropdown(null);
    }
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  // Handle scroll events to detect when the navbar should have background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active section from external sources (like IntersectionObserver in Index.tsx)
  useEffect(() => {
    const handleSectionChange = (event: CustomEvent) => {
      setActiveSection(event.detail.section);
    };

    window.addEventListener('sectionChange' as any, handleSectionChange);
    return () => window.removeEventListener('sectionChange' as any, handleSectionChange);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
      setActiveDropdown(null);
    }
  };

  const menuItems = [
    { name: "Home", link: "/", id: "hero" },
    { name: "Novidades", link: "/novidades", id: "novidades" },
    { 
      name: "Sobre", 
      link: "#sobre",
      id: "sobre",
      dropdown: [
        { name: "O NDTI", link: "#sobre", id: "sobre" },
        { name: "Equipe", link: "#equipe", id: "equipe" },
      ]
    },
    { name: "Serviços", link: "#servicos", id: "servicos" },
    { name: "Projetos", link: "#projetos", id: "projetos" },
    { name: "Equipamentos", link: "/equipamentos", id: "equipamentos" },
    { name: "Contato", link: "#contato", id: "contato" }
  ];

  return (
    <nav className={cn(
      "fixed w-full z-50 transition-all duration-300",
      isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className={cn(
                "text-xl font-bold transition-colors duration-300",
                isScrolled ? "text-ifnmg-blue" : "text-white"
              )}>NDTI</span>
              <span className={cn(
                "hidden sm:block text-sm transition-colors duration-300",
                isScrolled ? "text-gray-600" : "text-gray-200"
              )}>IFNMG Campus Montes Claros</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 lg:space-x-10">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <div className="flex items-center cursor-pointer">
                    <span className={cn(
                      "transition-all duration-300 hover:text-ifnmg-blue relative",
                      activeSection === item.id || item.dropdown.some(d => d.id === activeSection)
                        ? "text-ifnmg-blue font-medium" 
                        : isScrolled ? "text-gray-600" : "text-white"
                    )}>
                      {item.name}
                      <span className={cn(
                        "absolute -bottom-1 left-0 w-0 h-0.5 bg-ifnmg-blue transform transition-all duration-300 group-hover:w-full",
                        (activeSection === item.id || item.dropdown.some(d => d.id === activeSection)) && "w-full"
                      )}></span>
                    </span>
                    <ChevronDown className={cn(
                      "ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180",
                      isScrolled ? "text-gray-600" : "text-white"
                    )} />
                    <div className="absolute hidden group-hover:block top-full left-0 bg-white/95 backdrop-blur-sm p-2 shadow-md rounded min-w-[150px] transform origin-top scale-95 group-hover:scale-100 transition-transform duration-200">
                      {item.dropdown.map((dropItem) => (
                        <a 
                          key={dropItem.name}
                          href={dropItem.link}
                          onClick={handleLinkClick}
                          className={cn(
                            "block py-2 px-4 text-sm hover:bg-gray-100/80 rounded transition-colors duration-200",
                            activeSection === dropItem.id ? "text-ifnmg-blue font-medium" : "text-gray-700"
                          )}
                        >
                          {dropItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  item.link.startsWith('#') ? (
                    <a
                      href={item.link}
                      onClick={handleLinkClick}
                      className={cn(
                        "transition-all duration-300 hover:text-ifnmg-blue relative",
                        activeSection === item.id 
                          ? "text-ifnmg-blue font-medium" 
                          : isScrolled ? "text-gray-600" : "text-white"
                      )}
                    >
                      {item.name}
                      <span className={cn(
                        "absolute -bottom-1 left-0 w-0 h-0.5 bg-ifnmg-blue transform transition-all duration-300 hover:w-full",
                        activeSection === item.id && "w-full"
                      )}></span>
                    </a>
                  ) : (
                    <Link
                      to={item.link}
                      onClick={handleLinkClick}
                      className={cn(
                        "transition-all duration-300 hover:text-ifnmg-blue relative",
                        activeSection === item.id 
                          ? "text-ifnmg-blue font-medium" 
                          : isScrolled ? "text-gray-600" : "text-white"
                      )}
                    >
                      {item.name}
                      <span className={cn(
                        "absolute -bottom-1 left-0 w-0 h-0.5 bg-ifnmg-blue transform transition-all duration-300 hover:w-full",
                        activeSection === item.id && "w-full"
                      )}></span>
                    </Link>
                  )
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu} 
              className={cn(
                "transition-colors duration-300 focus:outline-none p-2",
                isScrolled ? "text-gray-600 hover:text-ifnmg-blue" : "text-white hover:text-gray-300"
              )}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} className="animate-in fade-in rotate-in" /> : <Menu size={24} className="animate-in fade-in" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300 max-h-0 bg-white/95 backdrop-blur-sm rounded-b-lg shadow-md",
          isOpen ? "max-h-[500px] mt-3 p-3" : "max-h-0"
        )}>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={cn(
                        "w-full flex justify-between items-center px-4 py-2.5 text-base transition-colors hover:bg-gray-50 rounded-md",
                        (activeSection === item.id || item.dropdown.some(d => d.id === activeSection)) 
                          ? "text-ifnmg-blue font-medium" : "text-gray-600"
                      )}
                    >
                      {item.name}
                      <ChevronDown className={cn(
                        "transition-transform duration-300 h-4 w-4", 
                        activeDropdown === item.name ? "rotate-180" : ""
                      )} />
                    </button>
                    <div className={cn(
                      "pl-6 space-y-1 overflow-hidden transition-all duration-300", 
                      activeDropdown === item.name ? "max-h-[200px] mt-1" : "max-h-0"
                    )}>
                      {item.dropdown.map((dropItem) => (
                        <a
                          key={dropItem.name}
                          href={dropItem.link}
                          onClick={handleLinkClick}
                          className={cn(
                            "block py-2.5 px-4 text-sm hover:bg-gray-50 rounded-md",
                            activeSection === dropItem.id ? "text-ifnmg-blue font-medium" : "text-gray-700"
                          )}
                        >
                          {dropItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  item.link.startsWith('#') ? (
                    <a
                      href={item.link}
                      onClick={handleLinkClick}
                      className={cn(
                        "block px-4 py-2.5 text-base hover:bg-gray-50 rounded-md transition-colors",
                        activeSection === item.id ? "text-ifnmg-blue font-medium" : "text-gray-600"
                      )}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.link}
                      onClick={handleLinkClick}
                      className={cn(
                        "block px-4 py-2.5 text-base hover:bg-gray-50 rounded-md transition-colors",
                        activeSection === item.id ? "text-ifnmg-blue font-medium" : "text-gray-600"
                      )}
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
