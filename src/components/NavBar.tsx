
import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setActiveDropdown(null);
    }
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const menuItems = [
    { name: "Home", link: "#" },
    { 
      name: "Sobre", 
      link: "#sobre",
      dropdown: [
        { name: "O NDTI", link: "#sobre" },
        { name: "Equipe", link: "#equipe" },
      ]
    },
    { name: "Serviços", link: "#servicos" },
    { name: "Projetos", link: "#projetos" },
    { name: "Contato", link: "#contato" }
  ];

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-ifnmg-blue">NDTI</span>
              <span className="hidden md:block text-sm text-gray-600">IFNMG Campus Montes Claros</span>
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <div className="flex items-center cursor-pointer text-gray-600 hover:text-ifnmg-blue">
                    <span>{item.name}</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                    <div className="absolute hidden group-hover:block top-full left-0 bg-white p-2 shadow-md rounded min-w-[150px]">
                      {item.dropdown.map((dropItem) => (
                        <a 
                          key={dropItem.name}
                          href={dropItem.link}
                          className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {dropItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    href={item.link}
                    className="text-gray-600 hover:text-ifnmg-blue"
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-ifnmg-blue focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn("md:hidden", isOpen ? "block" : "hidden")}>
          <div className="pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="w-full flex justify-between items-center px-4 py-2 text-base text-gray-600 hover:bg-gray-50"
                    >
                      {item.name}
                      <ChevronDown className={cn("transition-transform h-4 w-4", activeDropdown === item.name ? "rotate-180" : "")} />
                    </button>
                    <div className={cn("pl-6", activeDropdown === item.name ? "block" : "hidden")}>
                      {item.dropdown.map((dropItem) => (
                        <a
                          key={dropItem.name}
                          href={dropItem.link}
                          onClick={toggleMenu}
                          className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          {dropItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    href={item.link}
                    onClick={toggleMenu}
                    className="block px-4 py-2 text-base text-gray-600 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
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
