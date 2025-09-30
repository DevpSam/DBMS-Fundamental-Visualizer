

import React, { useState } from 'react';
import { UsersIcon, SchemaIcon, StorageIcon } from './icons.tsx';

// Data for each schema level, including examples
const schemaLevels = [
  {
    id: 'external',
    icon: UsersIcon,
    title: 'External Schema',
    subtitle: 'User Views',
    description: 'This level describes the part of the database that a specific user group is interested in, hiding the rest. There can be multiple external schemas for a single database.',
    color: 'blue',
    example: {
      title: "Example: Instructor's View",
      description: "An instructor might only need to see a student's ID and name for their class roster, not their major or other sensitive data.",
      code: `CREATE VIEW InstructorRoster AS
SELECT ID, Name
FROM Students;`,
    },
  },
  {
    id: 'conceptual',
    icon: SchemaIcon,
    title: 'Conceptual Schema',
    subtitle: 'Logical Structure',
    description: 'Also known as the logical schema, this provides a unified view of the entire database. It describes entities, attributes, relationships, and constraints, without physical storage details.',
    color: 'purple',
    example: {
      title: 'Example: The Complete Blueprint',
      description: 'This is the foundational structure for the "Students" table, defining all its columns and their data types.',
      code: `CREATE TABLE Students (
  ID    INTEGER PRIMARY KEY,
  Name  VARCHAR(255),
  Major VARCHAR(255)
);`,
    },
  },
  {
    id: 'internal',
    icon: StorageIcon,
    title: 'Internal Schema',
    subtitle: 'Physical Storage',
    description: 'This level, also called the physical schema, defines how data is physically stored. It deals with file organization, data structures (e.g., B+ trees), and access paths to optimize performance.',
    color: 'green',
    example: {
      title: 'Example: How Data is Stored',
      description: 'This defines the low-level details, such as creating an index on the primary key for faster searching.',
      code: `-- The Students table data is stored in 'data/students.db'
-- An index is created on the ID column for fast lookups.
CREATE INDEX idx_student_id ON Students(ID);`,
    },
  },
];

const ThreeSchemaArchitecture: React.FC = () => {
  const [activeSchemaId, setActiveSchemaId] = useState<'external' | 'conceptual' | 'internal'>('external');

  const activeSchema = schemaLevels.find(s => s.id === activeSchemaId);
  const Icon = activeSchema?.icon;

  return (
    <div className="bg-gray-800/20 p-6 sm:p-8 rounded-xl shadow-inner-lg border border-gray-700">
      <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-green-300">
        Three-Schema Architecture
      </h2>

      {/* Interactive Diagram Selectors */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-0 mb-8">
        {schemaLevels.map((level, index) => (
          <React.Fragment key={level.id}>
            <button
              onClick={() => setActiveSchemaId(level.id as any)}
              aria-pressed={activeSchemaId === level.id}
              className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-300 w-full md:w-auto transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
                ${activeSchemaId === level.id
                  ? `bg-gray-700/50 border-${level.color}-500 shadow-lg shadow-${level.color}-500/20 ring-${level.color}-500`
                  : `bg-gray-800/60 border-gray-700 hover:border-gray-500 ring-transparent`
                }`}
            >
              <level.icon className={`w-8 h-8 text-${level.color}-400`} />
              <span className="font-bold text-gray-200">{level.title}</span>
            </button>
            {/* Fix: Corrected syntax for the separator div to resolve parsing error. */}
            {index < schemaLevels.length - 1 && (
               <div className="w-1 md:w-12 h-8 md:h-1 bg-gray-600 rounded-full" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Details Panel */}
      {activeSchema && Icon && (
        <div key={activeSchema.id} className="bg-gray-900/30 p-6 rounded-lg border border-gray-700 animate-fade-in">
            <style>{`.animate-fade-in { animation: fadeIn 0.5s ease-in-out; } @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
          <div className="flex items-start sm:items-center space-x-4 mb-4">
            <Icon className={`w-16 h-16 text-${activeSchema.color}-400 flex-shrink-0`} />
            <div>
              <h3 className={`text-2xl font-bold text-${activeSchema.color}-400`}>{activeSchema.title}</h3>
              <p className="text-gray-400 font-semibold">{activeSchema.subtitle}</p>
            </div>
          </div>
          
          <p className="text-gray-300 leading-relaxed mb-6">
            {activeSchema.description}
          </p>

          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
             <h4 className="font-semibold text-lg text-gray-200 mb-2">{activeSchema.example.title}</h4>
             <p className="text-gray-400 text-sm mb-4">{activeSchema.example.description}</p>
             <div className="bg-gray-900 p-4 rounded-md font-mono text-sm text-green-400 border border-gray-700 overflow-x-auto">
                <pre><code className="whitespace-pre-wrap">{activeSchema.example.code}</code></pre>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeSchemaArchitecture;