
import React from 'react';
import type { Section } from '../types.ts';

interface NavbarProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'architecture', label: '3-Schema Architecture' },
    { id: 'schema', label: 'Schema vs. Instance' },
    { id: 'advantages', label: 'DBMS Advantages' },
  ];

  return (
    <nav className="flex justify-center bg-gray-800/50 backdrop-blur-sm rounded-full p-1.5 sticky top-4 z-10 max-w-md mx-auto shadow-lg">
      <ul className="flex items-center space-x-2 w-full justify-around">
        {navItems.map((item) => (
          <li key={item.id} className="flex-1">
            <button
              onClick={() => setActiveSection(item.id as Section)}
              className={`w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                activeSection === item.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;