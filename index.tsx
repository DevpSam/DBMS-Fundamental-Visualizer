
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

// --- From types.ts ---
type Section = 'architecture' | 'schema' | 'advantages';

interface Student {
  id: number;
  name: string;
  major: string;
}

interface Advantage {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}


// --- From components/icons.tsx ---
type IconProps = {
  className?: string;
};

const UsersIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857m0 0a3.004 3.004 0 005.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
  </svg>
);

const SchemaIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
  </svg>
);

const StorageIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
  </svg>
);

const RedundancyIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
  </svg>
);

const ConsistencyIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const SecurityIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z"></path>
  </svg>
);

const IntegrityIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
  </svg>
);

const ConcurrencyIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-1.781-4.121M12 11a4 4 0 110-5.292M12 11a4 4 0 00-4 4v1a2 2 0 002 2h4a2 2 0 002-2v-1a4 4 0 00-4-4z"></path>
  </svg>
);

const BackupIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M4 18v-5h5m11-4h-5V4m5 14h-5v-5"></path>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);


// --- From components/Header.tsx ---
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


// --- From components/Navbar.tsx ---
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


// --- From components/ThreeSchemaArchitecture.tsx ---
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


// --- From components/SchemaVsInstance.tsx ---
const initialStudents: Student[] = [
  { id: 101, name: 'Alice Johnson', major: 'Computer Science' },
  { id: 102, name: 'Bob Williams', major: 'Data Science' },
  { id: 103, name: 'Charlie Brown', major: 'Cybersecurity' },
];

const SchemaVsInstance: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [formData, setFormData] = useState({ id: '', name: '', major: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id || !formData.name || !formData.major) {
      setError('All fields are required.');
      return;
    }
    const newId = parseInt(formData.id, 10);
    if (isNaN(newId)) {
      setError('ID must be a number.');
      return;
    }
    if (students.some(s => s.id === newId)) {
      setError('A student with this ID already exists.');
      return;
    }

    const newStudent: Student = {
      id: newId,
      name: formData.name,
      major: formData.major,
    };
    setStudents([...students, newStudent]);
    setFormData({ id: '', name: '', major: '' });
    setError('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Schema Section */}
      <div className="bg-gray-800/20 p-6 sm:p-8 rounded-xl shadow-inner-lg border border-gray-700">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mb-4">Schema: The Blueprint</h2>
        <p className="text-gray-400 mb-6">The schema defines the structure of the database—the tables, columns, data types, and relationships. It's the blueprint that doesn't change often.</p>
        
        <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm text-green-400 border border-gray-700">
          <p><span className="text-blue-400">CREATE TABLE</span> Students (</p>
          <p className="pl-4"><span className="text-purple-400">ID</span> INTEGER PRIMARY KEY,</p>
          <p className="pl-4"><span className="text-purple-400">Name</span> VARCHAR(255),</p>
          <p className="pl-4"><span className="text-purple-400">Major</span> VARCHAR(255)</p>
          <p>);</p>
        </div>

        <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-200">Add New Instance</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            placeholder="Student ID (e.g., 104)"
            className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleInputChange}
            placeholder="Major"
            className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 shadow-lg hover:shadow-blue-500/50">
            Add Student
          </button>
        </form>
      </div>

      {/* Instance Section */}
      <div className="bg-gray-800/20 p-6 sm:p-8 rounded-xl shadow-inner-lg border border-gray-700">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-green-300 mb-4">Instance: The Snapshot</h2>
        <p className="text-gray-400 mb-6">An instance is the actual data in the database at a specific moment in time. It's a snapshot of the data that conforms to the schema. It changes frequently as data is added, updated, or deleted.</p>
        
        <div className="overflow-x-auto rounded-lg border border-gray-700">
          <table className="w-full text-left">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-3 font-semibold text-sm text-gray-300">ID</th>
                <th className="p-3 font-semibold text-sm text-gray-300">Name</th>
                <th className="p-3 font-semibold text-sm text-gray-300">Major</th>
              </tr>
            </thead>
            <tbody className="bg-gray-900/50 divide-y divide-gray-700">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-800/70 transition-colors">
                  <td className="p-3 text-sm">{student.id}</td>
                  <td className="p-3 text-sm">{student.name}</td>
                  <td className="p-3 text-sm">{student.major}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


// --- From components/DbmsAdvantages.tsx ---
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


// --- From components/BackgroundCanvas.tsx ---
// Renamed Node to CanvasNode to avoid potential conflicts with the DOM Node type
interface CanvasNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const nodesRef = useRef<CanvasNode[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initNodes = () => {
      const nodeCount = Math.floor((canvas.width * canvas.height) / 15000);
      nodesRef.current = [];
      
      for (let i = 0; i < nodeCount; i++) {
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      nodesRef.current.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        
        if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1;
        if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1;
        
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));
      });

      const maxDistance = 120;
      ctx.lineWidth = 1;

      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const nodeA = nodesRef.current[i];
          const nodeB = nodesRef.current[j];
          const distance = Math.sqrt(
            Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2)
          );
          
          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.25;
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
      nodesRef.current.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initNodes();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initNodes();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};


// --- From App.tsx ---
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


// --- Original index.tsx render call ---
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
