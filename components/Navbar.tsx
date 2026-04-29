import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { NavSection } from '../types';

interface NavbarProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: NavSection.HOME, label: 'Início', icon: Icons.Home },
    { id: NavSection.DEVOTIONAL, label: 'Devocional', icon: Icons.BookOpen },
    { id: NavSection.EVENTS, label: 'Agenda', icon: Icons.Calendar },
    { id: NavSection.PRAYER, label: 'Oração', icon: Icons.Heart },
  ];

  const handleNavClick = (id: NavSection) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => handleNavClick(NavSection.HOME)}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${isScrolled ? 'bg-church-600 text-white' : 'bg-white text-church-900'}`}>
               <span className="font-serif font-bold text-xl">NS</span>
            </div>
            <div className={`flex flex-col ${isScrolled ? 'text-church-900' : 'text-white'}`}>
              <span className="font-bold text-lg leading-tight tracking-tight">Igreja Novo</span>
              <span className="font-light text-sm tracking-widest uppercase">Santo Amaro</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium transition-colors hover:text-gold-500 flex items-center ${
                  currentSection === item.id 
                    ? 'text-gold-500' 
                    : isScrolled ? 'text-gray-600' : 'text-white/90'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
                onClick={() => handleNavClick(NavSection.GIVING)}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-all transform hover:scale-105 ${
                    isScrolled 
                    ? 'bg-church-600 text-white hover:bg-church-700' 
                    : 'bg-white text-church-900 hover:bg-gray-100'
                }`}
            >
                Contribua
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md ${isScrolled ? 'text-church-900' : 'text-white'}`}
            >
              {isMobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg border-t border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium flex items-center ${
                  currentSection === item.id 
                    ? 'bg-church-50 text-church-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            ))}
             <button 
                onClick={() => handleNavClick(NavSection.GIVING)}
                className="w-full mt-4 bg-church-600 text-white py-3 rounded-lg font-medium"
            >
                Contribua
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};