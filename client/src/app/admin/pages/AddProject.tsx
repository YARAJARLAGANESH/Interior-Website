import { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../../../api/api';

export default function AddProject() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
  });
  const [images, setImages] = useState<FileList | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('category', formData.category);
      data.append('location', formData.location);

      if (images) {
        for (let i = 0; i < images.length; i++) {
          data.append('images', images[i]);
        }
      }

      if (video) {
        data.append('video', video);
      }

      await api.post('/projects', data);

      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/projects');
      }, 1500);
    } catch (err: unknown) {
      const axiosError = err as any;
      setError(axiosError.response?.data?.message || 'Failed to add project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Add New Project</h2>
        {success && (
          <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
            Project added successfully! Redirecting...
          </div>
        )}
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            >
              <option value="">Select Category</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
              <option value="renovation">Renovation</option>
              <option value="new-construction">New Construction</option>
            </select>
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
              Images (Multiple)
            </label>
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              onChange={(e) => setImages(e.target.files)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="video" className="block text-sm font-medium text-gray-700 mb-1">
              Video (Optional)
            </label>
            <input
              type="file"
              id="video"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Adding Project...' : 'Add Project'}
          </button>
        </form>
      </div>
    </div>
  );
}