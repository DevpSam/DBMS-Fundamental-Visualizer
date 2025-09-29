
import React from 'react';
import { UsersIcon, SchemaIcon, StorageIcon } from './icons.tsx';

const SchemaCard: React.FC<{
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  color: string;
}> = ({ icon: Icon, title, subtitle, description, color }) => {
  const hoverClasses = `hover:border-${color}-400 hover:shadow-${color}-500/20`;
  const textClasses = `text-${color}-400`;

  return (
    <div className={`bg-gray-800/50 p-6 rounded-lg border border-gray-700 transition-all duration-300 hover:shadow-xl ${hoverClasses} transform hover:-translate-y-1`}>
      <div className="flex items-center space-x-4">
        <Icon className={`w-12 h-12 ${textClasses}`} />
        <div>
          <h3 className={`text-2xl font-bold ${textClasses}`}>{title}</h3>
          <p className="text-gray-400 font-semibold">{subtitle}</p>
        </div>
      </div>
      <p className="mt-4 text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const ThreeSchemaArchitecture: React.FC = () => {
  return (
    <div className="bg-gray-800/20 p-6 sm:p-8 rounded-xl shadow-inner-lg border border-gray-700">
      <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-green-300">
        Three-Schema Architecture
      </h2>
      <div className="space-y-8">
        <SchemaCard
          icon={UsersIcon}
          title="External Schema"
          subtitle="User Views"
          description="This level describes the part of the database that a specific user group is interested in, hiding the rest of the database. There can be multiple external schemas for a single database, tailored for different users (e.g., students, faculty, admin)."
          color="blue"
        />
        <div className="flex justify-center">
            <div className="w-1 h-8 bg-gray-700"></div>
        </div>
        <SchemaCard
          icon={SchemaIcon}
          title="Conceptual Schema"
          subtitle="Logical Structure"
          description="Also known as the logical schema, this level provides a unified view of the entire database. It describes the data entities, their attributes, relationships, and constraints, without getting into physical storage details. It's the 'big picture' view."
          color="purple"
        />
        <div className="flex justify-center">
            <div className="w-1 h-8 bg-gray-700"></div>
        </div>
        <SchemaCard
          icon={StorageIcon}
          title="Internal Schema"
          subtitle="Physical Storage"
          description="This level, also called the physical schema, defines how the data is physically stored on storage devices. It deals with low-level details like file organization, data structures (e.g., B+ trees, hashing), and access paths to optimize performance."
          color="green"
        />
      </div>
    </div>
  );
};

export default ThreeSchemaArchitecture;