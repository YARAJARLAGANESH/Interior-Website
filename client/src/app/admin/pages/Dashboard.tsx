import { useState, useEffect } from 'react';
import api from '../../../api/api';
import { Project } from '../../../api/types';

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        setProjects(response.data.projects || []);
      } catch (err) {
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const totalProjects = projects.length;
  const totalImages = projects.reduce((sum, p) => sum + (p.images?.length || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Projects</h3>
          <p className="text-3xl font-bold text-blue-600">{totalProjects}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Images</h3>
          <p className="text-3xl font-bold text-green-600">{totalImages}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Last Updated</h3>
          <p className="text-lg font-medium text-gray-600">
            {projects.length > 0 ? 'Recently' : 'No data'}
          </p>
        </div>
      </div>
    </div>
  );
}