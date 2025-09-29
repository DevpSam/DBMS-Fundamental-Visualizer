import React, { useState } from 'react';
import type { Section } from './types.ts';
import Header from './components/Header.tsx';
import Navbar from './components/Navbar.tsx';
import ThreeSchemaArchitecture from './components/ThreeSchemaArchitecture.tsx';
import SchemaVsInstance from './components/SchemaVsInstance.tsx';
import DbmsAdvantages from './components/DbmsAdvantages.tsx';
import BackgroundCanvas from './components/BackgroundCanvas.tsx';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('architecture');

  const renderSection = () => {
    switch (activeSection) {
      case 'architecture':
        return <ThreeSchemaArchitecture />;
      case 'schema':
        return <SchemaVsInstance />;
      case 'advantages':
        return <DbmsAdvantages />;
      default:
        return <ThreeSchemaArchitecture />;
    }
  };

  return (
    <>
      <BackgroundCanvas />
      <div className="relative min-h-screen text-gray-100 font-sans p-4 sm:p-8 selection:bg-blue-500/30">
        <div className="max-w-7xl mx-auto">
          <Header />
          <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
          <main className="mt-8">
            {renderSection()}
          </main>
          <footer className="text-center text-gray-500 mt-12 pb-4">
            <p>Built with React, TypeScript, and Tailwind CSS.</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default App;