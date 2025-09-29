
import React from 'react';

const Header: React.FC = () => (
  <header className="text-center mb-10">
    <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 pb-2">
      DBMS Fundamentals Visualizer
    </h1>
    <p className="text-gray-400 mt-2 text-lg">
      An interactive guide to core database concepts.
    </p>
  </header>
);

export default Header;
