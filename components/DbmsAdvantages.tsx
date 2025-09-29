import React, { useState } from 'react';
import type { Advantage } from '../types.ts';
import {
  RedundancyIcon,
  ConsistencyIcon,
  SecurityIcon,
  IntegrityIcon,
  ConcurrencyIcon,
  BackupIcon,
} from './icons.tsx';

const advantagesData: Advantage[] = [
  {
    id: 1,
    title: 'Control of Data Redundancy',
    icon: RedundancyIcon,
    description: 'DBMS avoids duplication of data by storing it in a centralized repository. This saves storage space and prevents inconsistencies that arise when the same data is stored in multiple files.',
  },
  {
    id: 2,
    title: 'Enforcing Data Consistency',
    icon: ConsistencyIcon,
    description: 'By reducing redundancy, DBMS ensures that any changes to a data item are reflected throughout the system, maintaining a consistent state. If a student changes their address, it\'s updated only once.',
  },
  {
    id: 3,
    title: 'Improved Data Security',
    icon: SecurityIcon,
    description: 'DBMS provides robust security mechanisms. Access to data can be restricted through user accounts, roles, and permissions, ensuring that only authorized users can view or modify sensitive information.',
  },
  {
    id: 4,
    title: 'Maintaining Data Integrity',
    icon: IntegrityIcon,
    description: 'DBMS enforces integrity constraints (e.g., data types, primary keys, not-null constraints) to ensure the quality and accuracy of the data. For example, a GPA must be a number between 0.0 and 4.0.',
  },
  {
    id: 5,
    title: 'Managing Multi-User Access',
    icon: ConcurrencyIcon,
    description: 'DBMS uses concurrency control mechanisms to allow multiple users to access and modify the database simultaneously without interfering with each other, preventing issues like lost updates.',
  },
  {
    id: 6,
    title: 'Backup and Recovery',
    icon: BackupIcon,
    description: 'Modern DBMS provides facilities for backing up data and recovering from system failures (e.g., hardware crashes, software errors). This protects data from being lost permanently.',
  },
];

const AdvantageCard: React.FC<{
  advantage: Advantage;
  isExpanded: boolean;
  onClick: () => void;
}> = ({ advantage, isExpanded, onClick }) => {
  const { icon: Icon, title, description } = advantage;
  return (
    <div
      onClick={onClick}
      className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 transition-all duration-300 cursor-pointer hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20 transform hover:-translate-y-1"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Icon className="w-8 h-8 text-blue-400" />
          <h3 className="text-lg font-bold text-gray-100">{title}</h3>
        </div>
        <svg
          className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <div
        className={`transition-all ease-in-out duration-500 overflow-hidden ${isExpanded ? 'max-h-40 mt-4' : 'max-h-0 mt-0'}`}
      >
        <p className="text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

const DbmsAdvantages: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const handleCardClick = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-gray-800/20 p-6 sm:p-8 rounded-xl shadow-inner-lg border border-gray-700">
      <h2 className="text-3xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-green-300">
        Advantages of DBMS
      </h2>
      <p className="text-center text-gray-400 mb-8">
        Compared to traditional file-based systems. Click on a card to learn more.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {advantagesData.map((advantage) => (
          <AdvantageCard
            key={advantage.id}
            advantage={advantage}
            isExpanded={expandedId === advantage.id}
            onClick={() => handleCardClick(advantage.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DbmsAdvantages;