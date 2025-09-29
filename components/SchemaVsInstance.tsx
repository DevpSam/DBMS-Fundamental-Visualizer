
import React, { useState } from 'react';
import type { Student } from '../types.ts';

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

export default SchemaVsInstance;